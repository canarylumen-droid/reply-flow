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
    upsertMeta('author', null, 'ReplyFlow Agency')

    // Open Graph
    upsertMeta(null, 'og:title', title)
    upsertMeta(null, 'og:description', description)
    upsertMeta(null, 'og:type', ogType)
    upsertMeta(null, 'og:url', canonicalUrl)
    upsertMeta(null, 'og:image', ogImage)
    upsertMeta(null, 'og:image:width', '1200')
    upsertMeta(null, 'og:image:height', '630')
    upsertMeta(null, 'og:site_name', 'ReplyFlow')
    upsertMeta(null, 'og:locale', 'en_US')

    // Twitter
    upsertMeta(null, 'twitter:card', 'summary_large_image')
    upsertMeta(null, 'twitter:title', title)
    upsertMeta(null, 'twitter:description', description)
    upsertMeta(null, 'twitter:image', ogImage)
    upsertMeta(null, 'twitter:site', '@replyflow')
    upsertMeta(null, 'twitter:creator', '@replyflow')

    const robotsVal = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    upsertMeta('robots', null, robotsVal)
    upsertMeta('googlebot', null, robotsVal)

    upsertLink('canonical', canonicalUrl)

    // Article-specific meta
    if (ogType === 'article' && publishedTime) {
      upsertMeta(null, 'article:published_time', publishedTime)
      upsertMeta(null, 'article:modified_time', modifiedTime || publishedTime)
      upsertMeta(null, 'article:author', SITE)
      upsertMeta(null, 'article:publisher', SITE)
      if (tags) {
        const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean)
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove())
        tagArr.forEach(t => {
          const el = document.createElement('meta')
          el.setAttribute('property', 'article:tag')
          el.setAttribute('content', t)
          document.head.appendChild(el)
        })
      }
    }

    // Breadcrumb JSON-LD
    if (breadcrumbs && breadcrumbs.length > 0) {
      upsertJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: b.item,
          })),
        ],
      })
    } else {
      cleanup(['breadcrumb'])
    }

    // Organization JSON-LD (always present)
    upsertJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'ReplyFlow',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/reply_flow_logo.png`,
      },
      sameAs: [
        'https://twitter.com/replyflow',
      ],
    })

    // WebSite JSON-LD (always present)
    upsertJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'ReplyFlow',
      url: SITE,
      publisher: { '@id': `${SITE}/#organization` },
    })

    // Custom page-level JSON-LD (article, blog, etc.)
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
