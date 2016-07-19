'use strict';

import { Injectable }       from 'angular2/core';
import { TodoItem }         from './todo'

import { Http, Response, Headers, RequestOptions }   from 'angular2/http';
import { Observable }       from 'rxjs/Observable';

@Injectable()
export class TodoService {

    private todoUrl = 'http://localhost:3002/api/todolist';

    todos: Array<TodoItem> = [];
    errorMessage: string;

	constructor(private http: Http) {
        this.errorMessage = '';
        this.getTodoItems();
	}

	getTodoItems () {
		this.http.get(this.todoUrl)
            .map(this.extractTodoList)
            .catch(this.handleError).subscribe(
                todos => this.todos = todos,
                error => this.errorMessage = <any>error);
	}

	private extractTodoList(res: Response) {
        let body = res.json();
        let itemList = body.map( (todo: {title: String, _id: String, completed: Boolean}) => {
            let ret = new TodoItem(todo.title);
            ret.completed = todo.completed;
            ret.id = todo._id;
            return ret;
		});
        return itemList || {};
	}

    private extractTodoItem(res: Response) {
        let todo = res.json();
        let ret = new TodoItem(todo.title);
        ret.completed = todo.completed;
        ret.id = todo._id;
        return ret;
    }

    private handleError(error:Response) {
        console.error(error);
        return Observable.throw(error);
    }

	private getWithCompleted(completed: boolean) {
		return this.todos.filter((todo: TodoItem) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: boolean) {
		this.todos.forEach((t: TodoItem) => {
            t.completed = completed
            this.updateItem(t);
        });
	}

	removeCompleted() {
        this.http.delete(this.todoUrl + '/completed')
            .map(this.extractTodoList)
            .catch(this.handleError)
            .subscribe(
                todos => this.todos = todos,
                error => this.errorMessage = <any>error);
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: TodoItem) {
		todo.completed = !todo.completed;
        this.updateItem(todo);
	}

    updateItem(todo: TodoItem) {
        let url = this.todoUrl + '/' + todo.id;
        let body = JSON.stringify(todo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		this.http.post(url, body, options)
            .map(this.extractTodoItem)
            .catch(this.handleError)
            .subscribe(error => this.errorMessage = <any>error);
    }

	remove(todo: TodoItem) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.http.delete(this.todoUrl + '/' + todo.id)
            .subscribe(error => this.errorMessage = <any>error);
	}

	add(title: string) {
        let newItem = new TodoItem(title);
        let body = JSON.stringify(newItem);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(this.todoUrl, body, options)
            .map(this.extractTodoItem)
            .catch(this.handleError)
            .subscribe(
                todo => this.todos.push(todo),
                error => this.errorMessage = <any>error);
	}
}
