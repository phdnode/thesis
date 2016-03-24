var stylus = require('stylus'),
    // nib = require('nib'),
    mdl = require('material-design-lite-stylus'),
    str = require('fs').readFileSync('./stylus/index.styl', 'utf8');


stylus(str)
  // .import('./index.js')
  
  // .include(require('nib').path)
  // .include(require('jeet').path)
  .set('paths', [__dirname + '/custom', __dirname + '/vendor'])
  .set('filename', __dirname + '/test.css')
  .use(mdl())
  // .import('mdl');
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });