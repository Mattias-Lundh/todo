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

  todoItem.addEventListener("mouseenter", event =>
    showRemoveButton(event.target)
  );
  todoItem.addEventListener("mouseleave", event =>
    hideRemoveButton(event.target)
  );

  inputArea.parentNode.insertBefore(todoItem, inputArea.nextSibling);
}

function editTodoItem() {}

function selectToggleAll() {
  let todoItemCheckboxes = document.querySelectorAll(".todo-checkbox");
  let uncheckedBoxes = todoItemCheckboxes.map(c => !c.checked);
  if (uncheckedBoxes.length == 0) {
    todoItemCheckboxes.forEach(c => (c.checked = false));
  } else {
    uncheckedBoxes.forEach(c => (c.checked = true));
  }
}

function selectToggle() {}

function showRemoveButton(todoItem) {
  let button = todoItem.lastElementChild;
  button.hidden = false;
}

function hideRemoveButton(todoItem) {
  let button = todoItem.lastElementChild;
  button.hidden = true;
}

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

  let toggleAllClickableSymbol = document.querySelector("#toggle-all");
  toggleAllClickableSymbol.addEventListener("click", () => selectToggleAll());
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
  button.hidden = true;
  button.addEventListener("click", () => removeTodoItem());
  return button;
}
