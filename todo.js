/*
  EVENT HANDLERS
*/

function filterActiveClickEventHandler(event) {
  setFilterBorder(event.target);
  filterActive();
}

function filterAllClickEventHandler(event) {
  setFilterBorder(event.target);
  filterAll();
}

function filterCompletedClickEventHandler(event) {
  setFilterBorder(event.target);
  filterCompleted();
}

function clearCompletedClickEventHandler() {
  clearCompleted();
  updateBottomControlsVisibility();
  updateToggleButton();
  updateClearCompletedVisibilityStatus();
}

function toggleAllClickEventHandler() {
  selectToggleAll();
  updateItemCount();
  updateFilterVisibilityStatusAll();
  updateClearCompletedVisibilityStatus();
  updateToggleButton();
}

function inputboxKeyDownEventHandler(event) {
  if (event.keyCode == 13 && "" != event.target.value) {
    if (event.target.value == window.secret) {
      activateAmazing();
    }
    createTodoItem(event.target.value);
    event.target.value = "";
    updateBottomControlsVisibility();
    updateItemCount();
    updateToggleButton();
    updateClearCompletedVisibilityStatus();
  }
}

function todoMouseEnterEventHandler(event) {
  showRemoveButton(event.target);
}

function todoMouseLeaveEventHandler(event) {
  hideRemoveButton(event.target);
}

function checkboxChangeEventListener(event) {
  selectToggle(event.target);
  updateItemCount();
  updateToggleButton();
  updateFilterVisibilityStatus(event.target.parentNode);
  updateClearCompletedVisibilityStatus();
}

function labelDblclickEventHandler() {
  enableEditMode(event.target);
}

function labelKeydownEventHandler(event) {
  if (event.keyCode == 13) {
    confirmTodoItemEdit(event.target);
  }
}

function labelBlurEventHandler(event) {
  disableContentEditable();
  checkIfEmptyAndIfTrueCallRemoveFunction(event.target);
  updateItemCount();
}

function removeButtonClickEventHandler(event) {
  removeTodoItem(event.target.parentNode);
  updateBottomControlsVisibility();
  updateToggleButton();
}

/*
  FILTER FUNCTIONS
*/

window.filterState = "all";

function filterAll() {
  window.filterState = "all";
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => updateFilterVisibilityStatus(todo));
}

function filterActive() {
  window.filterState = "active";
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => updateFilterVisibilityStatus(todo));
}

function filterCompleted() {
  window.filterState = "completed";
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(todo => updateFilterVisibilityStatus(todo));
}

function updateFilterVisibilityStatusAll() {
  let todoItemCheckboxes = document.querySelectorAll(".todo-checkbox");
  todoItemCheckboxes.forEach(b => updateFilterVisibilityStatus(b.parentNode));
}

