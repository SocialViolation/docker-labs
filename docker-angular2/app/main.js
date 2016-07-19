///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
System.register(['angular2/platform/browser', 'angular2/http', 'rxjs/Rx', 'angular2/router', './todo.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, router_1, todo_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_component_1_1) {
                todo_component_1 = todo_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(todo_component_1.TodoApp, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map