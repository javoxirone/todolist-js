const newTodo = document.querySelector("#new-todo");
const confirmTodo = document.querySelector("#confirm-todo");
const todoList = document.querySelector("#todo-list");
const clearTodos = document.querySelector("#clear-todos");

window.addEventListener("load", () => {
  if (!JSON.parse(localStorage.getItem("todos"))) {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ name: "New todo", checked: false }])
    );
  }
  getAllTodos();
});

function checkTodoHandler() {
  const todoItem = document.querySelectorAll(".todo-text");
  const data = JSON.parse(localStorage.getItem("todos"));
  console.log(todoItem);
  todoItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (data[index].checked) {
        data[index].checked = false;
      } else {
        data[index].checked = true;
      }
      localStorage.setItem("todos", JSON.stringify(data));
      getAllTodos();
      console.log(data);
    });
  });
}

function deteteTodoHandler() {
  const deleteBtns = document.querySelectorAll(".todo-delete");
  const data = JSON.parse(localStorage.getItem("todos"));
  console.log(deleteBtns);
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      data.pop(index);
      localStorage.setItem("todos", JSON.stringify(data));
      getAllTodos();
    });
  });
}

function getAllTodos() {
  const data = JSON.parse(localStorage.getItem("todos"));
  todoList.innerHTML = data
    .map(
      (todo) =>
        `<li class="list-group-item todo-item d-flex justify-content-between">
        <span style="text-decoration: ${
          todo.checked ? "line-through;" : "none"
        }" class="todo-text">${
          todo.name
        } </span><button type="button" class="btn btn-danger todo-delete">Delete</button></li>`
    )
    .join("");

  deteteTodoHandler();
  checkTodoHandler();
}

function clearAllTodos() {
  localStorage.setItem("todos", JSON.stringify([]));
  getAllTodos();
}

confirmTodo.addEventListener("click", () => {
  if (newTodo.value) {
    const data = JSON.parse(localStorage.getItem("todos"));
    localStorage.setItem(
      "todos",
      JSON.stringify([...data, { name: newTodo.value, checked: false }])
    );
    getAllTodos();
    newTodo.value = "";
  } else {
    newTodo.style.border = "1px solid red";
  }
});

newTodo.addEventListener("click", () => {
  console.log("sd");
  newTodo.style.border = "1px solid #ced4da";
});

clearTodos.addEventListener("click", () => {
  clearAllTodos();
});
