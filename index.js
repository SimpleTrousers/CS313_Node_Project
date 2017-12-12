// A Node.js, express, ejs, mysql app to implement the Stumper Game
//
//
// "forever" module is installed on server
// To Start Node.js server: forever start index.js
// To List running processes: forever list
// To Stop Node.js Server (if you know the id): forever stop [id]
// To Stop Node.js Server (if you don't know the id): uid=$(forever list | grep index.js | cut -c24-27) && forever stop $uid
// To Restart a running server: forever restart [id]

const express = require('express')
const path = require('path')
var url = require('url')
var util = require('util')
const PORT = process.env.PORT || 80

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Stumper.126",
  port: "3306",
  database: "stumper"
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
  .get('/Stumper', (req, res) => loadQuestions(req, res))
  .get('/createQuestion', (req, res) => createQuestion(req, res))
  .get('/Question', (req, res) => Question(req, res))
  .get('/Answer', (req, res) => res.render('pages/answer'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function createQuestion(req, res) {
  var requestURL = url.parse(req.url, true);

  var q = requestURL.query.question.toString();
  var a1 = requestURL.query.answer1.toString();
  var a2 = requestURL.query.answer2.toString();

  var sql = "insert into ?? (??,??,??) values (?,?,?)";
  var values = ['Questions', 'question', 'answer1', 'answer2', q, a1, a2];

  con.query(mysql.format(sql, values), function(err, res, tableInfo) {
    if (err) throw err;
  });

  loadQuestions(req, res);
};

function Question(req, res) {
  var requestURL = url.parse(req.url, true);

  console.log(requestURL.query.id);

  // if (requestURL.query.see == "View+Question") {

  // }
  // else if (requestURL.query.delete == "Delete+Question") {

  // }
}

function loadQuestions(req, res) {
  con.query("select * from Questions", function(err, results) {
    if (err) throw err;
    else {
      res.render('pages/stumper', {data: results});
    }
  });
}