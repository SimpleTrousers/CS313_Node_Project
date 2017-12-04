const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/login'))
  .get('/Stumper', (req, res) => res.render('pages/stumper'))
  .get('/Answer', (req, res) => res.render('pages/answer'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))