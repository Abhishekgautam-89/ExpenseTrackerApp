const Expense = require('../model/expense')

exports.addExpense = async(req, res, next)=>{
    try{
        user=req.user;
        // console.log('>>>>',user);
        const amount = req.body.expense;
        const description = req.body.description;
        const category = req.body.option;
        const data = await user.createExpense({
            expense : amount,
            description : description,
            option : category
        })
        res.status(200).json({newExpense:data})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}

exports.getExpense = async (req, res, next)=>{
    
    try{
        user=req.user;
        // console.log('user2>>>',user);
        const data = await user.getExpenses();
        res.status(200).json({allExpense:data})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}

exports.deleteExpense = async(req,res,next)=>{
    try{
        user=req.user;
        const objId = req.params.id;
        const data=await user.getExpenses()
        data[0].destroy({where:{id:objId}});
        res.sendStatus(201);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}

exports.updateExpense = async(req, res, next)=>{
    try{
        const editId = req.params.id;
        const amount = req.body.expense;
        const description = req.body.description;
        const category = req.body.option;
        const data = await Expense.update({
            expense : amount,
            description : description,
            option : category
        }, {where:{id:editId}})
        res.sendStatus(201)
    }
    catch(err){
        res.status(500).json({error:err})
    }
}