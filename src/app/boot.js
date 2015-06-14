/**
 * Created by Toomy on 25.04.2015.
 */
'use strict';

window.LibVersions = {
    jquery: '2.1.3',
    //angular: '1.4.0-beta.6',
    angular: '1.4.0',
    ngMaterial: '0.9.6',
    //ngMaterial: '0.9.0-rc3',

    minified: true,
    qualifier: function () {
        return LibVersions.minified ? '.min' : '';
    },

    baseDir: document.getElementsByTagName('base')[0].href
};

(function ($LAB) {
    $LAB
        .script('//ajax.googleapis.com/ajax/libs/jquery/' + LibVersions.jquery + '/jquery' + LibVersions.qualifier() + '.js')
        .wait(function () {
            console.log('jquery loaded');
        })
        .script('//ajax.googleapis.com/ajax/libs/angularjs/' + LibVersions.angular + '/angular' + LibVersions.qualifier() + '.js')
        .wait(function () {
            console.log('angular core loaded');
        })
        .script('//ajax.googleapis.com/ajax/libs/angularjs/' + LibVersions.angular + '/angular-animate' + LibVersions.qualifier() + '.js')
        .script('//ajax.googleapis.com/ajax/libs/angularjs/' + LibVersions.angular + '/angular-aria' + LibVersions.qualifier() + '.js')
        .script('//ajax.googleapis.com/ajax/libs/angularjs/' + LibVersions.angular + '/angular-sanitize' + LibVersions.qualifier() + '.js')

        .script('//ajax.googleapis.com/ajax/libs/angularjs/' + LibVersions.angular + '/angular-route' + LibVersions.qualifier() + '.js')
        .script(LibVersions.baseDir + 'lib/angular-new-router/dist/router.es5' + LibVersions.qualifier() + '.js')

        //.script('//ajax.googleapis.com/ajax/libs/angular_material/' + LibVersions.ngMaterial + '/angular-material' + LibVersions.qualifier() + '.js')
        .script(LibVersions.baseDir + 'lib/angular-material/angular-material' + LibVersions.qualifier() + '.js')
        .wait(function () {
            console.log('angular support modules loaded');
        })
        .script(LibVersions.baseDir + 'app' + LibVersions.qualifier() + '.js')
        .wait(function () {
            var appendCss = function (css) {
                $('head style:last').after('<style>' + css + '</style>');
            };
            var hrefs = [
                'app.css',
                //'//ajax.googleapis.com/ajax/libs/angular_material/' + LibVersions.ngMaterial + '/angular-material' + LibVersions.qualifier() + '.css'
                'lib/angular-material/angular-material' + LibVersions.qualifier() + '.css'
            ];
            hrefs.forEach(function (href) {
                $.ajax(href).then(appendCss);
            });
        })
        .wait(function () {
            angular.bootstrap(document, ['Application']);
        })
})($LAB);