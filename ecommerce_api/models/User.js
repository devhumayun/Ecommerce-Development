import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    email : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
        unique : true
    },
    password : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true,
    },
    mobile : {
        type : String,
        trim : true,
        default: null
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Role",
        requried: true
    },
    username : {
        type : String,
        unique : null
    },
    photo : {
        type : String
    },
    age : {
        type : Number,
        default: null
    },
    gender : {
        type : String,
        enum: ["male", "female", "undefined"],
        default: "undefined"
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    statue : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    }

}, {
    timestamps : true
});


// export default students model
export default mongoose.model( 'User', userSchema )