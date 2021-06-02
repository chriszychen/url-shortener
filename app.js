// variables
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const generateShortCodes = require('./generate_short_codes')
const Url = require('./models/url')
const app = express()

// module setting
mongoose.connect('mongodb://localhost/url_shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

// add input to database
app.post('/', async (req, res) => {
  // 參考同學寫法
  try {
    const { originalUrl } = req.body
    const isUrlExist = await Url.exists({ originalUrl: originalUrl })
    let shortCodes
    if (isUrlExist) {
      const existUrl = await Url.findOne({ originalUrl: originalUrl })
      shortCodes = existUrl.shortCodes
    } else {
      shortCodes = generateShortCodes()
      await Url.create({ originalUrl, shortCodes })
    }
    const hostname = 'localhost:3000'
    const shortUrl = `${req.protocol}://${hostname}/${shortCodes}`
    const isSuccessful = true
    res.render('index', { isSuccessful, shortUrl })
  } catch (error) {
    console.log(error)
    return res.send('<h1>Fail to shorten this URL! <a href="/">Try again.</a></h1>')
  }
})

// redirect the shortened url
app.get('/:shortCodes', (req, res) => {
  const { shortCodes } = req.params
  return Url.findOne({ shortCodes })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(err => {
      console.log(err)
      return res.send('<h1>Wrong URL! Please click <a href="/">here</a> to create short URL.</h1>')
    })
})

// listening to the server
app.listen(3000, () => {
  console.log('The App is running on http://localhost:3000')
})
