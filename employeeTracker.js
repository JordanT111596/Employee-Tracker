var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // The port; if not 3306
    port: 3306,

    // The username
    user: "root",

    // The password and connected database
    password: "rootroot",
    database: "playlist_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // afterConnection();
});

// function afterConnection() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
// }