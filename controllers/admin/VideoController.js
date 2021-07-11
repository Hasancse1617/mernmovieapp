const formidable = require('formidable');
const Category = require('../../models/Category');
const Genre = require('../../models/Genre');
const Video = require('../../models/Video');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const sharp = require('sharp');

module.exports.videoCategories = async(req, res) =>{
    try {
        const response = await Category.find().sort({updatedAt:'descending'});
        return res.status(200).json({response: response});
    } catch (error) {
        return res.status(500).json({errors: {msg: error.message}});
    }
}

module.exports.videoGenres = async(req, res) =>{
    try {
        const response = await Genre.find().sort({updatedAt:'descending'});
        return res.status(200).json({response: response});
    } catch (error) {
        return res.status(500).json({errors: {msg: error.message}});
    }
}

module.exports.fetchVideos = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Video.find().countDocuments();
        const response = await Video.find().populate('tags_id','name').populate('category_id','name').skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: {msg: error.message}});
    }
}

module.exports.createVideo = async(req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const { title, description, category, genres, release_date, duration, quality, price_status, featured } = fields;
        const genre = genres.split(',');
        
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
        }
        if(category === ''){
            errors.push({msg: 'Category is required'});
        }
        if(genres === ''){
            errors.push({msg: 'Genre is required'});
        }
        if(release_date === ''){
            errors.push({msg: 'Release Date is required'});
        }
        if(duration === ''){
            errors.push({msg: 'Video Duration is required'});
        }
        if(quality === ''){
            errors.push({msg: 'Video Quality is required'});
        }
        if(price_status === ''){
            errors.push({msg: 'Price Status is required'});
        }
    
        if(!files.thumbnail){
            errors.push({msg: 'Thumbnail is required'});
        }else{
            const { type } = files.thumbnail;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.thumbnail.name = uuidv4() + '.' +extension;
            }
        }
        if(!files.video){
            errors.push({msg: 'Video is required'});
        }
        else{
            const { type } = files.video;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'mp4' && extension !== 'mpeg'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.video.name = uuidv4() + '.' +extension;
            }
        }
        const checkTitle = await Video.findOne({title});
        if(checkTitle){
            errors.push({msg:'Title is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            const thumbnailPath = `public/images/video_thumbnails/${files.thumbnail.name}`;
            const videoPath = `public/videos/movie_videos/${files.video.name}`;
            fs.copyFile(files.video.path, videoPath, async(error)=>{
                if(!error){
                    sharp(files.thumbnail.path).resize(190, 270).toFile(thumbnailPath, async(error, sharp)=>{
                        if(!error){
                            try {
                                const response = await Video.create({
                                     title,
                                     description,
                                     category_id: category,
                                     tags_id: genre,
                                     thumbnail: files.thumbnail.name,
                                     video: files.video.name,
                                     release_date,
                                     duration,
                                     quality,
                                     price_status,
                                     featured
                                })
                                
                                return res.status(200).json({msg: 'Video created successfully', response});

                            } catch (error) {
                                return res.status(500).json({errors: {msg: error.message}});
                            }
                        }
                    })
                }
            })
        }
    });
}

module.exports.fetchVideo = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Video.findOne({_id:id}).populate('tags_id','name').populate('category_id','name');
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors:{msg: error.message}});
    }
}

module.exports.updateVideo = async (req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        console.log(fields)
        const { title, description, category, release_date, duration, quality, price_status, featured } = fields;
        
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
        }
        if(category === ''){
            errors.push({msg: 'Category is required'});
        }
        if(release_date === ''){
            errors.push({msg: 'Release Date is required'});
        }
        if(duration === ''){
            errors.push({msg: 'Video Duration is required'});
        }
        if(quality === ''){
            errors.push({msg: 'Video Quality is required'});
        }
        if(price_status === ''){
            errors.push({msg: 'Price Status is required'});
        }
        if(files.thumbnail){
            const { type } = files.thumbnail;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.thumbnail.name = uuidv4() + '.' +extension;
            }
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            if(files.thumbnail){
                const { thumbnail } = await Video.findOne({_id:id});
                fs.exists(`public/images/video_thumbnails/${thumbnail}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/video_thumbnails/${thumbnail}`, async(error)=>{});
                    }
                });
                const thumbnailPath = `public/images/video_thumbnails/${files.thumbnail.name}`;
                sharp(files.thumbnail.path).resize(190, 270).toFile(thumbnailPath, async(error, sharp)=>{
                    if(!error){
                        try {
                            const response = await Video.findByIdAndUpdate(id, {
                                title,
                                description,
                                category_id: category,
                                thumbnail: files.thumbnail.name,
                                release_date,
                                duration,
                                quality,
                                price_status,
                                featured
                            })
                            
                            return res.status(200).json({msg: 'Video updated successfully', response});

                        } catch (error) {
                            return res.status(500).json({errors: {msg: error.message}});
                        }
                    }
                })
            }else{
                try {
                    const response = await Video.findByIdAndUpdate(id, {
                        title,
                        description,
                        category_id: category,
                        release_date,
                        duration,
                        quality,
                        price_status,
                        featured
                    })
                    
                    return res.status(200).json({msg: 'Video updated successfully', response});

                } catch (error) {
                    return res.status(500).json({errors: {msg: error.message}});
                }
            }
        }
    })
}

module.exports.deleteVideo = async (req,res)=>{
    const id = req.params.id;
    try{
        const {thumbnail, video} = await Video.findOne({_id:id});
        const videos = await Video.findByIdAndDelete(id);
        fs.exists(`public/images/video_thumbnails/${thumbnail}`, function(file){
            if(file) {
                fs.unlink(`public/images/video_thumbnails/${thumbnail}`, async(error)=>{});
            }
        });
        fs.exists(`public/videos/movie_videos/${video}`, function(file){
            if(file) {
                fs.unlink(`public/videos/movie_videos/${video}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'Video deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:{msg: error.message}});
    }
    
}