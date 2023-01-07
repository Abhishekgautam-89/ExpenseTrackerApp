const register = document.getElementById('register');
const login = document.getElementById('login');


register.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href="../views/signUp.html"
})

login.addEventListener('click', getUserDetails);

async function getUserDetails(){
    const userEmail = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const userDetails = {        
        userEmail: userEmail,
        userPassword: password,
      };

    try{
        const details = await axios.post(`http://localhost:3000/user/login`,userDetails)
        // console.log(details);
        if(details.data.userExist){
            if(details.data.login){
                window.alert('Login Successfull');
            }
            else{
                window.alert('User Details In-correct')
            }
        }
        else {
            window.alert('User not registered')
        }
    }
    catch(err){
        console.log(err);
    }
}

