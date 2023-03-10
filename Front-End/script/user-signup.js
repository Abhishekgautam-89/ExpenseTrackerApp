const add = document.getElementById("submit");

  

add.addEventListener("click", (e) => {
  e.preventDefault();
  checkPassword();
});
function checkPassword() {
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  if (password === "" || username === "" || email=== "") {
    window.alert('Enter all the fields');    
  }
  else{
    sendUserDetails();
  }
}

async function sendUserDetails() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userStatus = document.getElementById("userStatus");
  const userDetails = {
    userName: name,
    userEmail: email,
    userPassword: password,
  };

  try {
    const details = await axios.post(
      "http://localhost:3000/user/signUp",
      userDetails
    );
    // console.log(details.request.status);
      if (details.request.status === 201 && details.data.userExist === false) {
        window.location.href = "../views/login.html";
      } 
      else if (details.data.userExist == true){        
        throw new Error("User already exist");
      }
      else{
        throw new Error("Check Credentials");
      }
  } catch (err) {
      document.body.innerHTML += `<h3 style="color: red;">${err}</h3>`;
  }
}
