import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  currentStatus: string;

  constructor(private todoStore:TodoStoreService, private route:ActivatedRoute) {
    this.currentStatus = '';
   }

  ngOnInit() {
    this.route.params
      .map(params => params.status)
			.subscribe((status) => {
				this.currentStatus = status || '';
			});
  }

  removeCompleted() {
		this.todoStore.removeCompleted();
	}

	getCount() {
		return this.todoStore.todos.length;
	}

	getRemainingCount() {
		return this.todoStore.getRemaining().length;
	}

	hasCompleted() {
		return this.todoStore.getCompleted().length > 0;
	}

}
