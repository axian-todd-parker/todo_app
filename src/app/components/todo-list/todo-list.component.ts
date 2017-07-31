import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { TodoStoreService } from '../../services/todo-store.service';
import { TodoModel } from "../../models/todo.model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
	currentStatus: string;
	allCompleted: boolean;
	filteredTodos: TodoModel[];

  constructor(private todoStore: TodoStoreService, private route: ActivatedRoute) {
		this.currentStatus = '';
		this.todoStore.todos.subscribe(todos => this.allCompleted = todos.every((todos, i) => todos[i].completed));
		this.todoStore.todos.subscribe(todos => {
			if(this.currentStatus == 'completed') {
				this.filteredTodos = todos.filter(todo => todo.completed);
			}	else if (this.currentStatus == 'active') {
				this.filteredTodos = todos.filter(todo => !todo.completed);
			} else {
				this.filteredTodos = todos;
			}
		});
  }

  ngOnInit(): void {
    this.route.params
      .map(params => params.currentStatus)
      .subscribe(status => this.currentStatus = status);
  }

  remove(uid) {
		this.todoStore.remove(uid).subscribe();
	}

	setAllTo(toggleAll) {
		this.todoStore.setAllTo(toggleAll.checked).subscribe();
	}

}
