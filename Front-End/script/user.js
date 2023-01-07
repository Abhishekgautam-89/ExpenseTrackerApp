
const add = document.getElementById("submit");
// console.log(name1);

add.addEventListener("click", (e) => {
  e.preventDefault();
  sendUserDetails();
});
function checkPassword() {
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("rePassword").value;
  const confirmPassword = document.getElementById("confirmPassword");
  if (password != "" && password === repassword) {
    confirmPassword.style.visibility = "visible";
    add.disabled = false;
  }  
}

async function sendUserDetails() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("rePassword").value;
  const userDetails = {
    userName: name,
    userEmail: email,
    userPassword: password,
  };

  console.log(userDetails.userName);
  try {
    const details = axios.post(
      "http://localhost:3000/user/signUp",
      userDetails
    );
    if (Response.status == 201) {
      window.location.href = "../views/login.html";
    } else {
      throw new Error("Check Credentials");
    }
  } catch (err) {
    document.body.innerHTML += `<h3 style="color: red;">${err}</h3>`;
  }
}
