var fastn = require('^fastn'),
    app = require('^app');

module.exports = function(){
    return fastn('div', {class: 'appBar'},
        fastn('div',{class:'menu'},
            fastn('icon', {'name': 'menu'}) )
            .on('click', function(event, scope) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // require('../modals').menu.show(true);

              //   <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn1" data-upgraded=",MaterialButton,MaterialRipple">
              // <i class="material-icons">more_vert</i>
            // <span class="mdl-button__ripple-container"><span class="mdl-ripple is-animating" style="width: 92.5097px; height: 92.5097px; transform: translate(-50%, -50%) translate(19px, 20px);"></span></span></button>
            }
        ),
        fastn('div',{class:'app-title'}, 'Simple Thesis' )
        .on('click',function(event, scope) {
            event.preventDefault();
            app.activityRouter.reset('home');
            app.doc.clearCurrentDoc();
        }),
        fastn('div',{class:'menu'},
            fastn('icon', {'name': 'login'}) )
                .on('click', function(event, scope) {
                event.preventDefault();
                event.stopImmediatePropagation();
                // require('../modals').menu.show(true);
            })
        )
};

//This would be for the modal

 // <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn1">
 //              <li class="mdl-menu__item">Lorem</li>
 //              <li class="mdl-menu__item" disabled>Ipsum</li>
 //              <li class="mdl-menu__item">Dolor</li>
 //            </ul>