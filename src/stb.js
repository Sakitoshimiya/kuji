const mgb = require("mongoose")
const paths = require("path")
const dotyenv = require("dotenv")
dotyenv.config();
mgb.connect(process.env.MONGO_URL).then(() =>{
    console.log("mgb connected");
})
.catch(() =>{
    console.log("failed to connect");
})

const loginschema = new mgb.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    job:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:null
    }

})
const vid_cor = new mgb.Schema({
    "title":{
        type:String,
        default:null
    },
    "link":{
        type:String,
        default:null
    }

})
module.exports = new mgb.model("users",loginschema)