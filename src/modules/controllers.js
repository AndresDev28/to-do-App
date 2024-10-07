import { updateProjects } from "../index";
export function toggleTodoComplete(todo, projects) {
  todo.toggleCompleted();
  console.log("Y en controllers.js tambien")
  updateProjects(projects); // Actualizar la lista y guardar en localStorage
}

export function editTodo(todo) {
  // ... (lógica para editar la tarea) ...
}

export function deleteTodo(todo, projects) {
  // ... (lógica para eliminar la tarea) ...
  updateProjects(projects); // Actualizar la lista y guardar en localStorage
}