import './assets/styles.css';
import Project from './modules/project';
import Todo from './modules/todo';
import { 
  renderProjects, 
  renderTodos, 
  toggleProjectForm, 
  handleProjectFormSubmit } 
  from './modules/dom';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './modules/storage';

// Cargar proyectos al iniciar la aplicación
let projects = loadProjectsFromLocalStorage();
let defaultProject;

// Si no hay proyectos crear uno por defecto
if (projects.length === 0) {
  defaultProject = new Project('Default Project');
  projects.push(defaultProject);
}
const defaultTask1 = new Todo('Buy new house', 'In El campello', '2025-04-28', 'high', 'Esto es una prueba');
if (defaultProject) {
  defaultProject.addTodo(defaultTask1);
}


// Guardar proyectos cada vez que se modifique la lista
export function updateProjects() {
  localStorage.setItem('prueba', 'Hola'); 
  //...lógica para actualizar la lista de proyectos
  saveProjectsToLocalStorage(projects);
  renderProjects(projects); // Re-renderiza la lista
}

saveProjectsToLocalStorage(projects)

// Renderizar los proyectos y tareas
renderProjects(projects); // Pasar un array de proyecto
renderTodos(defaultProject.getTodos());

// Event listener para el boton Create Project
const addProjectBtn = document.getElementById('add-project-btn');
addProjectBtn.addEventListener('click', toggleProjectForm);

// Manejar el evento del envío del formulario
handleProjectFormSubmit(projects, updateProjects);