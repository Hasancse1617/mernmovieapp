const {model, Schema} = require('mongoose');

const genreSchema = new Schema({
    name:{
        type:  String,
        required: true
    }
   },
   
    {timestamps: true}
);

module.exports = model("genre", genreSchema);