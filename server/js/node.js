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


app.get('/china.json', (req, res) => {
    res.sendFile('asserts/china.json', { root: __dirname })
})

app.get('/gdp', (req, res) => {
    connection.query('select name,value from gdp where year=2022 order by value desc', function (error, results, fields) {
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

app.get('/population', (req, res) => {
    connection.query('select name, city,countryside from population where year=2022 order by (city+countryside) desc', function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.get('/i18n', (req, res) => {
    connection.query('select name,value from i18n where year=2022 order by value desc', function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.get('/production', (req,res)=> {
    connection.query('select name,value  from production where year=2022 order by value desc', function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.post('/search', (req, res) => {
    const year = req.body.year;
    const type = req.body.type;
    const order = req.body.order;
    const sql = `select * from ${type} where year = ${year} order by value ${order}`
    connection.query(sql, function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

app.post('/history', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const sql = `select * from ${type} where name = '${name}' order by year asc`
    connection.query(sql, function (error, result, field) {
        if (error) throw error;
        res.json(result);
    })
})

const port = 1949;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
