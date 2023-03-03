import { FORM, TASK_INPUT, TASK_LIST, CLEAR_ALL_BTN } from "./services/domService.js";

class ToDoList {
  constructor() {
    this.tasks = [];
    this.taskList = TASK_LIST;
    this.form = FORM;
    this.input = TASK_INPUT;
    this.clearAllButton = CLEAR_ALL_BTN;
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    this.clearAllButton.addEventListener("click", this.clearTasks.bind(this));
  }

  addTask(task) {
    this.tasks.push({ text: task, completed: false });
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  editTask(task, newText) {
    task.text = newText;
  }

  completeTask(task) {
    task.completed = true;
  }
  clearTasks() {
    this.tasks = [];
    this.renderTasks();
  }

  getTasks() {
    return this.tasks;
  }

  renderTasks() {
    this.taskList.innerHTML = "";
    this.tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      if (task.completed) {
        taskDiv.classList.add("completed");
      }
      taskDiv.innerHTML = `
                <li>
                  <span class="task-text">${task.text}</span>
                  <div class="button-container">
                    <button class="edit-button">Edit</button>
                    <button class="complete-button">Complete</button>
                    <button class="delete-button ">Delete</button>
                  </div>
                </li>
              `;
      const editButton = taskDiv.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        const newText = prompt("Enter new task :");
        if (newText !== null) {
          this.editTask(task, newText);
          this.renderTasks();
        }
      });
      const completeButton = taskDiv.querySelector(".complete-button");
      completeButton.addEventListener("click", () => {
        this.completeTask(task);
        this.renderTasks();
      });
      const deleteButton = taskDiv.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        this.removeTask(task);
        this.renderTasks();
      });
      this.taskList.appendChild(taskDiv);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const task = this.input.value;
    if (task) {
      this.addTask(task);
      this.input.value = "";
      this.renderTasks();
    }
  }
}
const todoList = new ToDoList();
