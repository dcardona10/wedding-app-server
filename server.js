const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const server = express().use(cors());
server.use(bodyParser.json());

const db = mysql.createConnection({
    host : 'wedding-app.c5wqyus6ywu4.us-east-1.rds.amazonaws.com',
    user : 'admin',
    password : 'Mysql123#',
    database : 'wedding-app'
});

db.connect(function (error) {
    if (error) {
        console.log("Error connecting to Database");
    } else {
        console.log("Connected to Database");
    }
});

server.listen(8085, function check (error) {
    if (error) {
        console.log("Error");
    } else {
        console.log("Listening on port 8085");
    }
});

server.get("/api/guest", (req, res) => {
    var sql = "SELECT name, confirmed, confirmationdate FROM tbl_guest_test";
    db.query(sql, function(error, result) {
        if (error) {
            console.log("Error connecting to Database");
        } else {
            res.send({status : "OK", data : result});
        }
    });
});

server.get("/api/guest/:name", (req, res) => {
    var firstname = req.params.firstname;
    var sql = "SELECT id, name, invitationid FROM tbl_guest_test WHERE name LIKE '" + name + "%'";
    db.query(sql, function(error, result) {
        if (error) {
            console.log("Error connecting to Database");
        } else {
            res.send({status : "OK", data : result});
        }
    });
});

server.get("/api/guest/invite/:inviteid", (req, res) => {
    var inviteid = req.params.inviteid;
    var sql = "SELECT id, name, confirmed FROM tbl_guest_test WHERE invitationid = '" + inviteid + "'";
    db.query(sql, function(error, result) {
        if (error) {
            console.log("Error connecting to Database");
        } else {
            res.send({status : "OK", data : result});
        }
    });
});

server.put("/api/guest/confirm/:id", (req, res) => {
    let sql = "UPDATE tbl_guest_test SET confirmed = " + req.body.confirmed + ", confirmationdate = NOW() WHERE id = " + req.params.id;
    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({status : "Error", message : "Confirmation Failed"});
        } else {
            res.send({status : "OK", message : "Confirmation Succeded"});
        }
    })
});