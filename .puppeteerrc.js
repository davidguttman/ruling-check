const { join } = require('path')

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  downloadBaseUrl: 'https://storage.googleapis.com/chrome-for-testing-public',
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer')
}
