const puppeteer = require('puppeteer')

async function scrapeWord(word) {
	const browser = await puppeteer.launch()
	try {
		const page = await browser.newPage()
		await page.goto(`https://www.google.com/search?q=${word}+意味`, {
			waitUntil: 'networkidle0'
		})
		// Wait until the page appears in the DOM
		await page.waitForSelector('[data-dobid="dfn"] span', { timeout: 3000 })
		// Get Word Pronunciation
		const [pronounceEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[2]/div[1]/div/span'
		)
		let pronounce = await pronounceEl.getProperty('textContent')
		pronounce = await pronounce.jsonValue()
		// Get Word Audio Src
		const [audioSrcEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[1]/div/audio/source'
		)
		let audioSrc = await audioSrcEl.getProperty('src')
		audioSrc = await audioSrc.jsonValue()
		// // Get Word Definition
		const [defEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[4]/div/div/ol/li/div/div/div[1]/div/div/div[1]/span'
		)
		let def = await defEl.getProperty('textContent')
		def = await def.jsonValue()
		return { pronounce, audioSrc, def }
	} catch (err) {
		throw new Error(err.message)
	} finally {
		// Close Browser
		await browser.close()
	}
}
module.exports = scrapeWord
