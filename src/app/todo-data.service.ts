import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Todo } from './todo';

const URL = 'http://localhost:7000';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: Http
  ) { }

  upTodo(todo: Todo, todoSwap: Todo, userId: number): Observable<any> {
    return this.http.post(URL + `/users/${userId}/todo-list/${todo.todoList}/todo/${todo.id}/up`, [todo, todoSwap])
      .pipe(
        map(response => {

          return response;
        })
      );
  }

  downTodo(todo: Todo, todoSwap: Todo, userId: number): Observable<any> {
    return this.http.post(URL + `/users/${userId}/todo-list/${todo.todoList}/todo/${todo.id}/down`, [todo, todoSwap])
      .pipe(
        map(response => {

          return response;
        })
      );
  }

  changeTodoTitle(todo: Todo, userId: number): Observable<Todo> {
    return this.http.post(URL + `/user/${userId}/todo-list/${todo.todoList}/todo/${todo.id}/change-title`, todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      );
  }

  removeTodo(todo: Todo, userId: number): Observable<null> {
    return this.http.post(URL + `/user/${userId}/todo-list/${todo.todoList}/todo/${todo.id}/remove`, todo)
      .pipe(
        map(response => {
          return response.json();
        })
      );
  }

  addTodo(todo: Todo, userId: number): Observable<Todo> {
    return this.http.post(URL + `/user/${userId}/todo-list/${todo.todoList}/add-todo`, todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      );
  }

  toggleTodoComplete(todo: Todo, userId: number): Observable<Todo> {
    return this.http.post(URL + `/user/${userId}/todo-list/${todo.todoList}/todo/${todo.id}/complete`, todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      );
  }

}
