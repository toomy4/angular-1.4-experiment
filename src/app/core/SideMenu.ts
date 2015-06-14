/**
 * Created by Toomy on 14.03.2015.
 */
/// <reference path='../../../tools/typings/tsd.d.ts'/>
/// <reference path='MenuItemProvider.ts'/>

module directives {
    import angular = ng.IAngularStatic;
    import MDToastService = angular.material.MDToastService;
    import MenuNode = application.MenuNode;

    class SideMenu {
        restrict = "E";
        replace = true;
        template = ''
            + '<ul>'
            + '<li ng-repeat="i in vm.items()">'
            + '<a href="javascript:" ng-click="vm.navi(i)">{{i.label}}</a>'
            + '</li>'
            + '</ul>'
            ;

        scope = {"toggle": "="};

        bindToController = true;
        controllerAs = "vm";

        items:MenuNode[];

        controller = ['$location', '$mdToast', 'menuTree', '$router',
            function ($location:ng.ILocationService, $mdToast:MDToastService, menuTree:MenuNode[], $router) {
                $router.config([
                    //{path: '/', redirectTo: '/welcome'},
                    //{path: '/welcome', component: 'welcome'},
                    //{path: '/grid-test', component: 'gridTest'},
                    //{path: '/stuff1', component: 'stuff1'},
                    //{path: '/stuff2', component: 'stuff2'}
                ]);


                var vm = this;

                vm.items = function () {
                    return menuTree;
                };

                vm.navi = function (item:MenuNode) {
                    $location.path(item.path);
                    this.toggle.close();

                    $mdToast.show($mdToast.simple()
                        //.capsule(true)
                        .hideDelay(5000)
                        .action('sup?')
                        .position('top right')
                        .content('Opened menu item: ' + item.label))
                        .then(() => console.log('sup ok'), () => console.log('sup not ok'));
                };
            }
        ];
    }

    angular.module('Application').directive('sideMenu', [() => new SideMenu()])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider:ng.route.IRouteProvider, $locationProvider:ng.ILocationProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
            $locationProvider.html5Mode(false);
        }])
    //.config(['$locationProvider', function ($locationProvider:ng.ILocationProvider) {
    //    $locationProvider.html5Mode(false);
    //}]);
    //.config(['$componentLoaderProvider', function ($componentLoaderProvider) {
    //$componentLoaderProvider.setTemplateMapping(function (component) {
    //    return './components/' + component + '-view.html';
    //});
    //$componentLoaderProvider.setCtrlNameMapping(function (component) {
    //    return component.capitalize() + "Controller";
    //});
    //}])
}