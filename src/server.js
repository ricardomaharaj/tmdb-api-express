require('dotenv').config()
let express = require('express')
let axios = require('axios').default

const API_URL = 'https://api.themoviedb.org/3'

const PORT = process.env.PORT || 4000
const api_key = process.env.TMDB_API_KEY

let app = express()
app.use(express.json())

app.get('/search', (req, res) => {
    let { query } = req.query
    axios.get(API_URL + '/search/multi', {
        params: {
            api_key,
            query,
            page: 1,
            language: 'en-US'
        }
    }).then(x => { res.json(x.data.results) })
})

app.get('/movie', (req, res) => {
    let { id } = req.query
    axios.get(API_URL + '/movie/' + id, {
        params: {
            api_key,
            language: 'en-US'
        }
    }).then(x => { res.json(x.data) })
})

app.get('/tv', (req, res) => {
    let { id } = req.query
    axios.get(API_URL + '/tv/' + id, {
        params: {
            api_key,
            language: 'en-US'
        }
    }).then(x => { res.json(x.data) })
})

app.listen(PORT)
