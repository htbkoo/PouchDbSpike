import * as PouchDB from "pouchdb";
import {addItem} from "./pouchSpike";

import * as pouchdb_adapter_memory from "pouchdb-adapter-memory";

PouchDB.plugin(pouchdb_adapter_memory);
// PouchDB.plugin(require('pouchdb-adapter-memory'));

describe('pouchDB', function () {
    it('should add to local database', function () {
        const db = new PouchDB('in_memory_database', {adapter: 'memory'});
        return addItem(db, "")
            .then(data => expect(data).toBeDefined());
    });
});