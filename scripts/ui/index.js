var fastn = require('^fastn');

module.exports = fastn('div', {class:'demo-layout-transparent mdl-layout mdl-js-layout'},
    require('./appBar')(),
    require('./activities')
);

