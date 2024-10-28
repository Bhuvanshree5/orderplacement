const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: '20.115.48.167',
    user: 'bhuvi',
    password:'Bhuvi@922',
    database: 'orderplacement'
})
module.exports = connection