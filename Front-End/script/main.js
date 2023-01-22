
const logOut = document.getElementById('logout');
const submit = document.getElementById("submit");
const editBtn = document.getElementById("edit");
const rzb = document.getElementById('rzp-button');
const leaderBoardButton = document.getElementById('leaderboard');

document.addEventListener("DOMContentLoaded", async (e) => {

  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  // console.log(decodedToken);
  try {
    const getObject = await axios.get("http://localhost:3000/getexpense",{headers: {'Authorization': token}});
    // console.log(getObject)
    for (var i = 0; i < getObject.data.allExpense.length; i++) {
      addDatatoList(getObject.data.allExpense[i]);
    }

    if (decodedToken.isPremium===true){
      rzb.style.display='none';
      document.getElementById('display').style.display='block';
      document.getElementById('leaderboard').style.display='block';
    }

  } catch (reject) {
    console.log(`Something goes wrong and gives this error: ${reject} `);
  }
});

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

rzb.addEventListener('click', buyPremium);
leaderBoardButton.addEventListener('click', leaderBoard);

logOut.addEventListener('click', ()=>{
  localStorage.removeItem('token');
  window.location.href('../views/login.html');
})

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const expense = document.getElementById("expense").value;
  const description = document.getElementById("desc").value;
  const select = document.getElementById("category");
  const selectValue = select.options[select.selectedIndex].value;
  const obj = {
    expense: expense,
    description: description,
    option: selectValue,
  };

  addDatatoList(obj);
  try {
    const token = localStorage.getItem('token');
    let postObject = await axios.post("http://localhost:3000/addexpense", obj, {headers: {'Authorization': token}});
    // console.log(postObject.data);
    addDatatoList(postObject.data);
  } catch (error) {
    console.log(error);
  }
});

function addDatatoList(obj) {
  var list = document.getElementById("expenseList");
  var li = document.createElement("li");
//var edit = document.createElement("button");
  var del = document.createElement("button");

  li.appendChild(
    document.createTextNode(`${obj.expense} ${obj.description} ${obj.option}`)
  );
  li.id = obj.id;

//   edit.appendChild(document.createTextNode("Edit"));
  del.appendChild(document.createTextNode("Delete"));  

//   edit.addEventListener("click", () => {
//     document.getElementById("desc").value = obj.description;
//     document.getElementById("expense").value = obj.expense;
//     document.getElementById("opt").value = obj.option;
//     // li.remove();
//     // localStorage.removeItem(obj.description);
//     editBtn.disabled = false;
    
//     editBtn.addEventListener("click", () => {
//       editList();
//     });
//   });

//   li.appendChild(edit);
  li.appendChild(del);

  del.addEventListener("click", () => {
    deleteList(obj.id);
  });

  list.appendChild(li);
}

async function deleteList(id) {
 
  // console.log('delete-clicked')
  try {
    const token = localStorage.getItem('token');
    
    const delObj = await axios.delete(`http://localhost:3000/delete/${id}`, {headers: {'Authorization': token}});
    li.remove();
  } catch (error) {
    console.log(error);
  }
}

async function editList(id) {
  let expense = document.getElementById("expense").value;
  var description = document.getElementById("desc").value;
  var select = document.getElementById("category");
  var selectValue = select.options[select.selectedIndex].value;
  var objec = {
    expense: expense,
    description: description,
    option: selectValue,
  };
  try {
    console.log(obj.id);
    const updateData = await axios({
      method: "put",
      url: `http://localhost:3000/edit/${id}`,
      data: objec,
    });
    addDatatoList(updateData);
    editBtn.disabled = true;
  } catch (error) {
    console.log(error);
  }
}

async function buyPremium(){
  try{
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/getPremium', {headers:{'Authorization': token}})
    // console.log(res);
    var options = {
      'keys' : res.data.key_id,
      'order_id': res.data.order.id,
      'handler': async (response)=>{
        // console.log(options.order_id);
        const res = await axios.post('http://localhost:3000/updateStatus',{
          order_id:options.order_id,
          payment_id: response.razorpay_payment_id
        }, {headers:{'Authorization': token}})
      alert('you are a premium user now');
      rzb.style.display='none';
      document.getElementById('display').style.display='block';
      localStorage.setItem('token', res.data.token)
      }
    }
    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function(response){
      console.log(response);
      alert('something went wrong');
    })
  }
  catch(err){
    console.log(err);
    }
}

async function leaderBoard(){
  try{
    const token = localStorage.getItem('token');
    const data = await axios.get('http://localhost:3000/premium/showLeaderboard',{headers:{'Authorization': token}} );
    // console.log(data.data.expense);
    const lists=data.data.expense;
    lists.forEach(list => {
      leaderBoardOnScreen(list);
    });
    
  }
  catch(err){
    console.log(err);
  }
}

function leaderBoardOnScreen(data){
  console.log(data);
  const ul = document.getElementById('leaderBoard');
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(`Name: ${data.name}   Expense: ${data.total_expense}`)
  );
  ul.appendChild(li);
}
