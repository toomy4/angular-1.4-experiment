/**
 * Created by Toomy on 31.05.2015.
 */
/// <reference path='../../../../tools/typings/tsd.d.ts'/>
/// <reference path='../../core/MenuItemProvider.ts'/>

module Application {
    import angular = ng.IAngularStatic;
    import MenuNode = application.MenuNode;

    class GridTestController {
        //public $routeConfig = [{path: '/grid-test', component: 'gridTest'}];

        data;

        constructor($scope:ng.IScope) {
            var vm = $scope['vm'] = this;

            this.data = [
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 2, h: 2},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 2, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 2},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
                {w: 1, h: 1},
            ];
        }
    }

    angular.module('Application').controller('GridTestController', ['$scope', GridTestController])
        .config(['$routeProvider', function ($routeProvider:ng.route.IRouteProvider) {
            $routeProvider.when('/grid-test', {
                templateUrl: 'components/grid-test/grid-test.html',
                controller: 'GridTestController'
            });
        }])
        .config(['menuTreeProvider', function (menuTreeProvider) {
            menuTreeProvider.addMenuItem(new MenuNode('grid-test', 'GridTest'));
        }]);
}