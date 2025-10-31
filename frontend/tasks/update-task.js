const userId = localStorage.getItem("user_id");

if (!userId) {
  window.location.href = "../login/index.html";
}
const taskId = new URLSearchParams(window.location.search).get("task_id");
document.addEventListener("DOMContentLoaded", fetchTaskDetails);
const username = localStorage.getItem("username");
heading.textContent += ` ${username}`;

//  Fetch task details and fill form through GET Request
async function fetchTaskDetails() {
  try {
    const response = await fetch(api(`tasks.php?task_id=${taskId}`));
    const data = await response.json();

    if (data.status === "success") {
      const task = data.task;
      document.getElementById("title").value = task.title;
      document.getElementById("description").value = task.description;
    }
  } catch (err) {
    console.error("Error fetching task:", err);
  }
}
//  Fetch task details and fill form through GET Request

//Update Task After Fetching Details
const updateTaskForm = document.querySelector("#updateTaskForm");
updateTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const UpdateTask = {
    task_id: taskId,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
  };

  const messageDiv = document.getElementById("responseMessage");
  try {
    const response = await fetch(api("update-task.php"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UpdateTask),
    });
    const result = await response.json();
    if (result.status === "success") {
      messageDiv.textContent = result.message;
      messageDiv.classList.add("text-green-600");
      messageDiv.classList.remove("text-red-600");
      e.target.reset();
      setTimeout(() => {
        window.location.href = "./tasks.html";
      }, 1000);
    } else {
      messageDiv.textContent = result.message;
      messageDiv.classList.add("text-red-600");
      messageDiv.classList.remove("text-green-600");
    }
  } catch (error) {
    console.error("Error:", error);
    messageDiv.textContent = "Something Went Wrong!";
  }
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 2000);
});
//Update Task After Fetching Details
//End User Session
function logoutUser() {
  // Remove user data
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");

  // Redirect to login
  window.location.href = "../login/index.html";
}
//End User Session

const logOut = document.querySelector("#logout");
logOut.addEventListener("click", logoutUser);
