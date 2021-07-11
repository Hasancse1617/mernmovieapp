const Video = require('../../models/Video');

module.exports.singleMovie = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Video.findOne({_id:id}).populate('tags_id','name');
        return res.status(200).json({response});
    } catch (error) {
        return res.status(400).json({errors:[{msg: error.message}]});
    }
}

module.exports.similarMovie = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Video.findOne({_id:id});
        const similar = await Video.find({category_id:response.category_id,_id:{$ne:response._id}}).limit(4);
        return res.status(200).json({similar});
    } catch (error) {
        return res.status(400).json({errors:[{msg: error.message}]});
    }
}