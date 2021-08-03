# Jpanese Dictionary REST API

This API will receive word from the user and send back the word information such as the pronunciation, definition, and audio source.

## How to use
### Request

`GET /search-word?word={keyword}`

    https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?word={keyword}

## Example
    https://us-central1-dictionary-api-b3e3e.cloudfunctions.net/app/search-word?word={恋愛}
```
{
  "word": {
    "pronounce": "れんあい",
    "audioSrc": "https://www.google.com/speech-api/v1/synthesizetext=%E3%82%8C%E3%82%93%E3%81%82%E3%81%84&enc=mpeg&lang=ja&speed=0.4&client=lr-language-tts&use_google_only_voices=1",
    "def": "男女間の、恋いしたう愛情。こい。"
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