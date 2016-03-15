var fastn = require('^fastn'),
    marked = require('marked-ast'),
    toMarkdown = require('marked-ast-markdown'),
    debug = require('debug')('tutorme:app.doc');

var docModel = new fastn.Model({
    currentDoc: {},
    docs : [
        {
            id : '01',
            author: 'Sholto Maud',
            email: 'sholto.maud@gmail.com',
            edits : [ {
                startDate: new Date("2016-03-01T11:00:00"),
                endTime: ''}],
            lastEdit: new Date("2016-03-01T11:00:00"),
            ast : [],
            title: 'First test'
        },{
            id: '02',
            author: 'Sholto Maud',
            email: 'sholto.maud@gmail.com',
            edits : [ {
                startDate: new Date("2016-03-01T11:00:00"),
                endTime: ''}],
            lastEdit: new Date("2016-03-01T11:00:00"),
            ast : [],
            title: 'Second test'
        }
    ]
});

// [ { type: 'heading',
//     text: [ 'The Principle of Least Action and the Philosophy of Engineering: Philosophy of Mind' ],
//     level: 1,
//     raw: 'The Principle of Least Action and the Philosophy of Engineering: Philosophy of Mind' },
//   { type: 'paragraph',
//     text: [ 'Candidature Doctoral thesis by Mr Sholto Maud' ] },
//   { type: 'heading', text: [ 'Usage' ], level: 2, raw: 'Usage' },
//   { type: 'paragraph', text: [ 'Download with git, or npm' ] } ]


// var content = fs.readFileSync(__dirname + '/test.md', 'utf8');

function updateDoc(content){
    var ast = marked.parse(content);
    

    docModel.update('currentDoc.ast', ast);
}


function getDoc(){
    return toMarkdown(docModel.get('currentDoc'));
}



// var ast = marked.parse(content);
// var html = marked.render(ast);

// con

// // console.log('html', html);
// console.log('ast', ast);

module.exports = {
    docModel : docModel
}