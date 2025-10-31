const userId = localStorage.getItem("user_id");
if (!userId) {
  window.location.href = "../login/index.html";
}

const username = localStorage.getItem("username");

document.addEventListener("DOMContentLoaded", fetchTasks);
document.querySelector("h1").textContent += ` ${username}`;

//Fetch All Tasks API
async function fetchTasks() {
  // Redirect if not logged in
  if (!userId) {
    window.location.href = "../login/index.html";
    return;
  }

  const tableBody = document.querySelector("#table-body");
  const cardContainer = document.querySelector("#card-container");

  try {
    const response = await fetch(api(`tasks.php?user_id=${userId}`));
    const data = await response.json();
    if (data.tasks.length === 0) {
      //show message for large screen

      tableBody.innerHTML = `<tr>
          <td colspan="5" class="text-center text-subtext-light dark:text-subtext-dark py-4">
            No tasks added!
          </td>
        </tr>
      `;
      //show message for small screen
      cardContainer.innerHTML = `
        <p class="text-center text-subtext-light dark:text-subtext-dark">No tasks added yet!</p>
      `;
      return;
    }
    //render data for large screen
    tableBody.innerHTML = "";
    data.tasks.forEach((task) => {
      tableBody.innerHTML += `<tr
                class="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
              >
                <td class="p-4 text-text-light dark:text-text-dark">${task.task_id}</td>
                <td class="p-4 text-text-light dark:text-text-dark font-medium">
             ${task.title}
                </td>
                <td
                  class="p-4 text-subtext-light dark:text-subtext-dark max-w-xs truncate"
                >
                  ${task.description}
                </td>
                <td class="p-4 text-text-light dark:text-text-dark">
                 ${task.created_at}
                </td>
                <td class="p-4">
                  <div class="flex justify-center items-center space-x-4">
                    <button onclick="redirectToUpdate(${task.task_id})" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span class="material-icons">edit</span>
                </button>
                
                 <button class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors "  onclick="deleteTask(${task.task_id})">
                
                  <span class="material-icons">delete</span>
                
                </button>
                  </div>
                </td>
              </tr>`;
    });
    //render data for small screen
    cardContainer.innerHTML = "";
    data.tasks.forEach((task) => {
      cardContainer.innerHTML += `    <div class="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-md">
              <p class="text-sm text-subtext-light dark:text-subtext-dark">
                TASK ID: <span class="text-text-light dark:text-text-dark font-semibold">${task.task_id}</span>
              </p>
              <h2 class="text-lg font-semibold text-text-light dark:text-text-dark mt-2">${task.title}</h2>
              <p class="text-subtext-light dark:text-subtext-dark text-sm mt-1">${task.description}</p>
              <p class="text-xs text-subtext-light dark:text-subtext-dark mt-2">DATE: ${task.created_at} </p>
              <div class="flex justify-end space-x-4 mt-3">
              
                <button onclick="redirectToUpdate(${task.task_id})" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                
                  <span class="material-icons text-base">edit</span>
                </button>
                
                 <button class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"transition-colors"  onclick="deleteTask(${task.task_id})">
                
                  <span class="material-icons text-base">delete</span>
                
                </button>
              </div>
            </div>`;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
//Fetch All Tasks API

//Redirect to Up
function redirectToUpdate(taskId) {
  window.location.href = `./update-task.html?task_id=${taskId}`;
}
//Redirect to Up

//Delete Task API
async function deleteTask(taskId) {
  try {
    const response = await fetch(api("delete-task.php"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: taskId,
      }),
    });
    const data = await response.json();

    if (data.status === "success") {
      fetchTasks();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
//Delete Task API

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
