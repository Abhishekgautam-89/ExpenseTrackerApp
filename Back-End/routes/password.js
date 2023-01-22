const Express = require('express');
const router = Express.Router();
const resetPasswordController = require('../controller/forgotPassword');

router.use('/forgotpassword', resetPasswordController.forgotPassword);

module.exports = router;