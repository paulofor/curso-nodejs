const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db, {  name: "Prato Novo", description: "Delicioso"}, "dishes", (result) => {
        console.log("Inseriu documento: \n" , result.ops);
        dboper.findDocument(db, "dishes", (docs) => {
            console.log("Encontrou documentos:\n",docs);
            dboper.updateDocument(db, {  name: "Prato Novo" },{ description: "Novo Delicioso"}, "dishes", 
                (result) => {
                    console.log("Alterou documentos:\n", result.result);
                })
        }) 
    })

});