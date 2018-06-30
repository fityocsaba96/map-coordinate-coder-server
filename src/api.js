const express = require('express');
const HistoryDb = require('./service/history-db');
const Coder = require('./service/coder');

const api = express();
api.use(express.json());
const historyDb = new HistoryDb();
const coder = new Coder();



module.exports = api;
