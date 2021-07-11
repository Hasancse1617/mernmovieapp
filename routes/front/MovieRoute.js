const app = require('express');
const { movieGenre, AllMovie, LoadMoreMovie, AllNews, newMovies } = require('../../controllers/front/MovieController');
const router = app.Router();
const auth = require('../../utils/auth');

router.get('/movie-genre', movieGenre);
router.post('/all-movies', AllMovie);
router.post('/loadmore-movies', LoadMoreMovie);
router.get('/all-news', AllNews);
router.get('/new-movies', newMovies);

module.exports = router;