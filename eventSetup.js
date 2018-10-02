loadEvents();

function loadEvents() {
  let inputTextArea = document.querySelector("#input-box");
  inputTextArea.addEventListener("keydown", event => {
    inputboxKeyDownEventHandler(event);
  });

  let toggleAllClickableSymbol = document.querySelector("#toggle-all");
  toggleAllClickableSymbol.addEventListener("click", () => {
    toggleAllClickEventHandler();
  });

  let clearCompletedLabel = document.querySelector("#clear");
  clearCompletedLabel.addEventListener("click", () => {
    clearCompletedClickEventHandler();
  });

  let allFilterLabel = document.querySelector("#all");
  allFilterLabel.addEventListener("click", event => {
    filterAllClickEventHandler(event);
  });

  let activeFilterLabel = document.querySelector("#active");
  activeFilterLabel.addEventListener("click", event => {
    filterActiveClickEventHandler(event);
  });

  let completedFilterLabel = document.querySelector("#completed");
  completedFilterLabel.addEventListener("click", event =>
    filterCompletedClickEventHandler(event)
  );
}
