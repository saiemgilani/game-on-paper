// schedule.js
const fs = require('fs');
const util = require('util');
const axios = require('axios')
const path = require("path");
const Games = require('./games');

let range = (start:any, end:any) => Array.from(Array(end + 1).keys()).slice(start);

let schedule = {}
fs.readFile(path.resolve(__dirname, "schedule.json"), function (err: any, data: any) {
    if (err) {
        throw err;
    }
    schedule = JSON.parse(data);
});

let groupMap: string[] = [];
fs.readFile(path.resolve(__dirname, "groups.json"), function (err: any, data: any) {
    if (err) {
        throw err;
    }
    groupMap = JSON.parse(data);
});




export const scheduleList = schedule;
export const groupList = groupMap;

