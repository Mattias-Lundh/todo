loadEvents();

/*
EVENTS
*/

function filterAll() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => {
    todo.style.display = "flex";
  });
}

function filterActive() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => {
    if (todo.firstChild.checked) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
}

function filterCompleted() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => {
    if (!todo.firstChild.checked) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
}

function clearCompleted() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(t => (t.firstChild.checked ? t.remove() : {}));
}

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

function editTodoItem(label) {
  label.contentEditable = "true";
  // let text = label.textContent;
  // label.textContent = "";
  // label.textContent = text;
  // label.focus();
  // label.selectionStart = label.textContent.length;
  // label.selectionEnd = label.textContent.length;
}

function selectToggleAll() {
  let todoItemCheckboxes = Array.from(
    document.querySelectorAll(".todo-checkbox")
  );
  let uncheckedBoxes = todoItemCheckboxes.filter(c => !c.checked);
  if (uncheckedBoxes.length == 0) {
    todoItemCheckboxes.forEach(c => {
      c.checked = false;
      toggleMarkAsCompleted(c.parentNode.querySelector(".todo-label"), false);
    });
  } else {
    uncheckedBoxes.forEach(c => {
      c.checked = true;
      toggleMarkAsCompleted(c.parentNode.querySelector(".todo-label"), true);
    });
  }
}

function selectToggle(checkbox) {
  let label = checkbox.parentNode.querySelector("label");
  toggleMarkAsCompleted(label, checkbox.checked);
}

function showRemoveButton(todoItem) {
  let button = todoItem.lastElementChild;
  button.hidden = false;
}

function hideRemoveButton(todoItem) {
  let button = todoItem.lastElementChild;
  button.hidden = true;
}

function confirmTodoItemEdit(label) {
  label.contentEditable = false;
}

function removeTodoItem(button) {
  let parent = document.querySelector("main");
  parent.removeChild(button.parentNode);
}

/*
INTE EVENTS
*/

function loadEvents() {
  let inputTextArea = document.querySelector("#input-box");
  inputTextArea.addEventListener("keydown", event => {
    if (event.keyCode == 13 && "" != inputTextArea.value) {
      createTodoItem(inputTextArea.value);
      inputTextArea.value = "";
      updateItemCount();
    }
  });

  let toggleAllClickableSymbol = document.querySelector("#toggle-all");
  toggleAllClickableSymbol.addEventListener("click", () => {
    selectToggleAll();
    updateItemCount();
  });

  let clearCompletedLabel = document.querySelector("#clear");
  clearCompletedLabel.addEventListener("click", () => clearCompleted());

  let allFilterLabel = document.querySelector("#all");
  allFilterLabel.addEventListener("click", () => filterAll());

  let activeFilterLabel = document.querySelector("#active");
  activeFilterLabel.addEventListener("click", () => filterActive());

  let completedFilterLabel = document.querySelector("#completed");
  completedFilterLabel.addEventListener("click", () => filterCompleted());
}

function createTodoCheckbox() {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.addEventListener("change", event => {
    selectToggle(event.target);
    updateItemCount();
  });
  return checkbox;
}

function createTodoTextElement(text) {
  let label = document.createElement("label");
  label.textContent = text;
  label.className = "todo-label";
  label.addEventListener("dblclick", event => editTodoItem(event.target));
  label.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
      confirmTodoItemEdit(event.target);
    }
  });
  return label;
}

function createTodoRemoveButton() {
  let button = document.createElement("button");
  button.textContent = "x";
  button.className = "todo-button";
  button.hidden = true;
  button.addEventListener("click", event => removeTodoItem(event.target));
  return button;
}

function toggleMarkAsCompleted(label, checked) {
  if (checked) {
    label.className += " todo-completed";
  } else {
    label.className = label.className.replace(" todo-completed", "");
  }
}

function updateItemCount() {
  let result = "";
  let checkboxes = Array.from(document.querySelectorAll(".todo-checkbox"));
  checkboxes = checkboxes.filter(c => !c.checked);
  result = checkboxes.length + " items left";
  if (checkboxes.length == 1) {
    result = "1 item left";
  }

  let label = document.querySelector("#remaining-count");
  label.textContent = result;
}
