const functions = require('firebase-functions')
const express = require('express')
const app = express()
const scrapeWord = require('./scrapeWord')
const cors = require('cors')

app.use(
	cors({
		origin: '*'
	})
)

app.get('/search-word', async (req, res) => {
	const lang = req.query.lang
	const searchWord = req.query.word
	const returnLang = req.query.returnLang
	try {
		let word = null
		if (returnLang === 'en') {
			if (lang === 'jp') {
				word = await scrapeWord.jpToEn(searchWord)
			} else if (lang === 'en') {
				word = await scrapeWord.en(searchWord)
			} else {
				throw new Error(`${lang} is not supported`)
			}
		} else {
			if (lang === 'jp') {
				word = await scrapeWord.jp(searchWord)
			} else if (lang === 'en') {
				word = await scrapeWord.enToJp(searchWord)
			} else {
				throw new Error(`${lang} is not supported`)
			}
		}
		res.status(200).send({
			word
		})
	} catch (e) {
		res.status(404).send({
			message: e.message
		})
	}
})
exports.app = functions.https.onRequest(app)
