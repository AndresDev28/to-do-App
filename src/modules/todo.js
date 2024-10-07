
// Define the Todo class
class Todo {
  constructor (title, description = "", dueDate = "", priority = "media", notes = "" ) {
    this.id = Date.now().toString(); // Generar un ID único
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false; // Estado de completado inicial
  }

  toggleCompleted() {
    this.completed = !this.completed; // Marca y desmarca una tarea como completada de forma flexible
    console.log("Se dispara el check")
  }

  updateDetails(details) {
    Object.assign(this, details); // Recibe un objeto con las nuevas propiedades y acutaliza la tarea en consecuencia
  }

  // toogleCheckListItem(index) {
  //   this.checklist[index].complete = !this.checklist[index].complete;
  // }
}

export default Todo;