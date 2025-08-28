const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const searchText = searchInput.value.toLowerCase();
  const filter = filterStatus.value;

  tasks.forEach((task, index) => {
    const taskText = task.text.toLowerCase();
    if (
      (filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)) &&
      taskText.includes(searchText)
    ) {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <span>${task.text} <br>
        <small>📅 ${task.date || ""} ⏰ ${task.time || ""}</small>
        </span>
        <div>
          <button class="complete-btn">✔</button>
          <button class="edit-btn">✎</button>
          <button class="delete-btn">🗑</button>
        </div>
      `;

      li.querySelector(".complete-btn").onclick = () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      };

      li.querySelector(".edit-btn").onclick = () => {
        const newText = prompt("Edit task:", task.text);
        if (newText) {
          tasks[index].text = newText;
          saveTasks();
          renderTasks();
        }
      };

      li.querySelector(".delete-btn").onclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      };

      taskList.appendChild(li);
    }
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (text === "") return alert("Please enter a task!");

  tasks.push({ text, date, time, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
});

searchInput.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
});


renderTasks();
