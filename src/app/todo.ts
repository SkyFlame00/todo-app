export class Todo {
  id: number;
  title: string;
  order: number;
  complete: boolean;
  todoList: number;
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
