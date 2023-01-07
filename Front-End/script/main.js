const submit = document.getElementById('submit');
const editBtn = document.getElementById('edit');
 
addEventListener('DOMContentLoaded', async (e)=>{
    // localStorage.getItem();
    // Object.keys(localStorage).forEach(key=>{
    //     let originalData = localStorage.getItem(key);
    //     let parsedData = JSON.parse(originalData);
    //     addDatatoList(parsedData);
    // });
    try{ 
        const getObject = await axios.get('http://localhost:3000/expense');
        // console.log(getObject.data.allExpense)
        for(var i = 0; i<getObject.data.allExpense.length; i++){
            addDatatoList(getObject.data.allExpense[i]);
        }       
    }
    catch (reject){
        console.log(`Something goes wrong and gives this error: ${reject} `);
    }
});


submit.addEventListener('click', async (e)=>{
    e.preventDefault();
    const expense = document.getElementById('expense').value;
    const description = document.getElementById('desc').value;
    const select = document.getElementById('category');
    const selectValue=select.options[select.selectedIndex].value;
    const obj = {
    expense : expense,
    description: description,
    option: selectValue
    };
    
    localStorage.setItem(description, JSON.stringify(obj));
    addDatatoList(obj);
    try{ 
    let postObject= await axios.post('http://localhost:3000/expense', obj);
    // console.log(postObject.data);
    addDatatoList(postObject.data);
    }
    catch (error) {
        console.log(error);
    }
}) 



function addDatatoList(obj){
    var list = document.getElementById('expenseList');
    var li =document.createElement('li');
    var edit = document.createElement('button');
    var del = document.createElement('button');
    
    li.appendChild(document.createTextNode(`${obj.expense} ${obj.description} ${obj.option}`));
    li.id=obj.id;

    edit.appendChild(document.createTextNode('Edit'));
    del.appendChild(document.createTextNode('Delete'));
    edit.addEventListener('click', ()=>{
        document.getElementById('desc').value = obj.description;
        document.getElementById('expense').value = obj.expense;
        document.getElementById('opt').value = obj.option;
        // li.remove();
        // localStorage.removeItem(obj.description);        
        editBtn.disabled = false;

    editBtn.addEventListener('click', async ()=>{
        let expense = document.getElementById('expense').value;
        var description = document.getElementById('desc').value;
        var select = document.getElementById('category');
        var selectValue=select.options[select.selectedIndex].value;
        var objec = {
        expense : expense,
        description: description,
        option: selectValue
        };
        try{ 
          console.log(obj.id)
          const updateData = await axios({
              method: 'put',
              url:`http://localhost:3000/edit/${obj.id}`,
              data: objec
            });
            addDatatoList(updateData)
            editBtn.disabled=true;
            
            }
        catch (error){
            console.log(error);
            }    
        })       
    });
    li.appendChild(edit);
    del.addEventListener('click', async ()=>{
        // localStorage.removeItem(obj.description);
        // li.remove();
        try{ 
            // console.log(obj.id);
         const delObj = await axios.delete(`http://localhost:3000/delete/${obj.id}`);
         li.remove();
        }
        catch(error){
            console.log(error);
        }
    });
    li.appendChild(del);
    list.appendChild(li);
}

