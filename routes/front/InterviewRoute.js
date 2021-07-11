const app = require('express');
const { fetchInterview, fetchNew } = require('../../controllers/front/InterviewController');
const router = app.Router();

router.get('/single-interview/:id', fetchInterview);
router.get('/new-interviews/:id', fetchNew);

module.exports = router;