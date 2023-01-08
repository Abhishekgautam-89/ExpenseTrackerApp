const User = require('../model/user')
const bcrypt = require('bcrypt');

exports.addUser = (req,res,next)=>{
    const userName = req.body.userName;
    const userEmail= req.body.userEmail;
    const userPassword = req.body.userPassword;
    const salt=11;
    try{    
        bcrypt.hash(userPassword, salt, async(err, hash)=>{
            console.log(err);
            const [user, created] = await User.findOrCreate({
                where:{email: userEmail},
                defaults:{
                    name: userName,
                    email:userEmail,
                    password: hash
                }
            });
            if(created){
                res.status(201).json({userExist: false})
            }
            else
            res.status(201).json({userExist:true})
        })    
        
        
    }
    catch(err){
        console.log(err);
    }
}

exports.loginUser = async(req, res, next)=>{
    const email= req.body.userEmail;
    const password = req.body.userPassword;
    
    try{
        const user = await User.findAll({where:{email: email}});
        
        if(user.length>0){
         bcrypt.compare(password, user[0].password, (err, result)=>{
            if(err){
                throw new Error('something went wrong')
            }
            if(result===true){ 
                res.status(201).json({userExist: true, login: true})
                }
            else{
             return res.status(401).json({userExist: true, login:false})
            }
         })           
        }
        else{ 
        return res.status(404).json({userExist:false});
        }
        // console.log(user[0].dataValues.password);
        
    }
    catch(err){
        res.status(500).json({err});
    }
    
}