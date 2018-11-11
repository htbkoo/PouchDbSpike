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
            .then(doc => expect(doc.title).toEqual("another"));
    });

    it('cannot get doc after remove (with deleted reason)', function () {
        return addItem(db, "more")
            .then(result => db.get(result.id))
            .then(doc => db.remove(doc))
            .then(result => db.get(result.id))
            .catch(err => {
                expect(err.name).toEqual("not_found");
                expect(err.reason).toEqual("deleted");
            });
    });

    it("test allDocs", function () {
        return addItem(db, "more")
            .then(() => db.allDocs({include_docs: true}))
            .then(allDocs => {
                console.log(allDocs);
                expect(allDocs.total_rows).toEqual(1);
            })
    });

    it("test allDocs after remove", function () {
        return addItem(db, "more")
            .then(result => db.remove({
                _id: result.id,
                _rev: result.rev
            }))
            .then(() => db.allDocs({include_docs: true}))
            .then(allDocs => {
                console.log(allDocs);
                expect(allDocs.total_rows).toEqual(0);
            })
            .catch(err => {
                expect(err.name).toEqual("not_found");
                expect(err.reason).toEqual("deleted");
            });
    });
});