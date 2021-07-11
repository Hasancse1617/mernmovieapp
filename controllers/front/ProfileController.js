const FrontUser = require("../../models/FrontUser");
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const jwt = require('jsonwebtoken');


const createToken = (user, expiresToken)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}
module.exports.updatePassword = async (req, res) =>{
     const id = req.params.id;
     const { o_password, n_password, c_password } = req.body;
     const errors = [];
     if(o_password === ''){
         errors.push({msg: 'Old password is required'});
     }
     if(n_password === ''){
         errors.push({msg: 'New Password is required'});
     }
     else{
         if(n_password.length < 6){
             errors.push({msg: 'New password must be 6 character long!!!'})
         }else{
            if(n_password !== c_password){
                errors.push({msg: 'New password & Confirm new Password must be equal'})
            }
         }
     }
     const user = await FrontUser.findOne({_id: id});

    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        const matched = await bcrypt.compare(o_password, user.password);
        if(matched){
             try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(n_password, salt);
                 const response = await FrontUser.findOneAndUpdate(id, {
                     password: hash
                 });
                 return res.status(200).json({msg: 'Password updated successfully'});
             } catch (error) {
                return res.status(401).json({errors:[{msg: error.message}]});
             }
        }
        else{
            return res.status(401).json({errors:[{msg:'Old password does not correct'}]});
        }
    }
}

module.exports.updateProfile = async (req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    const user = await FrontUser.findOne({_id:id});
    form.parse(req, async(err, fields, files) =>{
         const { name } = fields;
         const errors = [];
         if(name === ''){
             errors.push({msg: 'Name is required'});
         }
         if(files.image){
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.' +extension;
            }
         }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{ 
            //Update without Image
            if(Object.keys(files).length === 0){
                try {
                    const response = await FrontUser.findOneAndUpdate({_id: id},{
                        name,
                    }, {new: true});
                    let expiresToken = '1d';
                    const token = createToken(response, expiresToken);
                    return res.status(200).json({msg: 'Your Profile updated successfully', response, token});
                } catch (error) {
                    return res.status(500).json({errors: error, msg: error.message});
                }
            }
            //Update without Image
            else{
                //Old image Deleted
                if(user.image !== 'profile.png'){
                    fs.exists(`public/images/front_user_images/${user.image}`, function(file){
                        if(file) {
                            fs.unlink(`public/images/front_user_images/${user.image}`, async(error)=>{});
                        }
                    });
                }
                const newPath = `public/images/front_user_images/${files.image.name}`; 
                fs.copyFile(files.image.path, newPath, async(error)=>{
                    if(!error){
                        try {
                            const response = await FrontUser.findOneAndUpdate({_id:id},{
                                name,
                                image: files.image.name,
                            }, {new: true});
                            let expiresToken = '1d';
                            const token = createToken(response, expiresToken);
                            return res.status(200).json({msg: 'Your Profile updated successfully', response, token});
                        } catch (error) {
                            return res.status(500).json({errors: error, msg: error.message});
                        }
                    }
                })
            }
            //Update without Image End
        }
    });
}