import { Component } from '@angular/core';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent {
  newTodo: string = '';

  constructor(private todoStore: TodoStoreService) { }

  addTodo() {
    if(this.newTodo.trim().length) {
      this.todoStore.add(this.newTodo);
      this.newTodo = '';
    }
  }

}
