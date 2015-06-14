/**
 * Created by Toomy on 24.03.2015.
 */

/// <reference path='../../../../tools/typings/tsd.d.ts'/>
/// <reference path='../../core/MenuItemProvider.ts'/>

module Application {
    import angular = ng.IAngularStatic;
    import MenuNode = application.MenuNode;

    class Stuff1Controller {
        //public static $routeConfig = [{path: '/stuff1', component: 'stuff1'}];

    }

    angular.module('Application').controller('Stuff1Controller', [Stuff1Controller])
        .config(['$routeProvider', function ($routeProvider:ng.route.IRouteProvider) {
            $routeProvider.when('/stuff1', {
                templateUrl: 'components/stuff1/stuff1.html',
                controller: 'Stuff1Controller'
            });
        }])
        .config(['menuTreeProvider', mtProv => mtProv.addMenuItem(new MenuNode('stuff1', 'Stuff1'))]);
}