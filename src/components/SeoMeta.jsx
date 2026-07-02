import { useEffect } from 'react'

const SITE = 'https://replyflow.pro'
const DEFAULT_OG_IMAGE = `${SITE}/reply_flow_logo.png`

function upsertMeta(name, property, content) {
  if (!content) return
  const attr = property ? 'property' : 'name'
  const attrVal = property || name
  let el = document.querySelector(`${property ? 'meta[property' : 'meta[name'}="${attrVal}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrVal)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  document.querySelector(`script[data-seo="${id}"]`)?.remove()
  if (!data) return
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.dataset.seo = id
  el.text = JSON.stringify(data)
  document.head.appendChild(el)
}

function cleanup(ids) {
  ids.forEach(id => document.querySelector(`script[data-seo="${id}"]`)?.remove())
}

const SeoMeta = ({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
  tags,
  jsonLd,
  breadcrumbs,
}) => {
  useEffect(() => {
    document.title = title || 'ReplyFlow | AI Lead Follow-Up & Sales Automation Agency'

    upsertMeta('description', null, description)
    upsertMeta('keywords', null, keywords)

    upsertMeta(null, 'og:title', title)
    upsertMeta(null, 'og:description', description)
    upsertMeta(null, 'og:type', ogType)
    upsertMeta(null, 'og:url', canonicalUrl)
    upsertMeta(null, 'og:image', ogImage)
    upsertMeta(null, 'og:site_name', 'ReplyFlow')

    upsertMeta(null, 'twitter:card', 'summary_large_image')
    upsertMeta(null, 'twitter:title', title)
    upsertMeta(null, 'twitter:description', description)
    upsertMeta(null, 'twitter:image', ogImage)

    const robotsVal = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    upsertMeta('robots', null, robotsVal)

    upsertLink('canonical', canonicalUrl)

    if (ogType === 'article' && publishedTime) {
      upsertMeta(null, 'article:published_time', publishedTime)
      if (modifiedTime) upsertMeta(null, 'article:modified_time', modifiedTime)
      if (tags) {
        const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean)
        const existing = document.querySelectorAll('meta[property="article:tag"]')
        existing.forEach(el => el.remove())
        tagArr.forEach(t => {
          const el = document.createElement('meta')
          el.setAttribute('property', 'article:tag')
          el.setAttribute('content', t)
          document.head.appendChild(el)
        })
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      upsertJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.item,
        })),
      })
    } else {
      cleanup(['breadcrumb'])
    }

    if (jsonLd) {
      upsertJsonLd('custom', jsonLd)
    } else {
      cleanup(['custom'])
    }

    return () => {
      if (ogType === 'article') {
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove())
        cleanup(['breadcrumb', 'custom'])
      }
    }
  }, [title, description, canonicalUrl, ogImage, ogType, keywords, noIndex, publishedTime, modifiedTime, tags, jsonLd, breadcrumbs])

  return null
}

export default SeoMeta
