const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sunita@09',
  database: 'project',
  port: 3306
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// perform a sample query
connection.query('SELECT * FROM project.account_holder', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

// close the connection
connection.end((err) => {
  if (err) throw err;
  console.log('Connection to MySQL database closed.');
});
