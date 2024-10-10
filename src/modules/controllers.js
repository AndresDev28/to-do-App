import { updateProjects } from "../index";
export function toggleTodoComplete(todo, projects) {
  todo.toggleCompleted();
  console.log("Y en controllers.js tambien")
  updateProjects(projects); // Actualizar la lista y guardar en localStorage
}

export function editTodo(todo) {
  // ... (lógica para editar la tarea) ...
}

export function deleteTodo(todoId, projects) {
  for (let project of projects) {
    const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      project.todos.splice(todoIndex, 1);
      updateProjects(projects); // Actualizar la lista y guardar en localStorage
      return { success: true, projectId: project.id };
    }
  }
  return { success: false };
}