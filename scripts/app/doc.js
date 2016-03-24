var fastn = require('^fastn'),
    marked = require('marked-ast'),
    toMarkdown = require('marked-ast-markdown'),
    debug = require('debug')('tutorme:app.doc'),
    session = require('./session'),
    db = require('./localPersistence'),
    localSettings = {},
    cpjax = require('cpjax'),
    offline = true,
    docModel = new fastn.Model({
        docs : [],
        currentHeadings: []
    });

// debugging
docModel.on('currentDoc|**', function(data){
    console.log('docModel change',data);
});

function getDocument(id, callback){
    if (offline){
        db.getDocuments( localSettings, function(error, data){ 
            docModel.set('currentDoc', JSON.parse(data.value));
        });
    }
    else {
        cpjax({
            url:'/documents/' + id,
            dataType: 'json',
            headers:{
                authorization: session.getToken()
            }
        }, callback);
    }    
}

function getDocuments(){
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


function clearCurrentDoc(){
    docModel.set('currentHeadings', []);
    docModel.set('currentCitations', []);
    docModel.set('currentDoc', []);
}

function setCurrentDoc(id){
    


    docModel.set('currentHeadings', []);
    docModel.set('currentCitations', []);
    // docModel.set('references', []);
    
    if (offline){
        db.getDocument( id, function(error, data){ 
            var dat = JSON.parse(data);
            var ast = [];
            ast = dat.ast;
            for ( i in ast ){
                if ( ast[i]['type'] == 'heading' && ast[i]['level'] == 1 ){
                    console.log('heading',ast[i], ast[i]['type']);
                    var heading = ast[i]['text'][0];
                    docModel.push('currentHeadings', heading );        
                }
                if ( ast[i]['type'] == 'cite' ){
                    var citation = ast[i]['text'][1][0]['text'];
                    // console.log('cite',ast[i]['text'][1][0]['text']);
                    docModel.push('currentCitations', citation );        
                }
                
                
            }
            docModel.set('currentDoc', JSON.parse(data));
        });
    }
}



// var ast = marked.parse(content);
// var html = marked.render(ast);

// con

// // console.log('html', html);
// console.log('ast', ast);

module.exports = {
    docModel : docModel,
    getCurrentDoc: getCurrentDoc,
    setCurrentDoc: setCurrentDoc,
    clearCurrentDoc:clearCurrentDoc
}