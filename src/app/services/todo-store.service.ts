import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';


import { TodoModel } from '../models/todo.model';
import { TodoBackendService } from './todo-backend.service'

@Injectable()
export class TodoStoreService {
	private _todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([]);
	public readonly todos: Observable<TodoModel[]> = this._todos.asObservable();

	user_uid = '';


	constructor(private todoBackendService: TodoBackendService) {
		this.loadInitialData();
	}

	loadInitialData(): any {
		this.todoBackendService.todos.subscribe(todos => this._todos.next(todos));
	}

	add(title): Observable<any> {
		let todo = new TodoModel(title);
		todo.user_uid = this.user_uid;

		let obs = this.todoBackendService.add(todo);

		obs.subscribe(result => {
			let arr = this._todos.getValue();
			arr.push(todo);
			this._todos.next(arr);
		});

		return obs;
	}

	remove(uid): Observable<any> {
		let obs = this.todoBackendService.remove(uid);

		obs.subscribe(result => {
			let arr = this._todos.getValue().filter(x => x.uid != uid);
			this._todos.next(arr);
		});

		return obs;
	}

	update(todo): Observable<any> {
		let obs = this.todoBackendService.update(todo);

		obs.subscribe(result => {
			let arr = this._todos.getValue().map(x=>{
				if(x.uid == todo.uid){
					return todo;
				}
				return x;
			});
			this._todos.next(arr);
		});

		return obs;
	}

	setAllTo(completed:boolean): Observable<any> {
		let toChange = this._todos.getValue().filter(x => x.completed != completed);
		toChange.forEach(todo => {
			todo.completed = completed;
		});

		let obs = this.todoBackendService.bulkUpdate(toChange);

		obs.subscribe(result => {
			let arr = this._todos.getValue().map(x => {
				x.completed = completed;
				return x;
			});
			this._todos.next(arr);
		});

		return obs;
	}

	removeCompleted(): Observable<any> {
		let toDelete = this._todos.getValue().filter(x => x.completed);

		let obs = this.todoBackendService.bulkDelete(toDelete);

		obs.subscribe(result => {
			let arr = this._todos.getValue().filter(x => !x.completed);
			this._todos.next(arr);
		});

		return obs;
	}

}
