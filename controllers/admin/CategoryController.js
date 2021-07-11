const {body,validationResult} = require('express-validator');
const Category = require('../../models/Category');

module.exports.categoryValidations = [
    body('name').not().isEmpty().trim().withMessage("Category Name is required"),
];

module.exports.createCategory = async (req,res)=>{
    const {name} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const checkCategory = await Category.findOne({name});
        if(checkCategory){
            return res.status(400).json({errors: [{msg: 'Category is already exists'}]});
        }
        try{
            const category = await Category.create({
               name:name
            });
            return res.status(200).json({msg: 'Category created successfully'});
        }catch(error){
            return res.status(500).json({errors:error});
        }
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.fetchCategories = async (req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Category.find().countDocuments();
        const response = await Category.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.fetchCategory = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Category.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.updateCategory = async (req,res)=>{
    const {name} = req.body;
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const checkCategory = await Category.findOne({name});
        if(checkCategory){
            return res.status(400).json({errors: [{msg: 'Category is already exists'}]});
        }
        try{
            const category = await Category.findByIdAndUpdate(id,{
               name:name
            });
            return res.status(200).json({msg: 'Category updated successfully'});
        }catch(error){
            return res.status(500).json({errors:error});
        }
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.deleteCategory = async (req,res)=>{
    const id = req.params.id;
    try{
        const category = await Category.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Category deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
    
}