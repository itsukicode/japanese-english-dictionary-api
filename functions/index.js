const functions = require('firebase-functions')
const express = require('express')
const app = express()
const scrapeWord = require('./scrapeWord')

app.get('/search-word', async (req, res) => {
	const searchWord = req.query.word
	try {
		const word = await scrapeWord(searchWord)
		res.status(200).send({
			word
		})
	} catch (e) {
		res.status(404).send({
			message: 'Sorry there is not such a word in our database'
		})
	}
})
exports.app = functions.https.onRequest(app)
