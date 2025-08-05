const apiBase = "https://to-do-app-nwpz.onrender.com"; 

async function fetchTasks() {
  const res = await fetch(`${apiBase}/tasks`);
  const tasks = await res.json();
  document.getElementById("task-list").innerHTML = "";
  tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = async () => {
    await fetch(`${apiBase}/tasks/${task.id}`, { method: "DELETE" });
    fetchTasks();
  };

  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  document.getElementById("task-list").appendChild(li);
}

async function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") {
    alert("Enter a task!");
    return;
  }

  await fetch(`${apiBase}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  input.value = "";
  fetchTasks();
}

fetchTasks();