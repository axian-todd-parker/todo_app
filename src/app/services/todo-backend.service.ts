import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { uuidv4 } from 'uuid/v4'

import { TodoModel } from "../models/todo.model";


@Injectable()
export class TodoBackendService {
  user_uid: any;
  todos: Observable<TodoModel[]>;
  private url = "http://localhost:3000/items";

  constructor(private http:Http) {
    this.user_uid = localStorage.getItem('angular2-todos-user_uid') || uuidv4();

    let params: URLSearchParams = new URLSearchParams();
		params.set('user_uid', this.user_uid);
		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		let observableTodos = this.http.get(this.url, requestOptions)
			.map(res => {
				let body = res.json();
				return res.json().results.map(todo => {
					let ret = new TodoModel(todo.title);
					ret.completed = todo.completed;
					ret.uid = todo.uid;
					return ret;
				})
			})
			.catch((err) => {
				console.log(err.message || err);
				return Observable.throw(err.message || err);
			});
	
    this.todos = observableTodos;
  }

  add(todo: TodoModel) : Observable<Response> {
    return this.http.post(this.url, todo).shareReplay();
  }

  remove(uid:string) : Observable<Response> {
    return this.http.delete(this.url + '/${uid}').shareReplay();
  }

  update(todo:TodoModel) : Observable<Response> {
    return this.http.put(this.url, todo).shareReplay();
  }

  bulkUpdate(todos:TodoModel[]) : Observable<Response> {
    return this.http.put(this.url, todos).shareReplay();
  }

  bulkDelete(todos:TodoModel[]): Observable<Response> {
    let params: URLSearchParams = new URLSearchParams();
    params.set()

    return this.http.delete(this.url)
  }

}
