const assert = require('assert');

exports.insertDocument = (db, document, collection , callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err,result) => {

    });
}

exports.findDocument = (db, collection , callback) => {
    const coll = db.collection(collection);
}

exports.removeDocument = (db, document, collection , callback) => {
    const coll = db.collection(collection);
}

exports.updateDocument = (db, document, update, collection , callback) => {
    const coll = db.collection(collection);
}