var fastn = require('^fastn'),
    app = require('^app'),
    docModel = app.doc.docModel;

module.exports = function( activityModel ){ 
    return fastn('div', { class: 'editor' },
        fastn('div',{ class: 'doc-left-panel' },
            fastn('list', {
                class: 'contents',
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
            }).attach(docModel)
        ),
        fastn('div',{ class: 'doc-centre-panel' },
            fastn('div',
                {
                    class: 'doc',
                    contenteditable: true,
                    spellcheck: true
                },
                fastn('list', {
                    class: 'doc-items',
                    items: fastn.binding('currentDoc.ast|*'),
                    template: function( model ){
                        return fastn('div', 
                            { 
                                class: fastn.binding('item.type', function(value){
                                    return 'doc-section-' + value;
                                }),
                                contenteditable:true,
                                textContent: fastn.binding('item.text|0'),
                                tabindex:'1',
                                draggable:true
                            }
                            // ,
                            // fastn.binding('item.text|0')
                        ).on('keyup',function(event, scope){
                            console.log('event, scope ',event, scope)                        
                            
                            //Actually here is the logic ...
                            /// If the values of the textarea starts with '#' then change the style and set the section title in model
                            // It is the containing div? 
                            // So I can drag and drop to other divs?
                            // Create a new text area. 
                            // 
                            
                            switch (  event.keyCode ){
                                case 13:
                                    console.log('hooray')
                                    break;
                                case 35:
                                    titleTrigger = 1;
                                    console.log('trigger val', titleTrigger)
                                    break;
                                case 32:
                                    titleTrigger = 0;
                                    console.log('trigger val', titleTrigger)
                                    
                                    break;
                                default:
                                    ( titleTrigger ) ? console.log('Need to assign class & format') : '';
                                    console.log('key', keycode)
                            }
                        });
                    }
                }).attach(docModel)
            )
        ),
        fastn('div', { class: 'doc-right-panel' },
            fastn('div', {class:'bibliography'},
                fastn('div',{class:'bib-title'}, 'Bibliography' )
                    .on('click',function(event, scope) {
                        event.preventDefault();
                        // app.activityRouter.reset('home');
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
            )
        )
    );
}