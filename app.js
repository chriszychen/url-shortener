// variables
const express = require('express')
const exphbs = require('express-handlebars')
const generateShortCodes = require('./util/generate_short_codes')
const Url = require('./models/url')
const app = express()
require('./config/mongoose')

const port = process.env.PORT || 3000

// module setting
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
  try {
    const { originalUrl } = req.body
    // 查詢資料庫是否存過此網址，有就抓出其shortCode，沒有就新增一個
    const isUrlExist = await Url.exists({ originalUrl: originalUrl })
    let shortCodes
    if (isUrlExist) {
      const existUrl = await Url.findOne({ originalUrl: originalUrl })
      shortCodes = existUrl.shortCodes
    } else {
      shortCodes = generateShortCodes()
      await Url.create({ originalUrl, shortCodes })
    }
    const shortUrl = `${req.protocol}://${req.hostname}:${port}/${shortCodes}`
    res.render('index', { isSuccessful: true, shortUrl })
  } catch (error) {
    console.log(error)
    return res.send('<h1>Fail to shorten this URL! <a href="/">Try again.</a></h1>')
  }
})

// redirect the shortened url
app.get('/:shortCodes', async (req, res) => {
  try {
    const { shortCodes } = req.params
    const url = await Url.findOne({ shortCodes })
    res.redirect(url.originalUrl)
  } catch (error) {
    console.log(error)
    return res.send('<h1>Wrong URL! Please click <a href="/">here</a> to create short URL.</h1>')
  }
})

// listening to the server
app.listen(port, () => {
  console.log('The App is running on http://localhost:3000')
})
