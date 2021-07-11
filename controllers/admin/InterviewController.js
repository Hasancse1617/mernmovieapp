const Interview = require("../../models/Interview");
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const sharp = require('sharp');

module.exports.createAction = async(req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const { title, description } = fields;      
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
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
        const checkTitle = await Interview.findOne({title});
        if(checkTitle){
            errors.push({msg:'Title is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            const thumbnailPath = `public/images/interview/${files.thumbnail.name}`;
            const videoPath = `public/videos/interview/${files.video.name}`;
            fs.copyFile(files.video.path, videoPath, async(error)=>{
                if(!error){
                    sharp(files.thumbnail.path).resize(414, 280).toFile(thumbnailPath, async(error, sharp)=>{
                        if(!error){
                            try {
                                const response = await Interview.create({
                                     title,
                                     description,
                                     thumbnail: files.thumbnail.name,
                                     video: files.video.name,
                                })
                                
                                return res.status(200).json({msg: 'Interview created successfully', response});

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

module.exports.fetchInterviews = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Interview.find().countDocuments();
        const response = await Interview.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: {msg: error.message}});
    }
}

module.exports.fetchInterview = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Interview.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors:{msg: error.message}});
    }
}

module.exports.updateInterview = async (req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        console.log(fields)
        const { title, description } = fields;
        
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
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
                const { thumbnail } = await Interview.findOne({_id:id});
                fs.exists(`public/images/interview/${thumbnail}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/interview/${thumbnail}`, async(error)=>{});
                    }
                });
                const thumbnailPath = `public/images/interview/${files.thumbnail.name}`;
                sharp(files.thumbnail.path).resize(190, 270).toFile(thumbnailPath, async(error, sharp)=>{
                    if(!error){
                        try {
                            const response = await Interview.findByIdAndUpdate(id, {
                                title,
                                description,
                                thumbnail: files.thumbnail.name,
                            })
                            
                            return res.status(200).json({msg: 'Interview updated successfully', response});

                        } catch (error) {
                            return res.status(500).json({errors: {msg: error.message}});
                        }
                    }
                })
            }else{
                try {
                    const response = await Interview.findByIdAndUpdate(id, {
                        title,
                        description,
                    })
                    
                    return res.status(200).json({msg: 'Interview updated successfully', response});

                } catch (error) {
                    return res.status(500).json({errors: {msg: error.message}});
                }
            }
        }
    })
}

module.exports.deleteInterview = async (req,res)=>{
    const id = req.params.id;
    try{
        const {thumbnail, video} = await Interview.findOne({_id:id});
        const videos = await Interview.findByIdAndDelete(id);
        fs.exists(`public/images/interview/${thumbnail}`, function(file){
            if(file) {
                fs.unlink(`public/images/interview/${thumbnail}`, async(error)=>{});
            }
        });
        fs.exists(`public/videos/interview/${video}`, function(file){
            if(file) {
                fs.unlink(`public/videos/interview/${video}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'Interview deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:{msg: error.message}});
    }
    
}