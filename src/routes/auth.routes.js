const experress = require('express');
const authController = require('../controllers/auth.controller');


const router = experress.Router();

router.post('/register', authController.registerUser);


router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);





module.exports = router;