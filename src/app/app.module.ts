import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoAppComponent } from './components/todo-app/todo-app.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoStoreService } from './Services/todo-store.service';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TrimPipe } from './pipes/trim.pipe';
import { TodoBackendService } from './Services/todo-backend.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoAppComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoListComponent,
    TrimPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [TodoStoreService, TodoBackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
