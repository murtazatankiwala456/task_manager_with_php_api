//Toggle Icon Functionality
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const eyeIcon = togglePassword.querySelector("span");
togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  eyeIcon.textContent = type === "password" ? "visibility_off" : "visibility";
});
//Toggle Icon Functionality

//Create-User API Call
const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };

  const messageDiv = document.getElementById("responseMessage");
  try {
    const response = await fetch(api("register.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (result.status === "success") {
      messageDiv.textContent = result.message;
      messageDiv.classList.add("text-green-600");
      messageDiv.classList.remove("text-red-600");
      e.target.reset();
      setTimeout(() => {
        window.location.href = "../login/index.html";
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

//Create-User API Call
