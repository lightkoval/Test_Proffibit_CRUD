/**
 * Created by s.kovalevskaya on 02.05.2016.
 */
"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var application = express();
var pg = require("pg");

var port = 8080;

var router = express.Router();
var dbConnectionString = "postgres://user:1@localhost:5432/crud";



router.post("/user", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("INSERT INTO users_name (name) VALUES ($1) RETURNING *", [request.body.name], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.json(result.rows[0]);
            }
        });
    });
});

router.get("/users", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT * FROM users_name", function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.json(result.rows);
            }
        });
    });
});

router.get("/users/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT * FROM users_name WHERE id=$1", [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.json( result.rows[0]);
            }
        });
    });
});

router.put("/users", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("UPDATE users_name SET name=$1 WHERE id=$2 RETURNING *", [request.body.name, request.body.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});


router.delete("/users/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("DELETE FROM users_name WHERE id=$1",[request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});



application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

application.use("/", express.static(__dirname + "/../client"));
application.use("/api", router);
application.listen(port);

console.log("Listening port " + port + "...");
