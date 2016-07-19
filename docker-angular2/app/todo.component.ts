import {Component, EventEmitter, Input} from 'angular2/core';

import { TodoItem }     from './todo'
import { TodoService }  from './todo.service'

@Component({
    selector: 'demo-todo-list',
    templateUrl: 'app/todo.component.html',
    providers: [ TodoService ],
    styles: [`
        h1 {
          color: #404040;
        }
        .footer {
          height: 40px;
        }
    `]
})

export class TodoApp {
	todoService: TodoService;
	newTodoText = '';

	constructor(todoService: TodoService) {
		this.todoService = todoService;
	}

	stopEditing(todo: TodoItem, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
        this.todoService.updateItem(todo);
	}

	cancelEditingTodo(todo: TodoItem) {
		todo.editing = false;
	}

	updateEditingTodo(todo: TodoItem, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoService.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: TodoItem) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoService.removeCompleted();
	}

	toggleCompletion(todo: TodoItem) {
		this.todoService.toggleCompletion(todo);
	}

	remove(todo: TodoItem){
		this.todoService.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoService.add(this.newTodoText);
			this.newTodoText = '';
		}
	}
}
