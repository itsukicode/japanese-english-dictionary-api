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
		await page.waitForTimeout(1000)
		// Get Word Pronunciation
		const pronounce = await page.$eval(
			'[data-dobid="hdw"]',
			(el) => el.textContent
		)
		const audioSrc = await page.$eval('audio source', (el) =>
			el.getAttribute('src')
		)
		// Get Word Definition
		const def = await page.$eval(
			'[data-dobid="dfn"] span',
			(el) => el.textContent
		)
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
		throw new Error("Couldn't retrieve the data")
	} finally {
		// Close Browser
		await browser.close()
	}
}

module.exports = {
	jp,
	en
}
