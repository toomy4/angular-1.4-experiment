/**
 * Created by Toomy on 14.03.2015.
 */
/// <reference path='../../../tools/typings/angularjs/angular.d.ts'/>
module directives {
    export class TestDirective {
        //public restrict = 'A';// A=Attribute, E=Element, C=CSS Class (can mix all)
        replace = true;
        template = '<div><span ng-repeat="d in vm.data">{{d}}<br /></span></div>';

        scope = {data: '='};

        bindToController = true;
        controllerAs = "vm";

        data;

        controller = [function () {
            //var vm = this;
        }]

        static create = [function () {
            return new TestDirective();
        }]
    }

    angular.module('Application').directive('testDirective', TestDirective.create);
}