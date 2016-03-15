var fastn = require('^fastn'),
    marked = require('marked-ast'),
    toMarkdown = require('marked-ast-markdown'),
    debug = require('debug')('tutorme:app.doc'),
    session = require('./session'),
    db = require('./localPersistence'),
    localSettings = {},
    cpjax = require('cpjax'),
    offline = true;

var docModel = new fastn.Model({
    currentDoc: {},
    docs : []
});


function getDocument(id, callback){
    cpjax({
        url:'/documents/' + id,
        dataType: 'json',
        headers:{
            authorization: session.getToken()
        }
    }, callback);
}

function getDocuments(){
    localSettings['id'] = 'somedocument';
    if (offline){
        db.getDocuments( localSettings, function(error, data){ 
            docModel.push('docs', JSON.parse(data.value));
        });
    }
    else { 
        cpjax({
            url:'/documents',
            dataType: 'json',
            headers:{
                authorization: session.getToken()
            }
        }, function(error, data){
            if(error){
                return;
            }
            docModel.set('documents', data)
        });
    }
}

getDocuments();

db.getReferences( localSettings, function(error, data){ 
            console.log('data',data);
        });


// function updateDocument( callback){
//      cpjax({
//         url:'/documents/' + documentModel.get('document.id'),
//         method: 'PUT',
//         dataType: 'json',
//         data: getData(),
//         headers:{
//             authorization: session.getToken()
//         }
//     }, callback);
// }

function createDocument(callback){
    console.log('getData',getData());
    cpjax({
        url:'/documents',
        method: 'POST',
        dataType: 'json',
        data: getData(),
        headers:{
            authorization: session.getToken()
        }
    }, callback);
}

// getDocuments();

// function getData(){
//     var dat = {}
//     dat.data = documentModel.get('document.data');
//     dat.schemaId = documentModel.get('document.schemaId');
//     dat.data.date = new Date();
//     return dat;
// }

// debugging
docModel.on('.|**', function(data){
    console.log('docModel',data);
});

function save (action, callback){
    if ( action == 'create' ) { 
        createDocument(function(error, document){
            console.log('created Document.id',document.id);
            callback( null, document.id);
        })
    } else if (action == 'update'){
        updateDocument( function(error, document){
            console.log('updated Document.id',document.id);
            callback( null, document.id);
        })  
    } 
}


// var content = fs.readFileSync(__dirname + '/test.md', 'utf8');

function updateDoc(content){
    var ast = marked.parse(content);
    

    docModel.update('currentDoc.ast', ast);
}

function getCurrentDoc(){
    return toMarkdown(docModel.get('currentDoc.ast'));
}

function setCurrentDoc(id){
    console.log('id');
    var currentDocument = docModel.get('');
    
    docModel.set('currentDoc',currentDocument );
}

// var ast = marked.parse(content);
// var html = marked.render(ast);

// con

// // console.log('html', html);
// console.log('ast', ast);

module.exports = {
    docModel : docModel,
    getCurrentDoc: getCurrentDoc,
    setCurrentDoc: setCurrentDoc
}