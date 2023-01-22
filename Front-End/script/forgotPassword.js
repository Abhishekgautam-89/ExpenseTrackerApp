const forgotPassword = document.getElementById('retrievePassword');
forgotPassword.addEventListener('click', generatePassword);

async function generatePassword(){
    const data = await axios.get('http://localhost:3000//password/forgotpassword')
}