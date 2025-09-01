var mysql = require('mysql')


var connecteBanco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "escola"

});

module.exports = connecteBanco;