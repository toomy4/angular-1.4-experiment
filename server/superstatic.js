/**
 * Created by Toomy on 15.03.2015.
 */
//var connect = require('../node_modules/superstatic/node_modules/connect');
var server = require('../node_modules/superstatic/lib/server');
//var proxy = require('../node_modules/superstatic-proxy');

var spec = {
    port: 1337,
    cwd: __dirname,
    config: {
        root: './../build/',
        routes: {
            '**': 'index.html'
        },
        proxy: {
            api: {
                origin: "http://localhost:8080/",
                cookies: true,
                timeout: 30
            }
        }
    },
    gzip: true,
    debug: true,
    routes: [],
    redirects: {"index.html": ""},
    cache_control: {
        "app/**": false
    }
};

var onListen = function (err) {
    if (err)
        console.log('error: ' + err);
    console.log('superstatic server started on port: ' + spec.port);
};

var app = server(spec).listen(onListen);


//var app = connect()
//        .use(proxy(spec))
//        .use(servu)
//    ;

//var server = ss.server(spec)
//    .use(proxy(spec))
//    .listen(function () {
//    });

//var app = connect()
//    .use(ss(spec))
//    //.use(ss.server(spec))
//    .listen(function (err) {
//        if (err)
//            console.log(err);
//        else
//            console.log('superstatic server started on port: ' + spec.port);
//    });


