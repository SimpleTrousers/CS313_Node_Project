// import { port } from '_debugger';

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Stumper.126",
  port: "3306"
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/login'))
  .get('/Stumper', (req, res) => res.render('pages/stumper'))
  .get('/Answer', (req, res) => res.render('pages/answer'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))