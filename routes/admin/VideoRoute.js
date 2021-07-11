const app = require('express');
const router = app.Router();
const auth = require('../../utils/auth');
const { videoCategories, videoGenres, fetchVideos, createVideo, deleteVideo, fetchVideo, updateVideo } = require('../../controllers/admin/VideoController');

router.get("/video-categories", auth, videoCategories);
router.get("/video-genres", auth, videoGenres);
router.get("/all-videos/:page", auth, fetchVideos);
router.post("/create-video", auth, createVideo);
router.get("/edit-video/:id", auth, fetchVideo);
router.post("/update-video/:id", auth, updateVideo);
router.get("/delete-video/:id", auth, deleteVideo);

module.exports = router;