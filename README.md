# Japanese and English Dictionary REST API

This API will receive a single Japanese or English word from the user and send back the word information such as the pronunciation, definition, and audio source.

## How to use

### Request

`GET /search-word?lang={lang}&word={keyword}`

### URL Parameter (Required)

- lang - word search in a different language

  `jp` - Japanese

  `en` - English

- word - any single word you specified in the `lang` parameter

### URL Parameter (Optional)

- returnLang - return language for the searching word

  `jp` - Japanese by default

  `en` - English

## Example

1. Search Japanese Word

```
https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?lang=jp&word=恋愛
```

```
{
  "word": {
    "pronounce": "れんあい",
    "audioSrc": "https://www.google.com/speech-api/v1/synthesizetext=%E3%82%8C%E3%82%93%E3%81%82%E3%81%84&enc=mpeg&lang=ja&speed=0.4&client=lr-language-tts&use_google_only_voices=1",
    "def": "男女間の、恋いしたう愛情。こい。"
  }
}

```

2. Search English Word

```
https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?lang=en&word=love
```

```
{
  "word": {
    "pronounce": "ləv",
    "audioSrc": "//ssl.gstatic.com/dictionary/static/sounds/20200429/love--_gb_1.mp3",
    "def": "愛"
   }
}

```

3. Search Japanese Word and Return the data in English

```
https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?lang=jp&word=恋愛&returnLang=en
```

```
{
  "word": {
    "pronounce": "Ren'ai",
    "audioSrc": "https://www.google.com/speech-api/v1/synthesize?text=%E3%82%8C%E3%82%93%E3%81%82%E3%81%84&enc=mpeg&lang=ja&speed=0.4&client=lr-language-tts&use_google_only_voices=1",
    "def": "love"
  }
}

```

4. Search English Word and Return the data in English

```
https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?lang=en&word=love&returnLang=en`
```

```
{
  "word": {
    "pronounce": "lʌv",
    "audioSrc": "//ssl.gstatic.com/dictionary/static/sounds/20200429/love--_gb_1.mp3",
    "def": "an intense feeling of deep affection."
  }
}

```

## Stack

- [Node js](https://nodejs.org/en/)
- [Firebase](https://firebase.google.com/) for deployment

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

Itsuki Tomizawa
