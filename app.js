// variables
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const generateHashCodes = require('./generate_hash_codes')
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
app.post('/', (req, res) => {
  const { originalUrl } = req.body
  const hashCodes = generateHashCodes()
  let isSuccessful = false
  // 參考同學寫法
  const hostname = 'localhost:3000'
  const shortUrl = `${req.protocol}://${hostname}/${hashCodes}`
  return Url.create({ originalUrl, hashCodes })
    .then(() => {
      isSuccessful = true
      res.render('index', { isSuccessful, shortUrl })
    })
    .catch(err => console.log(err))
})

// redirect the shortened url
app.get('/:codes', (req, res) => {
  const { codes } = req.params
  return Url.findOne({ hashCodes: codes })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(err => console.log(err))
})

// listening to the server
app.listen(3000, () => {
  console.log('The App is running on http://localhost:3000')
})
