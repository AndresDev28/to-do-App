import { v4 as uuidv4 } from "uuid";
// Define the Todo class
class Todo {
  constructor (title, description = "", dueDate = "", priority = "media", notes = "" ) {
    this.id = uuidv4(); // Genera un ID único
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false; // Estado de completado inicial
  }

  toggleCompleted() {
    this.completed = !this.completed; // Marca y desmarca una tarea como completada de forma flexible
  }
}
export default Todo;