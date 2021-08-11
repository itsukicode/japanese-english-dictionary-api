const puppeteer = require('puppeteer')

/**
 * @param {string} word search-word.
 * @return { obj } return word object if there is the word exist on google.
 */
async function jp(word) {
	const browser = await puppeteer.launch()
	try {
		const page = await browser.newPage()
		// Wait until the page appears in the DOM
		await page.goto(`https://www.google.com/search?q=${word}+意味`, {
			waitUntil: 'domcontentloaded'
		})
		// Get Word Pronunciation
		await page.waitForSelector('[data-dobid="hdw"]', {timeout: 10000})
		const [pronounceEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[2]/div[1]/div/span'
		)
		let pronounce = await pronounceEl.getProperty('textContent')
		pronounce = await pronounce.jsonValue()
		// Get Word Audio Src
		await page.waitForSelector('[jsname="QInZvb"] source', {timeout: 10000})
		const [audioSrcEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[1]/div/audio/source'
		)
		let audioSrc = await audioSrcEl.getProperty('src')
		audioSrc = await audioSrc.jsonValue()
		// // Get Word Definition
		await page.waitForSelector('[data-dobid="dfn"] span', {timeout: 10000})
		const [defEl] = await page.$x(
			'/html/body/div[7]/div/div[8]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div/div/span/div/div/div[1]/div/div[4]/div/div/ol/li/div/div/div[1]/div/div/div[1]/span'
		)
		let def = await defEl.getProperty('textContent')
		def = await def.jsonValue()
		return {pronounce, audioSrc, def}
	} catch (err) {
		throw new Error('取得に失敗しました。')
	} finally {
		// Close Browser
		await browser.close()
	}
}

/**
 * @param {string} word search-word.
 * @return { obj } return word object if there is the word exist on google.
 */
async function en(word) {
	const browser = await puppeteer.launch()
	try {
		const page = await browser.newPage()
		// Wait until the page appears in the DOM
		await page.goto(`https://www.google.com/search?q=${word}+definition`, {
			waitUntil: 'domcontentloaded'
		})
		// Get Word Pronunciation
		const pronounce = await page.$eval('.LTKOO span', (el) => el.textContent)

		// Get Word Audio Src
		const audioSrc = await page.$eval('audio source', (el) =>
			el.getAttribute('src')
		)
		// // // Get Word Definition
		const def = await page.$eval(
			'[data-dobid="dfn"] span',
			(el) => el.textContent
		)
		return {pronounce, audioSrc, def}
	} catch (err) {
		throw new Error("couldn't retrieve the data")
	} finally {
		// Close Browser
		await browser.close()
	}
}

module.exports = {
	jp,
	en
}
