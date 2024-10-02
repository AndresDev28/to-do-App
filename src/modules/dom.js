import Project from './project';
import { updateProjects } from '../index';
import { saveProjectsToLocalStorage } from './storage';

// Funcion para agregar un nuevo proyecto
export function renderProjects(projects) {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = ''; // Limpiar la lista antes de renderizar

  projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.title;
    projectsList.appendChild(projectItem);
  });
}
// Función para renderizar los todos
export function renderTodos(todos) {
  const todoList = document.getElementById('todos-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.title;
    todoList.appendChild(todoItem);
  })
}

// Función para mostrar el modal de formulario de crear proyecto
export function toggleProjectForm() {
  const newProjectFormItem = document.getElementById('new-project-form');
  newProjectFormItem.classList.toggle('hidden');
}

export function handleProjectFormSubmit(projects) {
  const newProjectForm = document.getElementById('new-project-form');

  newProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = document.getElementById('project-name').value;
    const newProject = new Project(projectName);
    projects.push(newProject);
    saveProjectsToLocalStorage();

    document.getElementById('project-name').value = '';
    toggleProjectForm();

    updateProjects(projects);
  });
}