const express = require('express')
const app = express()
const PORT = 8080
const scrapeWord = require('./scrapeWord')

app.use(express.json())

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`))

app.get('/search-word', async (req, res) => {
	const word = req.query.word
	const wordInfo = await scrapeWord(word)
	// console.log('wordInfo:', wordInfo)
	// res.status(200).send({
	// })
})
