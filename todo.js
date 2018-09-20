loadEvents();

/*
EVENTS
*/

function toggleFilterAll() {}

function toggleFilterActive() {}

function toggleFilterCompleted() {}

function clearCompleted() {}

function createTodoItem(text) {
  let inputArea = document.querySelector("main > :first-child");
  let todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  todoItem.appendChild(createTodoCheckbox());
  todoItem.appendChild(createTodoTextElement(text));
  todoItem.appendChild(createTodoRemoveButton());

  todoItem.addEventListener("mouseover", () => showRemoveButton());
  todoItem.addEventListener("mouseleave", () => hideRemoveButton());

  inputArea.parentNode.insertBefore(todoItem, inputArea.nextSibling);
}

function editTodoItem() {}

function selectToggleAll() {}

function selectToggle() {}

function showRemoveButton() {}

function hideRemoveButton() {}

function confirmTodoItemEdit() {}

function removeTodoItem() {}

/*
INTE EVENTS
*/

function loadEvents() {
  let inputTextArea = document.querySelector("#input-box");
  inputTextArea.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
      createTodoItem(inputTextArea.value);
    }
  });
}

function createTodoCheckbox() {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  return checkbox;
}

function createTodoTextElement(text) {
  let label = document.createElement("label");
  label.textContent = text;
  label.className = "todo-label";
  label.addEventListener("dblclick", () => editTodoItem());
  return label;
}

function createTodoRemoveButton() {
  let button = document.createElement("button");
  button.textContent = "x";
  button.className = "todo-button";
  button.addEventListener("click", () => removeTodoItem());
  return button;
}
