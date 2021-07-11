const {body,validationResult} = require('express-validator');
const FrontUser = require('../../models/FrontUser');
const bcrypt = require('bcrypt');
const { SendVerification, SendUserEmail } = require('../../utils/email');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const createToken = (user, expiresToken)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}
module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').not().isEmpty().trim().withMessage("Password is required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 characters or long"),
];
module.exports.userLogin = async(req, res) =>{
    const { email, password, remember } = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
    if(!filter.test(email)){
        return res.status(400).json({errors: [{msg:'Valid email is required'}] });
    }

    let expiresToken = '1d';
    if(remember){
        expiresToken = '7d';
    }
    try{
        const user = await FrontUser.findOne({email});
        if(user){
            if(user.status){
                const matched = await bcrypt.compare(password, user.password);
                if(matched){
                    const token = createToken(user,expiresToken);
                    return res.status(200).json({'msg':'Login successful',token});
                }else{
                    return res.status(401).json({errors:[{msg:'Username or Password does not matched'}]});
                }
            }else{
                return res.status(400).json({errors: [{msg:'Your account is not active'}] });
            }
        }
        else{
             return res.status(404).json({errors:[{msg:'Email not found'}]});
        }
    }catch(error){
        return res.status(404).json({errors:[{msg: error.message}]});
    }
}
module.exports.registerValidations = [
    body('name').not().isEmpty().trim().withMessage("Name is required"),
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').not().isEmpty().trim().withMessage("Password is required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 characters or long"),
];
module.exports.userRegister = async(req, res) =>{
    const { name, email, password, remember } = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
    if(!filter.test(email)){
        return res.status(400).json({errors: [{msg:'Valid email is required'}] });
    }
    if(!remember){
        return res.status(400).json({errors: [{msg:'Please accept privacy policy'}] });
    }
    const checkUser = await FrontUser.findOne({email});
    if(checkUser){
        return res.status(400).json({errors: [{msg:'Email is already exists!!!'}] });
    }else{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const response = await FrontUser.create({
                name,
                email,
                password: hash
            });
            SendVerification(email);
            return res.status(200).json({msg: 'User created. Please Confirm your email to login your account', response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}] });
        } 
    }
}

module.exports.userActivation = async (req, res) =>{
    const {token} = req.body;
    const errors = [];
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }
    const {email} = jwt_decode(token);
    const {status} = await FrontUser.findOne({email});
    if(status){
        errors.push({msg: 'Your account already verified!!!'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        
        try {
            const response = await FrontUser.findOneAndUpdate({email},{status:true}, {new: true});
            return res.status(200).json({msg: 'Your account activated. Please Login', response });
        } catch (error) {
            return res.status(500).json({errors: error.message});
        }
    } 
}

module.exports.forgotPassword = async (req, res) =>{
    const { email } = req.body;
    const user = await FrontUser.findOne({email});
    const errors = [];
    if(email === ''){
        errors.push({msg: 'Email is required'});
    }else{
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
        if(!filter.test(email)){
            errors.push({msg: 'Valid email is required'});
        }else{
            if(!user){
                errors.push({msg: 'Email not fount'});
            }
        }
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = SendUserEmail(email);
            return res.status(200).json({msg: 'Check your email & change your password',response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.resetPassword = async(req, res) =>{
    const token = req.params.token;
    const { password, c_password } = req.body;
    const errors = [];
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }else{
        if(password.length < 5){
            errors.push({msg: 'Password must be 6 characters long'});
        }
        else if(password !== c_password){
            errors.push({msg: 'Password & Confirm Password does not  match'});
        }
    }
    if(c_password === ''){
        errors.push({msg: 'Confirm Password is required'});
    }
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }

    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        const {email} = jwt_decode(token);
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const response = await FrontUser.findOneAndUpdate({email},{password: hash}, {new: true});
            return res.status(200).json({msg: 'Your Password updated successfully', response });
        } catch (error) {
            return res.status(500).json({errors: error.message});
        }
    } 
}