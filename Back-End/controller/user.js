const User = require('../model/user')

exports.addUser = async(req,res,next)=>{
    const userName = req.body.userName;
    const userEmail= req.body.userEmail;
    const userPassword = req.body.userPassword;
    try{        
        const [user, created] = await User.findOrCreate({
            where:{email: userEmail},
            defaults:{
                name: userName,
                email:userEmail,
                password: userPassword
            }
        });
        if(created){
            res.status(201).json({userExist: false})
        }
        else
        res.status(201).json({userExist:true})
        
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
           if(user[0].dataValues.password==password){ 
           res.json({userExist: true, login: true})
           }
           else{
            return res.json({userExist: true, login:false})
           }
        }
        else{ 
        return res.json({userExist:false});
        }
        // console.log(user[0].dataValues.password);
        
    }
    catch(err){
        res.status(500).json(err);
    }
    
}