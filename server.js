const express = require('express');
const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Navin@123456',
  database: 'project',
  port: 3306
});

// create an Express app
const app = express();

// handle GET requests to /query
app.get('/query', (req, res) => {
  // get the query parameter from the URL
  const query = req.query.q;

  // execute the query
  connection.query(query, (err, results, fields) => {
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