function updateFilterVisibilityStatus(todo) {
  let checkbox = todo.querySelector(".todo-checkbox");
  if (checkbox.checked) {
    if (window.filterState == "active") {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  } else {
    if (window.filterState == "completed") {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  }
}
/*
  UPDATE FUNCTIONS
*/

function updateBottomControlsVisibility() {
  let todoItems = document.querySelectorAll(".todo-item");
  let bottomControl = document.querySelector("#bottom-controls");
  if (todoItems.length != 0) {
    bottomControl.style.display = "flex";
  } else {
    bottomControl.style.display = "none";
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

function updateClearCompletedVisibilityStatus() {
  let clearCompleted = document.querySelector("#clear");
  let todoItems = Array.from(document.querySelectorAll(".todo-item"));
  let checkedTodoItems = todoItems.filter(t => t.firstChild.checked);
  if (checkedTodoItems.length == 0) {
    clearCompleted.style.visibility = "hidden";
  } else {
    clearCompleted.style.visibility = "visible";
  }
}

function updateToggleButton() {
  let toggleButton = document.querySelector("#toggle-all");
  let checkboxes = Array.from(document.querySelectorAll(".todo-checkbox"));
  if (checkboxes.length == 0) {
    toggleButton.style.visibility = "hidden";
  } else {
    toggleButton.style.visibility = "visible";
  }
  unCheckedCheckboxes = checkboxes.filter(c => !c.checked);
  if (unCheckedCheckboxes.length == 0) {
    toggleButton.style.color = "#4a4a4a";
  } else {
    toggleButton.style.color = "#aaaaaa";
  }
}

/*
  CREATE TODO
*/

function createTodoItem(text) {
  let bottomControls = document.querySelector("#bottom-controls");
  let todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  todoItem.appendChild(createTodoCheckbox());
  todoItem.appendChild(createTodoTextElement(text));
  todoItem.appendChild(createTodoRemoveButton());

  todoItem.addEventListener("mouseenter", event =>
    todoMouseEnterEventHandler(event)
  );
  todoItem.addEventListener("mouseleave", event =>
    todoMouseLeaveEventHandler(event)
  );

  bottomControls.parentNode.insertBefore(todoItem, bottomControls);
}

function createTodoCheckbox() {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.addEventListener("change", event =>
    checkboxChangeEventListener(event)
  );

  return checkbox;
}

function createTodoTextElement(text) {
  let label = document.createElement("label");
  label.textContent = text;
  label.className = "todo-label";
  label.addEventListener("dblclick", event => labelDblclickEventHandler(event));
  label.addEventListener("keydown", event => labelKeydownEventHandler(event));
  label.addEventListener("blur", () => labelBlurEventHandler(event));

  return label;
}

function createTodoRemoveButton() {
  let button = document.createElement("button");
  button.textContent = "×";
  button.className = "todo-button";
  button.hidden = true;
  button.addEventListener("click", event =>
    removeButtonClickEventHandler(event)
  );
  return button;
}

/*
  OTHER STUFF
*/
function selectToggleAll() {
  let todoItemCheckboxes = Array.from(
    document.querySelectorAll(".todo-checkbox")
  );
  let uncheckedBoxes = todoItemCheckboxes.filter(c => !c.checked);
  if (uncheckedBoxes.length == 0) {
    todoItemCheckboxes.forEach(c => {
      c.checked = false;
      setCompletedStatus(c.parentNode, false);
    });
  } else {
    uncheckedBoxes.forEach(c => {
      c.checked = true;
      setCompletedStatus(c.parentNode, true);
    });
  }
}

function selectToggle(checkbox) {
  let todo = checkbox.parentNode;
  setCompletedStatus(todo, checkbox.checked);
}

function setCompletedStatus(todo, isCompleted) {
  label = todo.querySelector(".todo-label");
  if (isCompleted) {
    label.className += " todo-completed";
  } else {
    label.className = label.className.replace(" todo-completed", "");
  }
}

function setFilterBorder(targetLabel) {
  let filterLabels = document.querySelectorAll("#all, #active, #completed");
  filterLabels.forEach(l => {
    l.style.border = "";
    l.style.borderRadius = "";
  });

  targetLabel.style.border = "0.04em solid rgba(47, 47, 47, 0.30)";
  targetLabel.style.borderRadius = "10%";
}

function clearCompleted() {
  let todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(t => (t.firstChild.checked ? t.remove() : {}));
}

function enableEditMode(label) {
  label.contentEditable = "true";
}

function showRemoveButton(todo) {
  let button = todo.lastElementChild;
  button.hidden = false;
}

function hideRemoveButton(todo) {
  let button = todo.lastElementChild;
  button.hidden = true;
}

function confirmTodoItemEdit(label) {
  label.contentEditable = false;
}

function removeTodoItem(todo) {
  todo.remove();
}

function disableContentEditable() {
  let textBoxes = Array.from(document.querySelectorAll(".todo-label"));
  textBoxes.forEach(t => (t.contentEditable = false));
}

function checkIfEmptyAndIfTrueCallRemoveFunction(label) {
  if (label.textContent == "") {
    removeTodoItem(label.parentNode);
  }
}
