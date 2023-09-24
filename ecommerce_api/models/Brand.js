import mongoose from "mongoose";

const brandSchema = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    slug : {
        type : String,
        requried: true
    },
    logo: {
        type: String,
        default: null
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
export default mongoose.model( 'Brand', brandSchema )