import multer from "multer";

// create multer storage

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.round(Math.random() * 1000000) + "-" + file.fieldname)
    }
})

// brand logo
export const brandLogo = multer({ storage }).single("logo");

// category photo
export const categoryPhoto = multer({ storage }).single("catPhoto");

// products photo
export const productPhoto = multer({ storage }).array("productPhoto");

