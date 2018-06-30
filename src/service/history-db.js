const Datastore = require('nedb');

class HistoryDb {

    constructor() {
        this._db = new Datastore({ filename: './history-db', autoload: true });
    }

    createEncoding(coordinate, code) {
        this._create('encode', coordinate, code);
    }

    createDecoding(code, coordinate) {
        this._create('decode', coordinate, code);
    }

    _create(type, coordinate, code) {
        this._db.insert({
            type, coordinate, code
        });
    }

    readAll() {
        return this._db.getAllData();
    }
}

module.exports = HistoryDb;
