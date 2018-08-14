import { Todo } from './todo';

export class TodoList {
  id: number;
  title: string;
  order: number;
  todos: Todo[];
  user: number;

  constructor(values) {
    values.todos = values.todos.map(todo => new Todo(todo));
    Object.assign(this, values);
  }
}
