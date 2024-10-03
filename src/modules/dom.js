import Project from './project';
import Todo from './todo';
import { updateProjects, updateSelectedProject, selectedProjectId } from '../index';
import { saveProjectsToLocalStorage } from './storage';

// Funcion para agregar un nuevo proyecto
export function renderProjects(projects) {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = ''; // Limpiar la lista antes de renderizar

  projects.forEach(project => {
    const projectContainer = document.createElement('li');
    const projectItem = document.createElement('button');
    projectItem.classList.add('projectsItems')
    projectItem.textContent = project.title;
    projectItem.addEventListener('click', () => {
      updateSelectedProject(project.id) // Actualizar el proyecto seleccionado
      console.log(`Has seleccionado el proyecto ${project.title}`);
    });

    projectContainer.appendChild(projectItem);
    projectsList.appendChild(projectContainer);
  });
}
// Función para renderizar los todos
export function renderTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.title;

    // Agregar event listener para mostrar los detalles
    todoItem.addEventListener('click', () => {
      showTaskDetails(todo);
    });

    todoList.appendChild(todoItem);
  });
}

// Función para mostrar el modal de formulario de crear proyecto
export function toggleProjectForm() {
  const newProjectFormItem = document.getElementById('new-project-form');
  newProjectFormItem.classList.toggle('hidden');
}

// Función para mostrar el modal de formulario de nueva tarea
export function toggleTaskForm() {
  const newTaskForm = document.getElementById('new-task-form');
  newTaskForm.classList.toggle('hidden');
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

export function handleTaskFormSubmit(projects) {
  const newTaskForm = document.getElementById('new-task-form');
  newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;

    const taskDueDate = document.getElementById('task-due-date').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskTextArea = document.getElementById('task-notes').value;

    const newTask = new Todo(taskTitle, taskDescription, taskDueDate, taskPriority, taskTextArea);

    // Encontrar el proyecto seleccionado para agregar la tarea
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProject) {
      selectedProject.addTodo(newTask);
      // Llamar a renderTodos() con las tareas del proyecto seleccionado
      renderTodos(selectedProject.getTodos());
    }

    // limpiar campos del formulario ...
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-due-date').value = '';
    document.getElementById('task-priority').value = '';
    document.getElementById('task-notes').value = '';

    toggleTaskForm();

    updateProjects(projects); // Actualizar y guardar en localStorage
  })
}

// Función para mostrar los detalles de una tarea
export function showTaskDetails(task) {
  const taskDetails = document.getElementById('task-details');
  taskDetails.classList.remove('hidden');

  taskDetails.innerHTML = `
    <h3>${task.title}</h3>
    <p>Description: ${task.description}</p>
    <p>Due date: ${task.dueDate}</p>
    <p>Priority: ${task.priority}</p>
    <p>Notes: ${task.notes}</p>
  `;
}