window.secret = "Godzilla";

function activateAmazing() {
  image = document.createElement("img");
  image.id = "god";
  image.src = "practice and stuff/godzilla.gif";
  image.style.width = "100%";
  document.body.appendChild(image);
  setTimeout(() => {
    document.querySelector("img").remove();
  }, 5000);
}
