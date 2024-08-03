const mongo = require('mongoose');
const userSchema= require('./user.js')

const urlSchema= new mongo.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },

    redirectUrl:{
        type: String,
        required: true
    },

    visitHistory:[{timestamp:{ type: Number }}],
    createdBy:{
        type: mongo.Schema.Types.ObjectId,
        ref: "userschemas",
    }
}, {timeStamps: true}
);

const URL= mongo.model('url', urlSchema);

module.exports=URL;