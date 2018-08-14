import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Todo } from './todo';
import { TodoList } from './todo-list';

const URL = 'http://localhost:7000';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListDataService {

  constructor(
    private http: Http
  ) { }

  getAllTodoLists(userId: number): Observable<TodoList[]> {
    return this.http.get(URL + `/user/${userId}/todo-lists`)
      .pipe(
        map(response => {
          let todoLists = response.json();
          return todoLists.map(todoList => new TodoList(todoList));
        })
      );
  }

  createTodoList(todoList: TodoList): Observable<TodoList> {
    return this.http.post(URL + `/user/${todoList.user}/add-list`, todoList)
      .pipe(
        map(response => {
          return new TodoList(response.json());
        })
      );
  }

  changeTodoListTitle(todoList: TodoList): Observable<any> {
    return this.http.post(URL + `/users/${todoList.user}/todo-list/${todoList.id}`, todoList)
      .pipe(
        map(response => {
          return new TodoList(response.json());
        })
      );
  }

  removeTodoList(todoList: TodoList): Observable<null> {
    return this.http.delete(URL + `/users/${todoList.user}/todo-list/${todoList.id}/remove`)
      .pipe(
        map(response => null)
      );
  }

  leftTodoList(todoList: TodoList, todoListSwap: TodoList): Observable<TodoList> {
    return this.http.post(URL + `/users/${todoList.user}/todo-list/${todoList.id}/left`, [todoList, todoListSwap])
      .pipe(
        map(response => new TodoList(response.json()))
      );
  }

  rightTodoList(todoList: TodoList, todoListSwap: TodoList): Observable<TodoList> {
    return this.http.post(URL + `/users/${todoList.user}/todo-list/${todoList.id}/right`, [todoList, todoListSwap])
      .pipe(
        map(response => new TodoList(response.json()))
      );
  }

}
