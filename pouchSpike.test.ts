import * as PouchDB from "pouchdb";
import {addItem} from "./pouchSpike";

const db = new PouchDB('data/my_database');

describe('pouchDB', function () {
    it('should add to database', function () {
        return addItem(db, "")
            .then(data => expect(data).toBeDefined());
    });
});