const Users = require('../model/user');
const Expenses = require('../model/expense');


const showLeaderboard = async (req, res)=>{
    try{
        // console.log(req.user);
        const expenses = await Expenses.findAll();
        const users = await Users.findAll();
        const userAggregateExpenses = {};
        expenses.forEach(expense => {
            if(userAggregateExpenses[expense.userId]){
                userAggregateExpenses[expense.userId] = userAggregateExpenses[expense.userId]+ expense.expense;
            }
            else{
                userAggregateExpenses[expense.userId] = expense.expense;
            }        
        });     
        var userLeaderBoardDetails = [];
        users.forEach(user=>{
            
            userLeaderBoardDetails.push({name: user.name, expense: userAggregateExpenses[user.id]||0})
        })
        // console.log("user>>>>",userLeaderBoardDetails);
        userLeaderBoardDetails.sort((a,b)=>b.expense-a.expense)
        res.status(201).json({expense: userLeaderBoardDetails})
    }
    catch(err){
        console.log(err);
        res.status(501).json(err);
    }

} 

module.exports={showLeaderboard};