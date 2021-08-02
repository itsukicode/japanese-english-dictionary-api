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
		const [wordPronounceEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[2]/div[1]/div/span'
		)
		let wordPronounce = await wordPronounceEl.getProperty('textContent')
		wordPronounce = await wordPronounce.jsonValue()
		// Get Word Sound
		const [wordSoundEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[1]/div/audio/source'
		)
		let wordSound = await wordSoundEl.getProperty('src')
		wordSound = await wordSound.jsonValue()
		// // Get Word Definition
		const [wordDefEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[4]/div/div/ol/li/div/div/div[1]/div/div/div[1]/span'
		)
		let wordDef = await wordDefEl.getProperty('textContent')
		wordDef = await wordDef.jsonValue()
		return { wordPronounce, wordSound, wordDef }
	} catch (err) {
		console.log(err.message)
	} finally {
		// Close Browser
		await browser.close()
	}
}
module.exports = scrapeWord
