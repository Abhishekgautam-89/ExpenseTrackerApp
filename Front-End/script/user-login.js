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

try{
    const details = axios.get(`http://localhost:3000/user/login/${userEmail}`)
    
}
catch{

}
}

