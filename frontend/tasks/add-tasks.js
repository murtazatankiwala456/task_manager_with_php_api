const userId = localStorage.getItem("user_id");

if (!userId) {
  window.location.href = "../login/index.html";
}

const username = localStorage.getItem("username");
const heading = document.querySelector("#heading");
heading.textContent += ` ${username}`;
const addTaskForm = document.querySelector("#addTaskForm");
addTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskData = {
    user_id: userId,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
  };

  const messageDiv = document.getElementById("responseMessage");
  try {
    const response = await fetch(api(`add-task.php`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
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
