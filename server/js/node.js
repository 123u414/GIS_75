var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');



const app = express();
app.use(cors());

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'szj20031218',
    port: '3306',
    database: 'data75',
})
connection.connect();
app.get('/pm2_5', (req, res) => {
    connection.query('select * from pm2_5 order by value desc', function (error, results, fields) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].name, " ", results[i].value);
        }
        res.json(results);
        
    })

})

const port = 1949;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
