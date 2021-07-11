const app = require('express');
const router = app.Router();
const auth = require('../../utils/auth');
const {createGenre,genreValidations,fetchGenries,fetchGenre,updateGenre,deleteGenre} = require('../../controllers/admin/GenreController');

router.post("/create_genre", auth, genreValidations, createGenre);
router.get("/genries/:page", auth, fetchGenries);
router.get("/edit-genre/:id", auth, fetchGenre);
router.post("/update_genre/:id", auth, genreValidations, updateGenre);
router.get("/delete_genre/:id", auth, deleteGenre);

module.exports = router;