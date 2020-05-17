// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todos");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkAction);
filterTodos.addEventListener("change", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from subimitting
  event.preventDefault();

  const newTodo = todoInput.value;
  createTodo(newTodo);

  // Add todo to local storage
  saveLocalTodos(newTodo);

  // Clear todo-input
  todoInput.value = "";
}

function createTodo(todo) {
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  // Check mark BUTTON
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");

  // Append to TodoDiv
  todoDiv.appendChild(completeButton);

  // Check delete BUTTON
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");

  // Append to TodoDiv
  todoDiv.appendChild(deleteButton);

  // Append to todo-list
  todoList.appendChild(todoDiv);
}

function checkAction(event) {
  const item = event.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("fall");

    // Remove todo
    removeLocalTodo(todo);

    // Await for transition
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("done");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "done":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "todo":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getItemsLocalStorage() {
  let todos = localStorage.getItem("todos");

  if (!todos) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }

  return todos;
}

function saveLocalTodos(todo) {
  let todos = getItemsLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = getItemsLocalStorage();

  todos.forEach((todo) => {
    createTodo(todo);
  });
}

function removeLocalTodo(todo) {
  let todos = getItemsLocalStorage();

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
