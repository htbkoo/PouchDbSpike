import * as PouchDB from "pouchdb";
import {addItem} from "./pouchSpike";

describe('pouchDB', function () {
    it('should add to local database', function () {
        const db = new PouchDB('data/my_database');
        return addItem(db, "")
            .then(data => expect(data).toBeDefined());
    });
});