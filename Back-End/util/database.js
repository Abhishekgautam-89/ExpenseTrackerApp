const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense-tracker','root','Abhi@611676g',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;