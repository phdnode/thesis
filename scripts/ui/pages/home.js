var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

var home = fastn('div', {class: 'page'},
        fastn('div',  {class: 'docs'},
            fastn('list', {
                class: 'doc-items',
                items: fastn.binding('docs|*'),
                template: function( model ){
                return  fastn('div',  {class: 'doc-card'},
                            fastn('label', {class: 'doc-title'}, fastn.binding('item.title') ),
                            fastn('label', {class: 'doc-startDate'}, 
                                fastn.binding('item.lastEdit', function(value){
                                    var d = new Date(value);
                                    return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
                                })),
                            fastn('label', {class: 'doc-tutor'},fastn.binding('item.author') )
                            
                        ).on('click',function(event,scope){
                            // console.log('helol',scope.get('item.id') );
                            app.activityRouter.add('doc',{_id:scope.get('item.id')});
                            app.doc.setCurrentDoc( scope.get('item.id') );
                        });
                }
            })
            .attach(docModel)
        )
        
    );

module.exports = function(){
    
    return home;
}