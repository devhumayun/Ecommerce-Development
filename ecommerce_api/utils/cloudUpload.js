import cloudinary from 'cloudinary';
import fs from 'fs'
import path from 'path';

// config cloudinary
cloudinary.config({ 
    cloud_name: 'dmqquu0p4', 
    api_key: '332867628643741', 
    api_secret: '0UE6lh1T8Lk1lc-xVtC8P5fMTDw' 
});

// upload file
export const cloudUpload = async (req) => {
    const data = await cloudinary.v2.uploader.upload(req.file.path)
    return data
}

// deletefile
export const cloudFileDelete = async (publicId) => {
    const data = await cloudinary.v2.uploader.destroy(publicId)
    return data
}

