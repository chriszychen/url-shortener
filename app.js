// variables
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
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

app.post('/url', (req, res) => {
  res.redirect('/url/success')
  // const url = req.body.url
})

app.get('/url/success', (req, res) => {
  const url = {
    originalUrl: 'https://www.google.com',
    hashCodes: 'CM90r'
  }
  res.render('success', { url })
})

// listening to the server
app.listen(3000, () => {
  console.log('The App is running on http://localhost:3000')
})
