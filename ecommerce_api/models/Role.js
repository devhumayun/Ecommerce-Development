import mongoose from "mongoose";

const roleSchema = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    slug : {
        type : String,
        requried: true
    },
    permissions : {
        type : Array,
        default:[]
    },
    status : {
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
export default mongoose.model( 'Role', roleSchema )