var levelup = require('levelup'),
    leveljs = require("level-js"),
    db = levelup('theses', { db: leveljs } ) ;
    refDB = levelup('references', { db: leveljs } ) ;

var ref = require('./references.json');

refDB.batch(ref, function (error, response) {
   if (error) {console.log('done refDB',error);}
})

var data = require('./setupData');

db.batch(data, function (error, response) {
   if (error) {console.log('done',data);}
})

function getDocument( settings, callback ){ 
    db.get(settings.id, callback);
};

function getDocuments( settings, callback ){ 
    db.createReadStream({'limit': 20})
        .on('data', function ( data ){
            callback(null,data);
        })
        .on('error', function (err) {
            callback(err,null);
        })
        .on('end', function () {});
};

function getReferences( settings, callback  ){ 
    refDB.createReadStream({'limit': 100})
        .on('data', function ( data ){
            // console.log(data)
            callback(null,data);
        })
        .on('error', function (err) {
            
        })
        .on('end', function () {});
};



module.exports = {
  getDocument: getDocument,
  getDocuments: getDocuments,
  getReferences: getReferences
}