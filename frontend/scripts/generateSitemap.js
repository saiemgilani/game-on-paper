const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')

async function generateSiteMap() {
  const patterns = ['pages/**/*.tsx', '!pages/_*.tsx', `!pages/**/\\[*\\].tsx`, '!pages/404.tsx']
  let pages = await globby(patterns)


  pages = [...pages, ...topics.map((t) => `/topics/${t.replace(' ', '-')}`)]

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${pages
      .map((page) => {
        const path = page
          .replace('pages', '')
          .replace('.tsx', '')
          .replace('.md', '')
          .replace('/landing', '')
        const route = path === '/landing' ? '' : path
        return `
                      <url><loc>${`https://sportsdataverse.org${route}`}</loc></url>\n`.trimStart()
      })
      .join('')}</urlset>`.trim()

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()
