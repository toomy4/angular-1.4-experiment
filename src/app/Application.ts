/**
 * Created by Toomy on 15.03.2015.
 */

/// <reference path='../../tools/typings/tsd.d.ts'/>

module application {
    import angular = ng.IAngularStatic;
    import ngThemeProvider = angular.material.MDThemingProvider;

    class MainController {
        public static $routeConfig = [];

        private menu:MenuToggle;
        private theme:ThemeSwitch;

        constructor($scope:ng.IScope) {
            var vm = $scope['vm'] = this;
            vm.menu = new MenuToggle();
            vm.theme = new ThemeSwitch();
        }

        public static create = ['$scope', function ($scope) {
            return new MainController($scope);
        }];
    }

    class MenuToggle {
        private show:boolean;

        public toggle():void {
            this.show = !this.show;
        }

        public close():void {
            this.show = false;
        }
    }
    class ThemeSwitch {
        theme:string = 'green';
        themes:string[] = ['orange', 'green'];
    }

    angular.module('Application', ['ngMaterial', 'ngRoute', 'ngNewRouter'])
        .controller("MainController", ['$scope', MainController])
        .config(['$mdThemingProvider', function ($mdThemingProvider:ngThemeProvider) {
            $mdThemingProvider.theme('orange')
                .primaryPalette('orange')
                .accentPalette('blue')
                .warnPalette('light-blue')
                .backgroundPalette('yellow');

            $mdThemingProvider.theme('green')
                .primaryPalette('blue')
                .accentPalette('green')
                .warnPalette('pink')
                .backgroundPalette('light-green');

            $mdThemingProvider.alwaysWatchTheme(true);
            //$mdThemingProvider.setDefaultTheme('other');
        }])
}