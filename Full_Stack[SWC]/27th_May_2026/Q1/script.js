function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value === "") return;

  let li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleTask(this)">${input.value}</span>
    <button onclick="editTask(this)">Edit</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
}

function editTask(button) {
  let span = button.parentElement.querySelector("span");
  let newTask = prompt("Edit task", span.innerText);

  if (newTask !== null) {
    span.innerText = newTask;
  }
}

function toggleTask(span) {
  span.classList.toggle("done");
}