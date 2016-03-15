var fastn = require('^fastn');

window.addEventListener('load', function(){
    var ui = require('./ui');

    ui.attach().render();

    document.body.appendChild(ui.element);
});
