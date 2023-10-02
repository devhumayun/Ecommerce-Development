import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "All fields are requried"],
      trim: true,
    },
    slug: {
      type: String,
      requried: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],
      default: "simple",
    },
    productSimple: {
      regularPrice: {
        type: Number,
      },
      salePrice: {
        type: Number,
      },
      productPhotos: {
        type: [String],
      },
      sku: {
        type: Number,
        default: 0,
      },
    },
    productVariable: [
      {
        size: {
          type: String,
          default: null,
        },
        colors: {
          type: String,
          default: null,
        },
        regularPrice: {
          type: Number,
        },
        salePrice: {
          type: Number,
        },
        productPhotos: {
          type: [String],
        },
        sku: {
          type: Number,
          default: 0,
        },
      },
    ],
    productGroup: [
      {
        name: {
          type: String,
        },
        regularPrice: {
          type: Number,
        },
        salePrice: {
          type: Number,
        },
        productPhotos: {
          type: [String],
        },
        sku: {
          type: Number,
          default: 0,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,
      },
      salePrice: {
        type: Number,
      },
      productPhotos: {
        type: [String],
      },
      sku: {
        type: Number,
        default: 0,
      },
      link: {
        type: String,
      },
    },
    shortDesc: {
      type: String,
    },
    longDesc: {
      type: String,
    },
    specification: {
      type: String,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reviews",
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      // require: true,
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default students model
export default mongoose.model("Products", productSchema);
