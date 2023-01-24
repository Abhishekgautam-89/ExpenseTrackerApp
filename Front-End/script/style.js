const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.getElementById('table');


open.addEventListener('click',()=>{
    // console.log('clicked')
    container.classList.add('active');
})   

close.addEventListener('click',()=>{
    container.classList.remove('active');
})  