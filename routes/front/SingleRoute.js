const app = require('express');
const { singleMovie, similarMovie } = require('../../controllers/front/SingleController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get('/single-movie/:id', auth, singleMovie);
router.get('/similar-movie/:id', auth, similarMovie);
// router.post('/all-movies', AllMovie);
// router.post('/loadmore-movies', LoadMoreMovie);

module.exports = router;