System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TodoItem;
    return {
        setters:[],
        execute: function() {
            TodoItem = (function () {
                function TodoItem(title) {
                    this.title = title.trim();
                    this.completed = false;
                    this.editing = false;
                }
                Object.defineProperty(TodoItem.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value.trim();
                    },
                    enumerable: true,
                    configurable: true
                });
                return TodoItem;
            }());
            exports_1("TodoItem", TodoItem);
        }
    }
});
//# sourceMappingURL=todo.js.map