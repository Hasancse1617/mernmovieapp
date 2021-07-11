const app = require('express');
const router = app.Router();
const auth = require('../../utils/auth');
const {createAction,fetchInterviews,deleteInterview,fetchInterview,updateInterview} = require('../../controllers/admin/InterviewController');

router.post("/create-interview", auth, createAction);
router.get("/all-interviews/:page", auth, fetchInterviews);
router.get("/edit-interview/:id", auth, fetchInterview);
router.post("/update-interview/:id", auth, updateInterview);
router.get("/delete-interview/:id", auth, deleteInterview);

module.exports = router;