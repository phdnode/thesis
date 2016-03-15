module.exports = require('fastn')({
    _generic: require('fastn/genericComponent'),
    templater: require('fastn/templaterComponent'),
    list: require('fastn/listComponent'),
    text: require('fastn/textComponent'),
    modal: require('modal-component/modalComponent'),
    icon: require('svg-icon-component/iconComponent')({
        resolvePath: function(iconName){
            return 'styles/icons/' + iconName + '.svg';
        }
    })
}, true);