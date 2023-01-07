const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const cors = require('cors');
const getExpenseroute = require('./routes/expenseAdded')
const getUser = require('./routes/user')
// app.use('/',(req,res,next)=>{
//     res.send('<h3>server created</h3>')
// } )

app.use(bodyparser.json({extended:false}))
app.use(cors());
app.use('/',getExpenseroute);
app.use('/',getUser);

sequelize
// .sync({force:true})
.sync()
.then((result)=>{
    // console.log(result);
    app.listen(3000); 
})
.catch(err=>console.log(err));

