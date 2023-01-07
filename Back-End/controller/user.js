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