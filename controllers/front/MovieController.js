const Genre = require('../../models/Genre');
const Video = require('../../models/Video');
const Interview = require('../../models/Interview');
const { getVideoDurationInSeconds } = require('get-video-duration')

module.exports.movieGenre = async (req, res) =>{
    try {
        const response = await Genre.find();
        return res.status(200).json({response});
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]});
    }
}

module.exports.AllMovie = async (req, res) =>{
    const { genre, videotype, page } = req.body;
    try {
        const perPage = 6;
        const skip = (page - 1) * perPage;
        const resp = Video.find().populate('tags_id','name');
        const counter = Video.find();
        if(genre !== ''){
            resp.where({tags_id:{$all:[genre]}});
            counter.where({tags_id:{$all:[genre]}});
        }
        if(videotype === 'featured'){
            resp.where({featured:true});
            counter.where({featured:true});
        }
        if(videotype === 'newest'){
            resp.sort({updatedAt: 'desc'});
            counter.sort({updatedAt: 'desc'});
        }
        const total = await counter.countDocuments().exec();
        const totalPage = Math.ceil(total / perPage);
        const response = await resp.skip(skip).limit(perPage).exec();
        return res.status(200).json({response, totalPage});
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]});
    }
}

module.exports.LoadMoreMovie = async (req, res) =>{
    const { genre, videotype, page } = req.body;
    try {
        const perPage = 6;
        const skip = (page - 1) * perPage;
        const resp = Video.find().populate('tags_id','name');
        const counter = Video.find();
        if(genre !== ''){
            resp.where({tags_id:{$all:[genre]}});
            counter.where({tags_id:{$all:[genre]}});
        }
        if(videotype === 'featured'){
            resp.where({featured:true});
            counter.where({featured:true});
        }
        if(videotype === 'newest'){
            resp.sort({updatedAt: 'desc'});
            counter.sort({updatedAt: 'desc'});
        }
        const total = await counter.countDocuments().exec();
        const totalPage = Math.ceil(total / perPage);
        const response = await resp.skip(skip).limit(perPage).exec();
        return res.status(200).json({response, totalPage });
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]});
    }
}

module.exports.AllNews = async (req, res) =>{
    try {
        const response = await Interview.find().limit(6).sort({updatedAt: 'desc'});
        for (let index = 0; index < response.length; index++) {
            const du = await getVideoDurationInSeconds(`public/videos/interview/${response[index].video}`);
            var date = new Date(du * 1000);
            var hh = date.getUTCHours();
            var mm = date.getUTCMinutes();
            var ss = date.getSeconds();
            if(hh === 0 && mm === 0){
                response[index].video = '0:'+ss;
            }
            else if(hh === 0){
                response[index].video = mm+':'+ss;
            }
            else{
                response[index].video = hh+':'+mm+':'+ss;
            }
        }
        return res.status(200).json({response});
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]});
    }
}

module.exports.newMovies = async (req, res) =>{
    try {
        const response = await Video.find().populate('tags_id','name').limit(6);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]});
    }
}