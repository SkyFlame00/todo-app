import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { TodoList } from '../todo-list';

import { TodoListDataService } from '../todo-list-data.service';

const USER_ID = 1;

@Component({
  selector: 'app-user-todo-dashboard',
  templateUrl: './user-todo-dashboard.component.html',
  styleUrls: ['./user-todo-dashboard.component.sass'],
  providers: [TodoListDataService]
})
export class UserTodoDashboardComponent implements OnInit {

  todoLists: TodoList[];
  test: string = 'kek';

  constructor(
    private todoListDataService: TodoListDataService
  ) { }

  ngOnInit() {
    this.todoListDataService.getAllTodoLists(USER_ID)
      .subscribe(todoLists => {

        this.todoLists = todoLists;
        this.sortTodoLists();
        console.log(this.todoLists);
      });
  }

  createList() {
    let todoLists = this.todoLists;
    let maxId;
    let maxOrder;

    if (todoLists.length == 0) {
      maxId = 1;
      maxOrder = 1;
    }
    else {
      maxId = todoLists[0].id;
      maxOrder = todoLists[0].order;
    }

    todoLists.forEach(item => {
      maxId = item.id > maxId ? item.id : maxId;
      maxOrder = item.order > maxOrder ? item.order : maxOrder;
    });

    let newTodoList = new TodoList({
      id: maxId+ 1,
      title: `Todo List #${maxId + 1}`,
      order: maxOrder + 1,
      user: USER_ID,
      todos: []
    });

    this.todoListDataService
      .createTodoList(newTodoList)
      .subscribe(response => {
        this.todoLists.push(response);
      });
  }

  onRemoveList(todoList: TodoList) {
    this.todoListDataService.removeTodoList(todoList)
      .subscribe(nothing => {
        this.todoLists = this.todoLists.filter(t => t != todoList);
      });
  }

  onLeftTodoList(todoList: TodoList) {
    let min = this.todoLists[0].order;

    this.todoLists.forEach(elem => { min = min < elem.order ? min : elem.order });

    if (todoList.order == min) return;

    let order = todoList.order;
    let todoListIndex = this.todoLists.indexOf(todoList);
    let todoListSwap = this.todoLists[todoListIndex - 1];
    let orderSwap = todoListSwap.order;

    this.todoListDataService.leftTodoList(todoList, todoListSwap)
      .subscribe(t => {
        todoList.order = orderSwap;
        todoListSwap.order = order;
        this.sortTodoLists();
      });
  }

  onRightTodoList(todoList: TodoList) {
    let max = this.todoLists[0].order;

    this.todoLists.forEach(elem => { max = max > elem.order ? max : elem.order });

    if (todoList.order == max) return;

    let order = todoList.order;
    let todoListIndex = this.todoLists.indexOf(todoList);
    let todoListSwap = this.todoLists[todoListIndex + 1];
    let orderSwap = todoListSwap.order;

    this.todoListDataService.rightTodoList(todoList, todoListSwap)
      .subscribe(t => {
        todoList.order = orderSwap;
        todoListSwap.order = order;
        this.sortTodoLists();
      });
  }

  sortTodoLists() {
    this.todoLists.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  }

}
