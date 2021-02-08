const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser')
var amqp = require('amqplib/callback_api');

app.use(cors());
app.use(bodyParser.json());
/*
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'orderqueue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            if(msg.content.toString() === "order"){
                console.log("new database rule set");
            }
        }, {
            noAck: true
        });
    });
});
*/
// if(process.env.DATABASENAME && process.env.HOSTNAME && process.env.USERDB && process.env.PASSWORDDB){
//     $databasename = process.env.DATABASENAME;
//     $hostname = process.env.HOSTNAME;
//     $userdb = process.env.USERDB;
//     $passworddb = process.env.PASSWORDDB;
// }
// else{
//     $databasename = "order_db";
//     $hostname = "localhost";
//     $userdb = "root";
//     $passworddb = "";
// }
// var con = mysql.createConnection({
//     host: "vsr-kub005.informatik.tu-chemnitz.de",
//     user: "root",
//     password: "1234",
//     database: "product_db"
// });
// $link = mysql_connect('http://10.105.125.0:3306/', 'root', '1234');
var con = mysql.createConnection('mysql://root:1234@10.105.125.0:3306/product_db');


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/products', cors(), (req, res) => {
    var queryStr = "SELECT * FROM products WHERE 1";
    con.query(queryStr, function (error, result, fields) {
        if(error){
            console.log(error);
        }
        //console.log("data" + JSON.stringify(data));
        res.send(result);
    });
});




app.listen(port, () => {
    console.log(`Inventory Service listening at http://localhost:${port}`)
});





