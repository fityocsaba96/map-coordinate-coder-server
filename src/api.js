const express = require('express');
const HistoryDb = require('./service/history-db');
const Coder = require('./service/coder');

const api = express();
api.use(express.json());
const historyDb = new HistoryDb();
const coder = new Coder();

api.post('/encode', (request, response) => {
    const encoded = coder.encode(request.body.coordinate, request.body.accuracy);
    historyDb.createEncoding(request.body.coordinate, encoded);
    response.send({ code: encoded }).end();
});

api.post('/decode', (request, response) => {
    const decoded = coder.decode(request.body.code);
    historyDb.createDecoding(request.body.code, decoded);
    response.send(decoded).end();
});

api.get('/history', (request, response) => {
    const allHistory = historyDb.readAll();
    const allHistoryGrouped = { encode: [], decode: [] };
    allHistory.forEach(history => {
        allHistoryGrouped[history.type].push({ coordinate: history.coordinate, code: history.code });
    });
    response.send(allHistoryGrouped).end();
});

module.exports = api;
