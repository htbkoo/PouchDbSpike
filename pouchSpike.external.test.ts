import * as PouchDB from "pouchdb";

describe('pouchDB (remote database)', function () {
    const db = new PouchDB('http://localhost:5984/kittens');

    it('should get info from remote database', function () {
        return db.info().then(function (info) {
            console.log(info);
        })
    });
});