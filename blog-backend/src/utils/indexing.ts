import axios from 'axios'
import { google } from 'googleapis'

/**
 * Notify Google Indexing API that a URL was updated.
 * Expects process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON (stringified JSON)
 */
export async function notifyGoogleIndexing(url: string): Promise<void> {
  try {
    const keyJson = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON
    if (!keyJson) throw new Error('Missing GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON')
    const key = JSON.parse(keyJson)
    const jwt = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing']
    } as any)
    await jwt.authorize()
    const indexing = google.indexing({ version: 'v3', auth: jwt })
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED'
      }
    } as any)
  } catch (err) {
    console.error('Google indexing error:', (err as Error).message)
  }
}

/**
 * Submit using IndexNow protocol (used by Bing/Yandex).
 * Expects process.env.INDEXNOW_KEY and process.env.SITE_HOST (hostname e.g. replyflow.pro)
 */
export async function notifyIndexNow(url: string): Promise<void> {
  try {
    const key = process.env.INDEXNOW_KEY
    const host = process.env.SITE_HOST
    if (!key || !host) throw new Error('Missing INDEXNOW_KEY or SITE_HOST')
    const endpoint = 'https://api.indexnow.org/indexnow'
    const body = {
      host,
      key,
      urlList: [url]
    }
    await axios.post(endpoint, body, { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('IndexNow error:', (err as Error).message)
  }
}
