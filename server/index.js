var SeaLion = require('sea-lion'),
    seaLion = new SeaLion(),
    Dion = require('dion'),
    dion = new Dion(seaLion),
    PORT = 8080;

var serveTute = dion.serveDirectory('./build',  {
            '.js': 'application/javascript',
            '.html': 'text/html',
            '.css': 'text/css',
            '.gif': 'image/gif',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.woff': 'application/font-woff',
            '.woff2': 'application/font-woff2',
            '.ttf': 'font/opentype'
        });

seaLion.add({
    '/`path...`': {
        GET: serveTute
    }
});

require('http').createServer(seaLion.createHandler()).listen(PORT);
console.log('listening on port ', PORT);