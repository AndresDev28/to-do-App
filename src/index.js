import './assets/styles.css';
import Project from './modules/project';
import Todo from './modules/todo';
import { 
  renderProjects, 
  renderTodos, 
  toggleProjectForm, 
  handleProjectFormSubmit,
  toggleTaskForm,
  handleTaskFormSubmit } 
  from './modules/dom';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './modules/storage';

// Cargar proyectos al iniciar la aplicación
let projects = loadProjectsFromLocalStorage();
let defaultProject;
export let selectedProjectId; // Almacena el ID del projecto seleccionado

// Si no hay proyectos crear uno por defecto
if (projects.length === 0) {
  defaultProject = new Project('Default Project');
  projects.push(defaultProject);
  selectedProjectId = defaultProject.id; // Asigna el ID del proyecto 'Default'
} else {
  // Si hay proyctos guardados, selecciona el primero
  selectedProjectId = projects[0].id;
}

const defaultTask1 = new Todo('Finally Understand Regex', 'Crack the code of those cryptic symbols and become a regex master. No more copy-pasting from Stack Overflow! (Okay, maybe a little.)', '2025-04-28', 'high', 'Funny To-Do');
if (defaultProject) {
  defaultProject.addTodo(defaultTask1);
}

// Guardar proyectos cada vez que se modifique la lista
export function updateProjects() { 
  //...lógica para actualizar la lista de proyectos
  saveProjectsToLocalStorage(projects);

  //Obtener el último proyecto creado (el que se acaba de agregar)
  const lastProject = projects[projects.length -1];
  // Actualizar el proyecto seleccionado
  updateSelectedProject(lastProject.id);
  renderProjects(projects); // Re-renderiza la lista
}

saveProjectsToLocalStorage(projects)

// Renderizar los proyectos y tareas
renderProjects(projects, updateSelectedProject); // Pasar un array de proyecto seleccionado
renderTodos(defaultProject.getTodos());


const addProjectBtn = document.getElementById('new-project-btn');
const addTaskBtn = document.getElementById('new-todo-btn');
const cancelProjectBtn = document.querySelector('.cancel-project-btn');
const cancelTaskBtn = document.querySelector('.cancel-task-btn');
const editIcon = document.querySelector('.fa-edit');

// Event listeners
addProjectBtn.addEventListener('click', toggleProjectForm);
addProjectBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
})
addTaskBtn.addEventListener('click', toggleTaskForm);
addTaskBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
});

cancelProjectBtn.addEventListener('click', toggleProjectForm);
cancelProjectBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

cancelTaskBtn.addEventListener('click', toggleTaskForm);
cancelTaskBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  console.log('click en cancelBtn');
});

editIcon.addEventListener('click', () => {
  alert("Editar tarea!");
})


// Manejar el eventos de envío de formularios (new-project-form y new-task-form)
handleProjectFormSubmit(projects, updateProjects);
handleTaskFormSubmit(projects, selectedProjectId, updateProjects);

// Función que re-renderiza las tareas del proyecto seleccionado
export function updateSelectedProject(projectId) {
  selectedProjectId = projectId;
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  if (selectedProject) {
    renderTodos(selectedProject.getTodos());
  }
}
