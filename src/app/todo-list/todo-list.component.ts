import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';
import { TodoList } from '../todo-list';

import { TodoListDataService } from '../todo-list-data.service';
import { TodoDataService } from '../todo-data.service';

import USER_ID from '../shared/default-user';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
  providers: [TodoListDataService]
})
export class TodoListComponent implements OnInit {

  @Input() todoList: TodoList;

  @Output() remove: EventEmitter<TodoList> = new EventEmitter();

  @Output() left: EventEmitter<TodoList> = new EventEmitter();

  @Output() right: EventEmitter<TodoList> = new EventEmitter();

  isHeaderBeingEditted: boolean = false;

  constructor(
    private todoListDataService: TodoListDataService,
    private todoDataService: TodoDataService
  ) { }

  ngOnInit() {
    this.sortTodos();
  }

  editHeader() {
    this.isHeaderBeingEditted = true;
  }

  saveTitle() {
    this.isHeaderBeingEditted = false;

    this.todoListDataService.changeTodoListTitle(this.todoList)
      .subscribe(response => {
        this.todoList.title = response.title;
      });
  }

  onUpTodo(todo: Todo) {
    let min = this.todoList.todos[0].order;

    this.todoList.todos.forEach(elem => { min = min < elem.order ? min : elem.order });

    if (todo.order == min) return;

    let order = todo.order;
    let todoIndex = this.todoList.todos.indexOf(todo);
    let todoSwap = this.todoList.todos[todoIndex - 1];
    let orderSwap = todoSwap.order;

    this.todoDataService.upTodo(todo, todoSwap, USER_ID)
      .subscribe(response => {
        todo.order = orderSwap;
        todoSwap.order = order;
        this.sortTodos();
      });
  }

  onDownTodo(todo: Todo) {
    let max = this.todoList.todos[0].order;

    this.todoList.todos.forEach(elem => { max = max > elem.order ? max : elem.order });

    if (todo.order == max) return;

    let order = todo.order;
    let todoIndex = this.todoList.todos.indexOf(todo);
    let todoSwap = this.todoList.todos[todoIndex + 1];
    let orderSwap = todoSwap.order;

    this.todoDataService.downTodo(todo, todoSwap, USER_ID)
      .subscribe(response => {
        todo.order = orderSwap;
        todoSwap.order = order;

        this.sortTodos();
      });
  }

  onRemoveTodo(todo: Todo) {
    this.todoDataService.removeTodo(todo, USER_ID)
      .subscribe(nothing => {
        this.todoList.todos = this.todoList.todos.filter(t => t != todo);
      });
  }

  addTodo() {
    let todos = this.todoList.todos;
    let maxId;
    let maxOrder;

    if (todos.length == 0) {
      maxId = 1;
      maxOrder = 1;
    }
    else {
      maxId = todos[0].id;
      maxOrder = todos[0].order;
    }

    todos.forEach(item => {
      maxId = item.id > maxId ? item.id : maxId;
      maxOrder = item.order > maxOrder ? item.order : maxOrder;
    });

    let todo = new Todo({
      id: maxId + 1,
      title: `New todo #${maxId + 1}`,
      order: maxOrder + 1,
      complete: false,
      todoList: this.todoList.id
    });

    this.todoDataService.addTodo(todo, USER_ID)
      .subscribe(todo => {
        this.todoList.todos.push(todo);
        this.sortTodos();
      });
  }

  sortTodos() {
    this.todoList.todos.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

  }

  removeList() {
    this.remove.emit(this.todoList);
  }

  leftTodoList() {
    this.left.emit(this.todoList);
  }

  rightTodoList() {
    this.right.emit(this.todoList);
  }

}
