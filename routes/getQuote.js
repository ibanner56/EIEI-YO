/*
 * GET quote.
 */

exports.getQuote = function(req, res){
var mysql      = require('mysql');
var posQuote = "";
var negQuote = "";
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'HelloB2C',
  database : 'eieiyo'
});

connection.connect();

connection.query('SELECT `Text` FROM `Rhymes` WHERE `IsPositive` = 0 ORDER BY Rand() LIMIT 1', function(err, rows, fields) {
  if (err) throw err;

  negQuote = rows[0].Text;
});

connection.query('SELECT `Text` FROM `Rhymes` WHERE `IsPositive` = 1 ORDER BY Rand() LIMIT 1', function(err, rows, fields) {
  if (err) throw err;

  posQuote = rows[0].Text;
});

connection.end();

res.send(JSON.stringify(["rhymepos":posQuote, "rhymeneg":negQuote]))
};
