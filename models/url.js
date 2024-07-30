const mongo = require('mongoose');

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
}, {timeStamps: true}
);

const URL= mongo.model('url', urlSchema);

module.exports=URL;