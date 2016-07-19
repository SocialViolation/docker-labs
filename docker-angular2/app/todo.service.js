System.register(['angular2/core', './todo', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    'use strict';
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
    var core_1, todo_1, http_1, Observable_1;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService(http) {
                    this.http = http;
                    this.todoUrl = 'http://localhost:3002/api/todolist';
                    this.todos = [];
                    this.errorMessage = '';
                    this.getTodoItems();
                }
                TodoService.prototype.getTodoItems = function () {
                    var _this = this;
                    this.http.get(this.todoUrl)
                        .map(this.extractTodoList)
                        .catch(this.handleError).subscribe(function (todos) { return _this.todos = todos; }, function (error) { return _this.errorMessage = error; });
                };
                TodoService.prototype.extractTodoList = function (res) {
                    var body = res.json();
                    var itemList = body.map(function (todo) {
                        var ret = new todo_1.TodoItem(todo.title);
                        ret.completed = todo.completed;
                        ret.id = todo._id;
                        return ret;
                    });
                    return itemList || {};
                };
                TodoService.prototype.extractTodoItem = function (res) {
                    var todo = res.json();
                    var ret = new todo_1.TodoItem(todo.title);
                    ret.completed = todo.completed;
                    ret.id = todo._id;
                    return ret;
                };
                TodoService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                TodoService.prototype.getWithCompleted = function (completed) {
                    return this.todos.filter(function (todo) { return todo.completed === completed; });
                };
                TodoService.prototype.allCompleted = function () {
                    return this.todos.length === this.getCompleted().length;
                };
                TodoService.prototype.setAllTo = function (completed) {
                    var _this = this;
                    this.todos.forEach(function (t) {
                        t.completed = completed;
                        _this.updateItem(t);
                    });
                };
                TodoService.prototype.removeCompleted = function () {
                    var _this = this;
                    this.http.delete(this.todoUrl + '/completed')
                        .map(this.extractTodoList)
                        .catch(this.handleError)
                        .subscribe(function (todos) { return _this.todos = todos; }, function (error) { return _this.errorMessage = error; });
                };
                TodoService.prototype.getRemaining = function () {
                    return this.getWithCompleted(false);
                };
                TodoService.prototype.getCompleted = function () {
                    return this.getWithCompleted(true);
                };
                TodoService.prototype.toggleCompletion = function (todo) {
                    todo.completed = !todo.completed;
                    this.updateItem(todo);
                };
                TodoService.prototype.updateItem = function (todo) {
                    var _this = this;
                    var url = this.todoUrl + '/' + todo.id;
                    var body = JSON.stringify(todo);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.post(url, body, options)
                        .map(this.extractTodoItem)
                        .catch(this.handleError)
                        .subscribe(function (error) { return _this.errorMessage = error; });
                };
                TodoService.prototype.remove = function (todo) {
                    var _this = this;
                    this.todos.splice(this.todos.indexOf(todo), 1);
                    this.http.delete(this.todoUrl + '/' + todo.id)
                        .subscribe(function (error) { return _this.errorMessage = error; });
                };
                TodoService.prototype.add = function (title) {
                    var _this = this;
                    var newItem = new todo_1.TodoItem(title);
                    var body = JSON.stringify(newItem);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.post(this.todoUrl, body, options)
                        .map(this.extractTodoItem)
                        .catch(this.handleError)
                        .subscribe(function (todo) { return _this.todos.push(todo); }, function (error) { return _this.errorMessage = error; });
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            }());
            exports_1("TodoService", TodoService);
        }
    }
});
//# sourceMappingURL=todo.service.js.map