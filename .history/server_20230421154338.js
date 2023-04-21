const express = require('express');
const mysql = require('mysql');
const natural = require('natural');
const sqlstring = require('sqlstring');
require('dotenv').config();

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.password,
  database: 'project',
  port: 3306
});

// create an Express app
const app = express();

// handle GET requests to /query
app.get('/query', (req, res) => {
  // get the query parameter from the URL
  const query = req.query.q;
// initialize sql variable
let sql = null;
  // parse the input query
  const wordToCheck = "WHERE";
  if(query.toLocaleLowerCase().includes(wordToCheck.toLocaleLowerCase())){
    console.log("WHERE is present");
    const clauses = query.match(/SELECT (.*) FROM (.*) WHERE (.*)/);
    if (!clauses) {
      return res.status(400).send('Invalid query');
    }
    const select =clauses[1];
    const table = clauses[2];
    const condition = clauses[3];
  
    // generate the SQL query string
     sql = sqlstring.format(`SELECT ${select} FROM ${table} WHERE ${condition}`);
    console.log(sql);
  }
  else{
    console.log("WHERE is not present");
    const clauses = query.match(/SELECT (.*) FROM (.*)/);
    if (!clauses) {
      return res.status(400).send('Invalid query');
    }
    const select =clauses[1];
    const table = clauses[2];
  
    // generate the SQL query string
     sql = sqlstring.format(`SELECT ${select} FROM ${table}`);
    console.log(sql);
  }
  

  // execute the query
  connection.query(sql, (err, results, fields) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(results);
    }
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});