import Project from "./project";
import Todo from "./todo";

// Guardar proyectos en localStorage

export function saveProjectsToLocalStorage(projects) {
  console.log("Guardando proyectos en localStorage...")
  // Convertir los proyectos a una cadena JSON
  const projectsJSON = JSON.stringify(projects);

  // Guardar la cadena JSON en localStorage
  localStorage.setItem('projects', projectsJSON);
}

// Cargar proyectos en localStorage

export function loadProjectsFromLocalStorage() {
  // Obtener las cadenas JSON de localStorage
  const projectsJSON = localStorage.getItem('project');

  // Si hay proyectos guardados
  if (projectsJSON) {
    // Convertimos la cadena JSON a un array de objetos
    const projectData = JSON.parse(projectsJSON);

    // Convertir los datos en objetos Project y Todo
    return projectData.map(projectData => {
      const project = new Project(projectData.title);
      project.todos = projectData.todos.map(todoData =>
        new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority,
          todoData.checklist,
          todoData.completed
        )
      );
      return project;
    });
  } else {
    // Si no hay proyectos guardados devolvemos un array vacío
    return [];
  } 
}