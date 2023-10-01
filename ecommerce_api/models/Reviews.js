import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

    rating : {
        type : Number,
        requried : true
    },
    reviewSchema : {
        type : String,
        requried: true
    },
    // customer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cumtomer"
    // },
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
export default mongoose.model( 'Reviews', reviewSchema )