var level = require("level-browserify");

var leveljs = require("level-js"),
    levelup = require("levelup"),
    levelgraph = require('levelgraph'),
    jsonld     = require('levelgraph-jsonld'),
    opts       = { base: 'http://matteocollina.com/base' },
    factory = function (location) { return new leveljs(location) },
    db = jsonld(  levelgraph(levelup("yourdb", { db: factory })), opts);

var manu = [{
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "homepage": { "@type": "@id" },
    "knows": { "@type": "@id" },
    "based_near": { "@type": "@id" }
  },
  "@id": "http://manu.sporny.org#person",
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "knows": [{
    "@id": "https://my-profile.eu/people/deiu/card#me",
    "name": "Andrei Vlad Sambra",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://melvincarvalho.com/#me",
    "name": "Melvin Carvalho",
    "based_near": "http://dbpedia.org/resource/Honolulu"
  }, {
    "@id": "http://bblfish.net/people/henry/card#me",
    "name": "Henry Story",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://presbrey.mit.edu/foaf#presbrey",
    "name": "Joe Presbrey",
    "based_near": "http://dbpedia.org/resource/Cambridge"
  }]
},{
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    "homepage": { "@type": "@id" },
    "knows": { "@type": "@id" },
    "based_near": { "@type": "@id" }
  },
  "@id": "http://manus.sporny.org#person",
  "name": "Manus Sporny",
  "homepage": "http://manu.sporny.org/",
  "knows": [{
    "@id": "https://my-profile.eu/people/deiu/card#me",
    "name": "Andrei Vlad Sambra",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://melvincarvalho.com/#me",
    "name": "Melvin Carvalho",
    "based_near": "http://dbpedia.org/resource/Honolulu"
  }, {
    "@id": "http://bblfish.net/people/henry/card#me",
    "name": "Henry Story",
    "based_near": "http://dbpedia.org/resource/Paris"
  }, {
    "@id": "http://presbrey.mit.edu/foaf#presbrey",
    "name": "Joe Presbrey",
    "based_near": "http://dbpedia.org/resource/Cambridge"
  }]
}];





var tutorial = { 
  "@id": "http://schema.org/EducationEvent"
}  


var paris = 'http://dbpedia.org/resource/Paris';

var query = [{
    subject: manu['@id'],
    predicate: 'http://xmlns.com/foaf/0.1/knows',
    object: db.v('webid')
  }, {
    subject: db.v('webid'),
    predicate: 'http://xmlns.com/foaf/0.1/based_near',
    object: paris
  }, {
    subject: db.v('webid'),
    predicate: 'http://xmlns.com/foaf/0.1/name',
    object: db.v('name')
  }
  ];


var query2 = [{
    subject: manu['@id'],
    predicate: 'http://xmlns.com/foaf/0.1/name',
    object: db.v('name')
  }];


for (i in manu){
    db.jsonld.put(manu[i], function(dat){
    console.log('done put ', dat)
});

}

// var stream = db.searchStream({
    
//     subject: manu['@id']
//   });

// stream.on("data", function(data) {
//   console.log("data",data);
// });

db.jsonld.get(
  "http://manu.sporny.org#person", 
    { 
        '@context': manu['@context'] 
    }, 
    function(err, obj) {
        console.log('obj',obj)
    }
);


// db.search( query2, function(err, response) {
//     console.log('response',response);
//     for ( i in response){
      
//       console.log('solution', response[i].name);
//     }
//   });


module.exports = {

}
