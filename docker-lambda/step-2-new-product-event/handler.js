"use strict";
const axios = require("axios");

const add_Empty = async (event) => {
    let newevent = JSON.parse(event.Records[0].body)
    console.log(event);
    console.log("event : ", newevent);
    let stock = 10;

    var mysql = require("mysql");
    var connection = mysql.createConnection({
    host: process.env.HOST_RDS,
    user: process.env.USER_RDS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_RDS,
    });

    connection.query(`
        UPDATE product SET stock = +${stock};
        `,
    );

    console.log("result:", results)
    console.log("입고 완료!")
}

module.exports = {
    add_Empty,
};