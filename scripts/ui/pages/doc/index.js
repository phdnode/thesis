var fastn = require('^fastn'),
    app = require('^app'),
    marked = require('marked-ast'),
    toMarkdown = require('marked-ast-markdown'),
    docModel = app.doc.docModel;

var doc = function( activityModel ){ 
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
                        innerHTML: fastn.binding('item.text|0'),
                        tabindex:1
                        // ,
                        // onkeyup: 'innerHTML:innerHTML'
                    }
                    // , 
                    // fastn.binding('item.text|0')
                )
                // .on('click',function(model, scope){
                //     // console.log('hello',model,scope.get('.'));
                    
                // })
                .on('keyup',function(event, scope){
                    console.log(event, scope)                        
                    
                
                    //Actually here is the logic ...
                    /// If the values of the textarea starts with '#' then change the style and set the section title in model
                    // It is the containing div? 
                    // So I can drag and drop to other divs?
                    // Create a new text area. 
                    // 
                    
                    var keycode =  event.keyCode;
                    switch ( keycode ){
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
    );
}

module.exports = doc;

// function resize () {
//     text.style.height = 'auto';
//     text.style.height = text.scrollHeight+'px';
// }

// /* 0-timeout to get the already changed text */
// function delayedResize () {
//     window.setTimeout(resize, 0);
// }

// // var text = document.getElementById('text');
                        
//                         // observe(text, 'change',  resize);
//                         // observe(text, 'cut',     delayedResize);
//                         // observe(text, 'paste',   delayedResize);
//                         // observe(text, 'drop',    delayedResize);
//                         // observe(text, 'keydown', delayedResize);

//                         // text.focus();
//                         // text.select();
//                         // resize();
// // fastn.Model()

// module.exports = function( activityModel ){
//     return  fastn('div', {class: 'page'},
//             fastn('list', {
//                 class: 'doc-items',
//                 items: fastn.binding('currentHeadings|*'),
//                 template: function( model ){
//                     // <input type="button" onClick="document.getElementById('middle').scrollIntoView();" />
//                     return fastn('button', fastn.binding('item')
//                     )
//                 }
//             }),
//             fastn('div',
//                 {
//                     contenteditable:true,
//                     spellcheck: true
//                 },
//                 fastn('list', {
//                     class: 'doc-items',
//                     items: fastn.binding('currentDoc.ast|*'),
//                     template: function( model ){
//                         return fastn('div', 
//                             { 

//                                 class: fastn.binding('item.type', function(value){
//                                     return 'doc-section-' + value;
//                                 })
//                             }, 
//                             fastn.binding('item.text|0')
//                         ).on('change', function(model, scope){
//                             // console.log('scope', scope.get('.'));
//                             // console.log('model', model.target.clientWidth);    
//                         })
//                         .on('keydown', function(model, scope){
//                             // console.log('scope', scope.get('.'));
//                             console.log('model', model.target.clientHeight);    
//                         })
//                     }
//                 })
//             ),
//             fastn('list', {
//                 class: 'doc-items',
//                 items: fastn.binding('currentCitations|*'),
//                 template: function( model ){
//                     return fastn('label', fastn.binding('item')
//                     )
//                 }
//             })
//         ).attach(docModel);
//     }        
//                     //     fastn('label', {class: 'doc-startDate'}, 
//                     //         fastn.binding('item.lastEdit', function(value){
//                     //             var d = new Date(value);
//                     //             return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
//                     //         })),
//                     //     fastn('label', {class: 'doc-tutor'},fastn.binding('item.author') )
                        
//                     // ).on('click',function(event,scope){
//                     //     // console.log('helol',scope.get('item.id') );
//                     //     app.activityRouter.add('doc',{_id:scope.get('item.id')});
//                     //     app.doc.setCurrentDoc( scope.get('item.id') );
//                     // });
//             // }
        
// // ,


// //         fastn('div',  {class: 'docs'}, 
// //             fastn('textarea', 
// //                 {
// //                     class:'predicateTitle',
// //                     // disabled: fastn.binding('disabled').attach(app.disable.model),
// //                     // value: fastn.binding('currentDoc.author').attach(app.documents.documentModel),
// //                     value: fastn.binding('currentDoc.title'),
// //                     // value: app.documents.title,
// //                     placeholder: 'Predicate title',
// //                     onkeyup: 'value:value'
// //                 }
// //             ),
// //             fastn('textarea', 
// //                 {
// //                     class:'predicateTitle',
// //                     // disabled: fastn.binding('disabled').attach(app.disable.model),
// //                     // value: fastn.binding('currentDoc.author').attach(app.documents.documentModel),
// //                     value: fastn.binding('currentDoc.ast', function(value){
// //                         // var md = toMarkdown(JSON.stringify(JSON.parse(value)));
// //                         // ast.map(writeNode).join('');
// //                         if ( value ){
// //                             return toMarkdown(value);
// //                         }
// //                         // var x =  new Array (value);
// //                         // // var x = JSON.parse(value);
// //                         // console.log('x',x)
// //                         // for(i in x){
// //                         //     console.log('i',i)
// //                         // }
// //                         // // var md = toMarkdown();
// //                         // // console.log(md);
// //                         // return JSON.stringify(value);
// //                     }),
// //                     // value: app.documents.title,
// //                     placeholder: 'Predicate title',
// //                     onkeyup: 'value:value'
// //                 }
// //             )
// //         ).attach(docModel)
// //     );
// // }



