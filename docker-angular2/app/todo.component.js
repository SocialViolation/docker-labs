System.register(['angular2/core', './todo.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_service_1;
    var TodoApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            TodoApp = (function () {
                function TodoApp(todoService) {
                    this.newTodoText = '';
                    this.todoService = todoService;
                }
                TodoApp.prototype.stopEditing = function (todo, editedTitle) {
                    todo.title = editedTitle;
                    todo.editing = false;
                    this.todoService.updateItem(todo);
                };
                TodoApp.prototype.cancelEditingTodo = function (todo) {
                    todo.editing = false;
                };
                TodoApp.prototype.updateEditingTodo = function (todo, editedTitle) {
                    editedTitle = editedTitle.trim();
                    todo.editing = false;
                    if (editedTitle.length === 0) {
                        return this.todoService.remove(todo);
                    }
                    todo.title = editedTitle;
                };
                TodoApp.prototype.editTodo = function (todo) {
                    todo.editing = true;
                };
                TodoApp.prototype.removeCompleted = function () {
                    this.todoService.removeCompleted();
                };
                TodoApp.prototype.toggleCompletion = function (todo) {
                    this.todoService.toggleCompletion(todo);
                };
                TodoApp.prototype.remove = function (todo) {
                    this.todoService.remove(todo);
                };
                TodoApp.prototype.addTodo = function () {
                    if (this.newTodoText.trim().length) {
                        this.todoService.add(this.newTodoText);
                        this.newTodoText = '';
                    }
                };
                TodoApp = __decorate([
                    core_1.Component({
                        selector: 'demo-todo-list',
                        templateUrl: 'app/todo.component.html',
                        providers: [todo_service_1.TodoService],
                        styles: ["\n        h1 {\n          color: #404040;\n        }\n        .footer {\n          height: 40px;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.TodoService])
                ], TodoApp);
                return TodoApp;
            }());
            exports_1("TodoApp", TodoApp);
        }
    }
});
//# sourceMappingURL=todo.component.js.map