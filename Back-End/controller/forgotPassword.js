const for_password = require("../model/forgotpassword");
const uuid = require("uuid");
const sgMail = require('@sendgrid/mail');
const Users = require("../model/user");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log('email>>>',email);
    const user = await Users.findOne({ where: { email: email } });

    if (user) {
      const id = uuid.v4();
      await for_password
        .create({
          id: id,
          active: true,
          userId: user.id,
        })
        .then(() => {
          console.log("data entered in reset password table successfully");
        })
        .catch((err) => {
          throw new Error(err);
        });
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email, // Change to your recipient
        from: "abhi.breezer10@gmail.com", // Change to your verified sender
        subject: "Recover Your Password",
        text: "Click the link, to regenrate your password:",
        html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
      };
      sgMail.send(msg).then((response) => {
        return res.status(response[0].statusCode).json({message: 'Check your registerd mail to reset your password', res: response})
      })
      .catch(err=>{throw new Error(err)});
    } else {
      throw new Error("User not registered");
    }

    
  } catch (err) {
    console.log(err);
  }
};

module.exports = { forgotPassword };
