var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

module.exports = function( activityModel ){
    return  fastn('div', {class: 'page'},
        fastn('div',  {class: 'docs'}, 
            fastn('div',  {class: 'doc-head'},fastn.binding('currentdoc.title'), ' - ',fastn.binding('currentdoc.courseId') )
        ),
        fastn('list', {
            class: 'doc-items',
            items: fastn.binding('currentdoc.topics|*'),
            template: function( model ){
                return fastn('div',  {
                            itemscope : '',
                            itemtype:'http://schema.org/Movie',
                            class: 'doc-topic'
                        },
                        fastn.binding('item.title'),
                        // fastn('span',{ 
                        //     itemscope : '',
                        //     itemprop:"startDate", 
                        //     datetime:"2011-05-08T19:30"},
                        //     'May 8, 7:30pm'),
                        fastn('div', {'class': 'doc-vote'}, 
                            fastn('icon', { class: 'doc-vote-no', 'name': 'close'}) 
                                .on('click', function(event, scope) {
                                        event.preventDefault();
                                        event.stopImmediatePropagation();
                                    }
                                ),
                            // fastn('label',  {class: 'nonComprende'},fastn.binding('item.nonComprehende'),     '  ' ),
                            fastn('label',  {class: 'percentage'},'0 %' ),
                            // fastn('label',  {class: 'comprende'},fastn.binding('item.comprehende'), '  ' ),
                            fastn('icon', {'class': 'doc-vote-yes','name': 'check'}) 
                                .on('click', function(event, scope) {
                                        event.preventDefault();
                                        event.stopImmediatePropagation();
                                        console.log('hi', scope.get('.'));
                                    }
                                )
                        )

                    
                    ).on('click',function(event,scope){
                        // console.log('helol',scope.get('item.id') );
                        // app.activityRouter.add('doc',{_id:scope.get('item.id')});
                    });
            }
        })
    ).attach(docModel);
}



