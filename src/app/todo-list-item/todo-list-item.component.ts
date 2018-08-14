import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';

import { TodoDataService } from '../todo-data.service';

const USER_ID = 1;

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.sass'],
  providers: [TodoDataService]
})
export class TodoListItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter();

  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  @Output() up: EventEmitter<Todo> = new EventEmitter();

  @Output() down: EventEmitter<Todo> = new EventEmitter();

  isTodoBeingEditted: boolean = false;

  constructor(
    private todoDataService: TodoDataService
  ) { }

  ngOnInit() {
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  upTodo() {
    this.up.emit(this.todo);
  }

  downTodo() {
    this.down.emit(this.todo);
  }

  editTodoTitle() {
    this.isTodoBeingEditted = true;
  }

  saveTodoTitle() {
    this.isTodoBeingEditted = false;

    this.todoDataService.changeTodoTitle(this.todo, USER_ID)
      .subscribe(response => {
        this.todo.title = response.title;
      });
  }

  toggleTodoComplete() {
    this.todoDataService.toggleTodoComplete(this.todo, USER_ID)
      .subscribe(t => {
        this.todo.complete = t.complete;
      });
  }

}
