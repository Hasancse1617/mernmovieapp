const { OAuth2Client } = require('google-auth-library');
const FrontUser = require('../../models/FrontUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const createToken = (user, expiresToken)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}

const client = new OAuth2Client(process.env.GOOGLE_FRONT_CLIENT);
module.exports.googleLogin = async(req, res) =>{
    const {idToken} = req.body;
    try {
        const response = await client.verifyIdToken({idToken, audience: process.env.GOOGLE_FRONT_CLIENT});
        const { email, email_verified, name } = response.payload;
        if(email_verified){
             const user = await FrontUser.findOne({email});
             if(user){
                let expiresToken = '1d';
                const token = createToken(user,expiresToken);
                return res.status(200).json({'msg':'You have successfully login',token});
             }else{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(email, salt);
                 const user = await FrontUser.create({
                     name,
                     email,
                     password:hash,
                 });
                let expiresToken = '1d';
                const token = createToken(user,expiresToken);
                return res.status(200).json({'msg':'You have successfully login',token});
             }
        }else{
            return res.status(500).json({errors: {msg: 'Your email not verified'}});
        }
    } catch (error) {
        return res.status(500).json({errors: {msg: error.message}});
    }
}

module.exports.facebookLogin = async(req, res) =>{
    const { userID,accessToken } = req.body;
    // console.log(userID,accessToken)
    const url =  `https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`
  
    fetch(url, {
        method:'GET'
    })
    .then(response=>response.json())
    .then(response=>{
            const {id,name,email}=response;
    
            FrontUser.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({errors:{'msg':'Something went wrong'}});
                }else{
                    if(user){
                        let expiresToken = '1d';
                        const token = createToken(user,expiresToken);
                        return res.status(200).json({'msg':'You have successfully login',token});
                    }
                    else{
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(email, salt);
                        FrontUser.create({ name, email, password:hash}, (err, userinfo)=>{
                            if(err){
                                return res.status(400).json({errors:{'msg':'Something went wrong'}});
                            }else{
                                let expiresToken = '1d';
                                const token = createToken(userinfo,expiresToken);
                                return res.status(200).json({'msg':'You have successfully login',token});
                            }
                        });
                        
                    }

                }
            });
    })
}