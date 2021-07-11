const { model, Schema } = require('mongoose');

const interviewSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true,
    },
    video:{
       type: String,
       required: true
    }
}, {timestamps: true} );

module.exports = model("interview", interviewSchema);