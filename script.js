// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todos");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkAction);
filterTodos.addEventListener("change", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from subimitting
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
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

  // Clear todo-input
  todoInput.value = "";
}

function checkAction(event) {
  const item = event.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("fall");

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
