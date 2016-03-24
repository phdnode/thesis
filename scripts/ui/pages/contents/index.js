var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

var contents =  
    fastn('list', {
        class: 'doc-contents',
        items: fastn.binding('currentHeadings|*'),
        template: function( model ){
            // <input type="button" onClick="document.getElementById('middle').scrollIntoView();" />
            return fastn('button', { class: 'contents-button' }, fastn.binding('item', function(value){
                    return ( value.length > 26 )? value.substring(0,20) + ' ... ': value;
                }) 
            ).on('click',function(model, scope){
                console.log('hello',model,scope.get('.'));
            });
        }
    }).attach(docModel);

module.exports = contents;