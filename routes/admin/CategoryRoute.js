const app = require('express');
const router = app.Router();
const auth = require('../../utils/auth');
const {createCategory,categoryValidations,fetchCategories,fetchCategory,updateCategory,deleteCategory} = require('../../controllers/admin/CategoryController');

router.post("/create_category", auth, categoryValidations, createCategory);
router.get("/categories/:page", auth, fetchCategories);
router.get("/edit-category/:id", auth, fetchCategory);
router.post("/update_category/:id", auth, categoryValidations, updateCategory);
router.get("/delete_category/:id", auth, deleteCategory);

module.exports = router;