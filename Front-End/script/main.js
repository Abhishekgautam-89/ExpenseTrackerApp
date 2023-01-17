const submit = document.getElementById("submit");
const editBtn = document.getElementById("edit");
const rzb = document.getElementById('rzp-button');

document.addEventListener("DOMContentLoaded", async (e) => {

  const token = localStorage.getItem('token');
  // console.log(token);
  try {
    const getObject = await axios.get("http://localhost:3000/getexpense",{headers: {'Authorization': token}});
    // console.log(getObject.data.allExpense)
    for (var i = 0; i < getObject.data.allExpense.length; i++) {
      addDatatoList(getObject.data.allExpense[i]);
    }
  } catch (reject) {
    console.log(`Something goes wrong and gives this error: ${reject} `);
  }
});

rzb.addEventListener('click', buyPremium);

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
        await axios.post('http://localhost:3000/updateStatus',{
          order_id:options.order_id,
          payment_id: response.razorpay_payment_id
        }, {headers:{'Authorization': token}})
      alert('you are a premium user now');
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


