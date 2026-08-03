import axios from 'axios'
import { google } from 'googleapis'

export interface IndexingResult {
  success: boolean
  url: string
  provider: 'Google' | 'IndexNow'
  message?: string
}

/**
 * Notify Google Indexing API that a URL was updated or deleted.
 * Expects process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON (stringified JSON)
 */
export async function notifyGoogleIndexing(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult> {
  try {
    const keyJson = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON
    if (!keyJson) {
      throw new Error('Missing GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON environment variable')
    }

    const key = JSON.parse(keyJson)
    const privateKey = key.private_key ? key.private_key.replace(/\\n/g, '\n') : ''

    const jwt = new google.auth.JWT({
      email: key.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/indexing']
    } as any)

    await jwt.authorize()
    const indexing = google.indexing({ version: 'v3', auth: jwt })
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type
      }
    } as any)

    console.log(`[Google Indexing] Successfully submitted: ${url} (${type})`)
    return { success: true, url, provider: 'Google' }
  } catch (err) {
    const message = (err as Error).message
    console.error(`[Google Indexing Error] ${url}:`, message)
    return { success: false, url, provider: 'Google', message }
  }
}

/**
 * Batch submit multiple URLs to Google Indexing API.
 */
export async function notifyGoogleIndexingBatch(
  urls: string[],
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult[]> {
  const results = await Promise.all(
    urls.map((url) => notifyGoogleIndexing(url, type))
  )
  return results
}

/**
 * Normalize hostname for IndexNow protocol (removes protocol & trailing slashes).
 */
function normalizeHost(hostOrUrl: string): string {
  return hostOrUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .trim()
}

/**
 * Submit URLs using IndexNow protocol (supported by Bing, Yandex, Seznam, Naver).
 * Expects process.env.INDEXNOW_KEY and process.env.SITE_HOST (e.g. replyflow.pro)
 */
export async function notifyIndexNow(urls: string | string[]): Promise<IndexingResult> {
  const urlList = Array.isArray(urls) ? urls : [urls]
  const primaryUrl = urlList[0] || ''

  try {
    const key = process.env.INDEXNOW_KEY
    const rawHost = process.env.SITE_HOST || (primaryUrl ? new URL(primaryUrl).hostname : '')

    if (!key) {
      throw new Error('Missing INDEXNOW_KEY environment variable')
    }
    if (!rawHost) {
      throw new Error('Missing SITE_HOST environment variable')
    }

    const host = normalizeHost(rawHost)
    const endpoint = 'https://api.indexnow.org/indexnow'

    const body = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList
    }

    await axios.post(endpoint, body, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      timeout: 10000
    })

    console.log(`[IndexNow] Successfully submitted ${urlList.length} URL(s) for host: ${host}`)
    return { success: true, url: primaryUrl, provider: 'IndexNow' }
  } catch (err) {
    const message = (err as Error).message
    console.error(`[IndexNow Error] ${primaryUrl}:`, message)
    return { success: false, url: primaryUrl, provider: 'IndexNow', message }
  }
}
