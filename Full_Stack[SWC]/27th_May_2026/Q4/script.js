let container = document.getElementById("container");

function loadCards() {
  for (let i = 0; i < 5; i++) {
    let div = document.createElement("div");
    div.className = "card";

    container.appendChild(div);
  }
}

loadCards();

window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight
  ) {
    loadCards();
  }
});