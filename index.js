const express = require('express')
const app = express()
const PORT = 8080
const scrapeWord = require('./scrapeWord')

app.use(express.json())

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`))

app.get('/search-word', async (req, res) => {
	const searchWord = req.query.word
	try {
		const word = await scrapeWord(searchWord)
		console.log('wordInfo:', word)
		res.status(200).send({
			word
		})
	} catch (e) {
		res.status(404).send({
			message: 'Sorry there is not such a word in our database'
		})
	}
})
