const express = require('express');
const HistoryDb = require('./service/history-db');

const api = express();
api.use(express.json());
const historyDb = new HistoryDb();



module.exports = api;
