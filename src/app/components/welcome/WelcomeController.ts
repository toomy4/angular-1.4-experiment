/**
 * Created by Toomy on 23.03.2015.
 */

/// <reference path='../../../../tools/typings/tsd.d.ts'/>
/// <reference path='../../core/MenuItemProvider.ts'/>

module application {
    import angular = ng.IAngularStatic;
    import MenuNode = application.MenuNode;

    class WelcomeController {
        //public static $routeConfig = [{path: '/', redirectTo: '/welcome'}, {path: '/welcome', component: 'welcome'}];

        data;

        constructor($scope:ng.IScope) {
            var vm = $scope['vm'] = this;
            vm.data = ['2', '3', '4'];
        }

        //public canReuse() {
        //    return true;
        //}
    }

    angular.module('Application').controller('WelcomeController', ['$scope', WelcomeController])
        .config(['$routeProvider', function ($routeProvider:ng.route.IRouteProvider) {
            $routeProvider.when('/', {
                templateUrl: 'components/welcome/welcome.html',
                controller: 'WelcomeController'
            });
        }])
        .config(['menuTreeProvider', mtProv => mtProv.addMenuItem(new MenuNode('', 'Index'))]);
}