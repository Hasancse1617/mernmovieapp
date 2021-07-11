const { model, Schema } = require('mongoose');

const videoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    tags_id:[{
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }],
    thumbnail:{
        type: String,
        required: true,
    },
    video:{
       type: String,
       required: true
    },
    release_date:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    quality:{
        type: String,
        required: true
    },
    views:{
        type: Number,
        required: true,
        default: '0'
    },
    price_status:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        required: true,
        default: 'Visible'
    }
}, {timestamps: true} );

module.exports = model("video", videoSchema);