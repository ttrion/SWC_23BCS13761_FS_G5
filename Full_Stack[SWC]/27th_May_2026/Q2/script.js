let text = document.getElementById("text");
let count = document.getElementById("count");

text.addEventListener("input", function () {
  let length = text.value.length;

  count.innerText = length;

  if (length >= 160) {
    count.classList.add("warning");
  } else {
    count.classList.remove("warning");
  }
});