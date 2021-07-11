const app = require('express');
const { updatePassword, updateProfile } = require('../../controllers/front/ProfileController');
const router = app.Router();
const auth = require('../../utils/auth');

router.post('/update-password/:id', auth, updatePassword);
router.post('/update-profile/:id', auth, updateProfile);

module.exports = router;