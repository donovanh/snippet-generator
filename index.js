const puppeteer = require('puppeteer')

const url = process.argv.slice(2)[0]

async function getMeta(page) {
  const title = await page.title()
  const url = await page.url()
  let description = '...'
  let image
  try {
    description = await page.$eval(
      "head > meta[name='description']",
      (element) => element.content
    )
  } catch {}
  try {
    image = await page.$eval(
      "head > meta[property='og:image']",
      (element) => element.content
    )
  } catch {}
  return {
    title,
    url,
    description,
    image
  }
}

function buildSnippetHTML(values) {
  const { title, description, image, url } = values
  return `
  <div style="display: flex; align-items: center">
    <div class="content" style="width: 100%">
      <h3 style="margin-top: 0"><a href="${url}" style="color: rgb(60, 128, 245); font-weight: bold">${title}</a></h3>
      <p>${description}</p>
      <p><a href="${url}" style="color: rgb(60, 128, 245); font-weight: bold">Check it out</a></p>
    </div>
    ${
      image
        ? `<div class="image">
      <a href="${url}">
        <img
        src="${image}"
        style="object-fit: cover; width: 120px; height: 120px; border-radius: 5px; margin: 0 0 0 20px;"
      />
      </a>
    </div>`
        : ''
    }
  </div>
  `
}

;(async function getWebPageData(url) {
  if (!url) {
    console.log('Please supply a URL')
    console.log('Usage: node index https://YOUR_URL_HERE')
    process.exit()
  }
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.setUserAgent(
    '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  const values = await getMeta(page)
  const output = buildSnippetHTML(values)
  console.log(output)
  browser.close()
})(url)
