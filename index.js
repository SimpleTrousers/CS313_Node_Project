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
  .get('/Stumper', (req, res) => res.render('pages/stumper'))
  .get('/createQuestion', (req, res) => createQuestion(req, res))
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

  // con.query(sql, [values], function(err, result) {
  //   if (err) throw err;
  // });

  loadQuestions(req, res);
};

function loadQuestions(req, res) {
  var object = {};

  con.query("select * from Questions", function(err, results) {
    if (err) throw err;
    else {
      obj = {data: results};
      res.render('pages/stumper', obj);
    }
  });
}