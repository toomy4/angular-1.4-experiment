/**
 * Created by Toomy on 24.03.2015.
 */

/// <reference path='../../../../tools/typings/tsd.d.ts'/>
/// <reference path='../../core/MenuItemProvider.ts'/>

module Application {
    import angular = ng.IAngularStatic;
    import MenuNode = application.MenuNode;

    class Stuff2Controller {
        //public static $routeConfig = [{path: '/stuff2', component: 'stuff2'}];

    }

    angular.module('Application').controller('Stuff2Controller', [Stuff2Controller])
        .config(['$routeProvider', function ($routeProvider:ng.route.IRouteProvider) {
            $routeProvider.when('/stuff2', {
                templateUrl: 'components/stuff2/stuff2.html',
                controller: 'Stuff2Controller'
            });
        }])
        .config(['menuTreeProvider', mtProv => mtProv.addMenuItem(new MenuNode('stuff2', 'Stuff2'))]);
}