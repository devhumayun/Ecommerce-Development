import mongoose from "mongoose";

const permissionsSchema = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    slug : {
        type : String,
        requried: true
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
export default mongoose.model( 'Permission', permissionsSchema )