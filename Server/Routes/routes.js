const userController = require('../Controller/userController');
const GoogleVisionProController = require('../Controller/googleVisionProController')
const router = require('express').Router()

//SignUp
router.post('/user', userController.postUser);

// Login
router.post('/user/login', userController.getLogIn);

// Login Google
router.post('/user/google/login', userController.getGoogleLogIn);


// Forgotten Password
router.post('/user/forgottenPassword/login', userController.PostForgottenPassword);

//get all users
router.get('/user', userController.getAllUsers)

//getting a user item by id
router.get('/user/:id', userController.getAUserByID);
 

//post delete
router.post('/user/:id', userController.postDeleteUser);



// GoogleVisionPro
router.post('/analyze-image', GoogleVisionProController.postAnalyzeImage)
module.exports = router;
