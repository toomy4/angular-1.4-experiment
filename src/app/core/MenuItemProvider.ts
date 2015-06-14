/**
 * Created by Toomy on 14.03.2015.
 */
/// <reference path='../../../tools/typings/angularjs/angular.d.ts'/>
module application {
    import angular = ng.IAngularStatic;

    export class MenuTreeProvider {
        private menuTree:MenuNode[] = [];

        public addMenuItem(item:MenuNode):void {
            this.menuTree.push(item);
        }

        public $get = [function () {
            return this.menuTree;
        }];
    }

    export class MenuNode {
        path:string;
        label:string;

        constructor(path:string, label:string) {
            this.path = path;
            this.label = label;
        }
    }

    angular.module('Application').provider('menuTree', () => new MenuTreeProvider());
}