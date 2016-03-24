var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

var home = fastn('div', {class: 'page'},
        fastn('div',  {class: 'docs'},
            fastn('list', {
                items: fastn.binding('docs|*'),
                template: function( model ){
                return  fastn('div',  {class: 'doc-card'},
                        // {class: 'mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone'},
                            fastn('label', {class: 'doc-title'}, fastn.binding('item.title') ),
                            fastn('label', {class: 'doc-startDate'}, 
                                fastn.binding('item.lastEdit', function(value){
                                    var d = new Date(value);
                                    return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
                                })),
                            fastn('label', {class: 'doc-tutor'},fastn.binding('item.author') )
                            
                        ).on('click',function(event,scope){
                            console.log('helol', scope.get('.') );
                            app.activityRouter.add('editor',{_id:scope.get('item.id')});
                            app.doc.setCurrentDoc( scope.get('item.id') );
                        });
                }
            })
            .attach(docModel)
        )
        
    );

// <div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
//               <div class="mdl-card__supporting-text">
//                 <h4>Features</h4>
//                 Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum esse.
//               </div>
//               <div class="mdl-card__actions">
//                 <a href="#" class="mdl-button">Read our features</a>
//               </div>
//             </div>

module.exports = function(){
    
    return home;
}