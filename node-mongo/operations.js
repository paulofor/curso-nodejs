const assert = require('assert');

exports.insertDocument = (db, document, collection , callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err,result) => {
        assert.equal(err,null);
        console.log('Inseriu ' + result.result.n + 
            ' documentos na collection ' + collection);
        callback(result);
    });
}

exports.findDocument = (db, collection , callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs) => {
        assert.equal(err, null);
        callback(docs);
    })
}

exports.removeDocument = (db, document, collection , callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err,result) => {
        assert.equal(err,null);
        console.log('Removeu o documento' , document);
        callback(result);
    })
}

exports.updateDocument = (db, document, update, collection , callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update } , null, (err,result) => {
        assert.equal(err,null);
        console.log("Atualizou documentos com " , update);
        callback(result);
    })
}