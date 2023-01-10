const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const cors = require('cors');
const getExpenseroute = require('./routes/expenseAdded')
const getUser = require('./routes/user')
const User = require('./model/user');
const Expenses = require('./model/expense');

// app.use('/',(req,res,next)=>{
//     res.send('<h3>server created</h3>')
// } )

app.use(bodyparser.json({extended:false}))
app.use(cors());



app.use('/',getExpenseroute);
app.use('/',getUser);

User.hasMany(Expenses);
Expenses.belongsTo(User);

sequelize
// .sync({force:true})
.sync()
.then((result)=>{
    // console.log(result);
    app.listen(3000); 
})
.catch(err=>console.log(err));

