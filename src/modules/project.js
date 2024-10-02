
// Define the Project class
class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getTodos() {
    return this.todos;
  }
}

export default Project;