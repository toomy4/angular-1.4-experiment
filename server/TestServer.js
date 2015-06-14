var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log('Got a connection from client, path=' + req.url);

    var cleanPath = req.url.charAt(req.url.length - 1) == '/' ? req.url.substring(0, req.url.length - 2) : req.url;

    var filePath = 'build/app/' + (cleanPath || 'index.html');

    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }

        function getMime(fn) {
            if (!fn)
                return 'text/html';
            var ext = fn.substring(filePath.lastIndexOf('.'));
            switch (ext.toUpperCase()) {
                case 'js':
                    return 'application/javascript';
                case 'json':
                    return 'application/json';
                case 'html':
                    return 'text/html';
            }
        }

        fs.readFile(filePath, {}, function (err, buff) {
            if (err) {
                res.writeHead(404);
                res.end('Error reading file: ' + err);
                return;
            }

            console.log('Serving file: ' + filePath);
            res.writeHead(200, {'Content-Type': getMime(filePath) + ";charset=utf8"});
            res.write(buff);
            res.end();
        });

    });
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
