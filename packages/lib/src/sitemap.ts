export type SitemapItem = {
  url: string
  date: string
}

export function toSitemapXML(items: SitemapItem[]) {
  let xml = ''

  xml += '<?xml version="1.0" encoding="utf-8"?>'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  for (const { url, date } of items) {
    xml += `<sitemap><loc>${url}</loc><lastmod>${date}</lastmod></sitemap>`
  }

  xml += '</sitemapindex>'

  return xml
}
