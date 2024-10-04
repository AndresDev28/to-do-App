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
    const todoCard = document.createElement('li');
    todoCard.classList.add('todo-card');

    const topRow = document.createElement('div'); // Aquí van El título y los iconos (check, edit & delete)
    topRow.classList.add('card-rows');
    const todoTitle = document.createElement('h3'); // Título del ToDo
    todoTitle.textContent = todo.title;
    const icons = document.createElement('div'); // Contenedor de iconos check, edit y delete
    icons.classList.add('icons');
    const checkedIcon = document.createElement('i');
    checkedIcon.classList.add('fas', 'fa-check'); // Agregar las clases de Font Awesome
    checkedIcon.alt = 'Mark as completed'; // Atributo alt para el icono de "check"

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    editIcon.alt = 'Edit task'; // Atributo alt para el icono de "edit"

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    deleteIcon.alt = 'Delete task'; // Atributo alt para el icono de "delete"
    // Agregar elementos a topRow
    icons.appendChild(checkedIcon); 
    icons.appendChild(editIcon);
    icons.appendChild(deleteIcon);
    topRow.appendChild(todoTitle);
    topRow.appendChild(icons);

    const middleRow = document.createElement('div');
    middleRow.classList.add('card-rows');
    const todoDescription = document.createElement('p');
    todoDescription.textContent = todo.description;
    // Agregar elementos a middleRow
    middleRow.appendChild(todoDescription);

    const bottomRow = document.createElement('div');
    bottomRow.classList.add('card-rows')
    const todoDueDate = document.createElement('span');
    todoDueDate.textContent = todo.dueDate;
    const todoPriority = document.createElement('span');
    todoPriority.textContent =  todo.priority;
    // Agregar elementos a bottonRow
    bottomRow.appendChild(todoDueDate);
    bottomRow.appendChild(todoPriority);

    // Agregar elementos a todoCard
    todoCard.appendChild(topRow);
    todoCard.appendChild(middleRow);
    todoCard.appendChild(bottomRow);
    todoList.appendChild(todoCard);
  });
}

// Función para mostrar el modal de formulario de crear proyecto
export function toggleProjectForm() {
  const newProjectForm = document.querySelector('.project-form-modal');
  newProjectForm.classList.toggle('hidden');
}

// Función para mostrar el modal de formulario de nueva tarea
export function toggleTaskForm() {
  const newTaskForm = document.querySelector('.task-form-modal');
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
    overlay.style.display = 'none'; // Quita el overlay de los modales
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

// Función para cambiar el color de texto de la propiedad de la tarea
function priorityColor(priority) {

}