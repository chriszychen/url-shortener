// variables
const express = require('express')
const exphbs = require('express-handlebars')
const generateShortCode = require('./util/short_code_generator')
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
    if (!originalUrl) return res.render('index', { errorMessage: '請輸入URL！' })
    // 查詢資料庫是否存過此網址，有的話就取出該網址縮址
    const isUrlExist = await Url.exists({ originalUrl: originalUrl })
    let shortCode
    if (isUrlExist) {
      const existUrl = await Url.findOne({ originalUrl: originalUrl })
      shortCode = existUrl.shortCode
    } else {
      // 產生縮址並查詢資料庫中是否有重覆的縮址，確認無重複就新增一筆Url資料進資料庫
      let isShortCodeExist
      do {
        const generatedShortCode = generateShortCode()
        isShortCodeExist = await Url.exists({ shortCode: generatedShortCode })
        if (!isShortCodeExist) {
          shortCode = generatedShortCode
        }
      } while (isShortCodeExist)
      await Url.create({ originalUrl, shortCode })
    }
    const shortUrl = `${req.protocol}://${req.hostname}:${port}/${shortCode}`
    return res.render('index', { isSuccessful: true, shortUrl })
  } catch (error) {
    console.log(error)
    return res.send('<h1>Fail to shorten this URL! <a href="/">Try again.</a></h1>')
  }
})

// redirect the shortened url
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params
    const url = await Url.findOne({ shortCode })
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
