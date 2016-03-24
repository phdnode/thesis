var fastn = require('^fastn'),
    app = require('^app'),
    marked = require('marked-ast'),
    toMarkdown = require('marked-ast-markdown'),
    docModel = app.doc.docModel;

var contents =  function( activityModel ){ 
    fastn('div', {class:'bibliography'},
        fastn('div',{class:'bib-title'}, 'Bibliography' )
            .on('click',function(event, scope) {
                event.preventDefault();
                app.activityRouter.reset('home');
                // app.doc.clearCurrentDoc();
            }),
        fastn('list', {
            class: 'doc-contents',
            items: fastn.binding('references|*'),
            template: function( model ){
                return fastn('button', { 
                    class: 'contents-button' 
                }, 
                fastn.binding('item', function(value){
                    return ( value.length > 26 )? 
                    value.substring(0,20) + ' ... ': value;
                })
                ); 
            }
        })
        .attach(docModel)
    );
}

module.exports = contents;