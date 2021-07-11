const { model, Schema } = require('mongoose');

const frontUserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        default:'profile.png'
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
}, {timestamps: true} );

module.exports = model("frontUser", frontUserSchema);