const express = require('express');
const app = express();
const port = process.env.PORT || 3009;
var mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

var amqp = require('amqplib/callback_api');
const amqp_url = 'amqp://localhost'; //for local environment
//const amqp_url = 'amqp://localhost'; //for server

//var con = mysql.createConnection('mysql://root:1234@10.105.125.0:3306/product_db');
var con = mysql.createConnection('mysql://root:@localhost/order_list_db');

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

function amqpMethod(msg){
    amqp.connect(amqp_url, function (error0, connection) {
        if (error0) {
            console.log( error0 );
        }
        /*
        * Channel for sending Data
        *
        * */
        connection.createChannel(function (error1, channel) {
            if (error1) {
                console.log( error1 );
            }

            var orderCreated = 'orderCreated';

            var msg = {order_id: obj.order_id, status: obj.status};
            msg = JSON.stringify(msg);

            channel.assertQueue(orderCreated, {
                durable: false
            });
            channel.sendToQueue(orderCreated, Buffer.from(msg));

        }); /* ending of channel for sending data */
    });
}

/*
* always consuming data from other services
* */
amqp.connect(amqp_url, function (error0, connection) {
    if (error0) {
        console.log( error0 );
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.log( error1);
        }

        var orderStatus = 'orderStatus';
        channel.assertQueue(orderStatus, {
            durable: false
        });

        channel.consume(orderStatus, function (msg) {
                //console.log(" [x] Received %s", msg.content.toString());
                let msg_json = JSON.parse(msg.content);
                console.log("Event 1: " + msg_json.product_id);
            }
            , {
                noAck: true
            });

    });
});


app.get('/orders', cors(), (req, res) => {
    var queryStr = "SELECT * FROM orders WHERE 1";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.send("not found");
        }
        //console.log("data" + JSON.stringify(data));
        res.status(200);
        res.send(result);
        //console.log(res);
    });
});

app.get('/orders/:id', cors(), (req, res) => {
    const item = req.params.id;
    //console.log("is number: " + !isNaN(item));
    if (item) {
        console.log("search key: " + item);
        var queryStr = "SELECT * FROM orders WHERE orders.payment_id LIKE '" + item + "%' OR orders.order_id LIKE '" + item + "%' OR orders.cart_id LIKE '" + item + "%' OR orders.address LIKE '" + item + "%'";
        con.query(queryStr, function (error, result, fields) {
            if (error) {
                console.log(error);
                if (error.code == 'ER_BAD_FIELD_ERROR') {
                    res.status(400);
                    res.send("Bad request. Please check the data format of the product id.");
                }
                res.status(404);
                res.send("Please check the requested path. Or bad request can not proceed");
            }
            if (result.length > 0) {
                if (result) {
                    res.status(200);
                    res.send(result);
                }
            } else {
                console.log("not found: " + result);
                res.status(404);
                res.send("Not Found");
            }
        });
    } else {
        res.status(400);
        res.send("Bad request. Please check the data format of the product id.");
    }
});


app.post('/orders', cors(), (req, res) => {
    const obj = req.body;
    console.log(obj);
    var queryStr = "INSERT INTO orders (cart_id, payment_id, is_paid, address, status) VALUES ('" + obj.cart_id + "', '" + obj.payment_id + "', '" + obj.is_paid + "', '" + obj.address + "', '" + obj.status + "')";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request");
        }
        //console.log("data" + JSON.stringify(data));
        if (result) {

            res.status(201);
            res.send("location: /orders/" + result.insertId);
        }
    });
});


app.delete('/orders/:id', cors(), (req, res) => {
    const order_id = req.params.id;
    var queryStr = "DELETE FROM orders WHERE orders.order_id = " + order_id;
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request. Please check your requested path.");
        }
        //console.log("data" + JSON.stringify(data));
        if (result) {
            res.status(200);
            res.send("Successfully deleted");
        } else {
            res.status(404);
            res.send("Not found");
        }
    });
});

app.get('/test', cors(), (req, res) => {
    res.send("hellow hellow ");
    console.log('hellow hellow hellow');
});


app.put('/orders/:id', cors(), (req, res) => {
    const obj = req.body;
    const order_id = req.params.id;
    console.log(obj);
    var queryStr = "UPDATE orders SET cart_id = '" + obj.cart_id + "', address = '" + obj.address + "', is_paid = '" + obj.is_paid + "', payment_id = '" + obj.payment_id + "' WHERE order_id='" + order_id + "'";
    con.query(queryStr, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(400);
            res.send("Bad request. Please check your requested path.");
        }
        //console.log("data" + JSON.stringify(data));
        res.status(200);
        res.send("Content updated");
    });
});


app.listen(port, () => {
    console.log(`Inventory Service listening at http://localhost:${port}`)
});
