const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var mysql = require('mysql');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/stumper'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Configure server, try to connect to database on database port, not server
var con = mysql.createConnection({
  host: "157.201.228.126",
  user: "stumperadmin",
  password: "cit380game"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});