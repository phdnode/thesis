var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

module.exports = function( activityModel ){
    return  fastn('div', {class: 'page'},
        'hi',
        fastn('div',  {class: 'docs'}, 
            fastn('textarea', 
                {
                    class:'predicateTitle',
                    disabled: fastn.binding('disabled').attach(app.disable.model),
                    // value: fastn.binding('document.title').attach(app.documents.documentModel),
                    value: app.documents.title,
                    placeholder: 'Predicate title',
                    onkeyup: 'value:value'
                }
            )
        ).attach(docModel);
    )
}



