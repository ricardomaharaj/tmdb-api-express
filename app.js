require('dotenv').config()
let express = require('express')
let axios = require('axios').default

const PORT = process.env.PORT || 4000
if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY not provided!')
}
const api_key = process.env.TMDB_API_KEY

let app = express()
app.use(express.json())

const API_URL = 'https://api.themoviedb.org/3'

app.get('/search', async (req, res) => {
    let { query } = req.query
    let x = await axios.get(API_URL + '/search/multi', {
        params: {
            api_key,
            query,
            page: 1,
            language: 'en-US'
        }
    })
    res.json(x.data.results)
})

app.get('/movie', async (req, res) => {
    let { id } = req.query
    let x = await axios.get(API_URL + '/movie/' + id, {
        params: {
            api_key,
            language: 'en-US'
        }
    })
    res.json(x.data)
})

app.get('/tv', async (req, res) => {
    let { id } = req.query
    let x = await axios.get(API_URL + '/tv/' + id, {
        params: {
            api_key,
            language: 'en-US'
        }
    })
    res.json(x.data)
})

app.listen(PORT, () => console.log('http://localhost:' + PORT))
