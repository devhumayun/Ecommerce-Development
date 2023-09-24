import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({

    name : {
        type : String,
        requried : [ true, 'All fields are requried' ],
        trim : true
    },
    slug : {
        type : String,
        requried: true
    },
    icon: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    subCategory: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Category",
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
export default mongoose.model( 'Category', CategorySchema )