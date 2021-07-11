const {body,validationResult} = require('express-validator');
const Genre = require('../../models/Genre');

module.exports.genreValidations = [
    body('name').not().isEmpty().trim().withMessage("Genre Name is required"),
];

module.exports.createGenre = async (req,res)=>{
    const {name} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const checkGenre = await Genre.findOne({name});
        if(checkGenre){
            return res.status(400).json({errors: [{msg: 'Genre is already exists'}]});
        }
        try{
            const genre = await Genre.create({
               name:name
            });
            return res.status(200).json({msg: 'Genre created successfully'});
        }catch(error){
            return res.status(500).json({errors:error});
        }
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.fetchGenries = async (req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Genre.find().countDocuments();
        const response = await Genre.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.fetchGenre = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Genre.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.updateGenre = async (req,res)=>{
    const {name} = req.body;
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const checkGenre = await Genre.findOne({name});
        if(checkGenre){
            return res.status(400).json({errors: [{msg: 'Genre is already exists'}]});
        }
        try{
            const genre = await Genre.findByIdAndUpdate(id,{
               name:name
            });
            return res.status(200).json({msg: 'Genre updated successfully'});
        }catch(error){
            return res.status(500).json({errors:error});
        }
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.deleteGenre = async (req,res)=>{
    const id = req.params.id;
    try{
        const genre = await Genre.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Genre deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
    
}