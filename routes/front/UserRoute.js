const app = require('express');
const router = app.Router();
const auth = require('../../utils/auth');
const { registerValidations, userRegister, userActivation, loginValidations, userLogin, forgotPassword, resetPassword } = require('../../controllers/front/UserController');
const { facebookLogin, googleLogin } = require('../../controllers/front/SocialController');


router.post('/login', loginValidations, userLogin);
router.post('/register', registerValidations, userRegister);
router.post('/account-activation', userActivation);
router.post('/forgot-password', forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);

module.exports = router;