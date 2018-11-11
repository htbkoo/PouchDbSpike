import * as PouchDB from "pouchdb";
import {addItem} from "./pouchSpike";

import * as pouchdb_adapter_memory from "pouchdb-adapter-memory";

PouchDB.plugin(pouchdb_adapter_memory);
const db = new PouchDB('in_memory_database', {adapter: 'memory'});

describe('pouchDB', function () {
    it('should add to local database', function () {
        return addItem(db, "")
            .then(data => expect(data).toBeDefined());
    });

    it('should update document correctly in local database', function () {
        return addItem(db, "some")
            .then(result => db.get(result.id))
            .then(doc => {
                expect(doc).toBeDefined();
                return doc;
            })
            .then(doc => db.put({
                ...doc,
                title: "another"
            }))
            .then(result => {
                expect(result.ok).toEqual(true);
                return db.get(result.id);
            })
            .then(doc=>expect(doc.title).toEqual("another"));
    });
});