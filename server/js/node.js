var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'szj20031218',
    port: '3306',
    database: 'data75',
})
connection.connect();
app.get('/pm2_5', (req, res) => {
    connection.query('select * from pm2_5 order by value desc', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
})

app.get('/china.json', (req, res) => {
    res.sendFile('asserts/china.json', { root: __dirname })
})

app.get('/gdp', (req, res) => {
    connection.query('select name,value from gdp where year=2023 order by value desc', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
})

app.get('/edu', (req, res) => {
    connection.query('select name, value from university where year=2022 order by value desc', function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.post('/search', (req, res) => {
    const year = req.body.year;
    const type = req.body.type;
    const order = req.body.order;
    const sql = `select name,value from ${type} where year = ${year} order by value ${order}`
    connection.query(sql, function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.post('/history', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const sql = `select year,value from ${type} where name = '${name}' order by year asc`
    connection.query(sql, function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

const port = 1949;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
