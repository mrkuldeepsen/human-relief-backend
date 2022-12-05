
import mongoose from 'mongoose';
import { delete_single_file, delete_multi_file } from '../myController/FileSystem.js';
import  Uploads from '../model/uploadScheema.js';

import multer from 'multer';

//File Upload
export const fileUpload = (req,res) =>{
    console.log("file upload");
    
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./uploads')
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + '--' + file.originalname.replace(/\s+/g, '-').toLowerCase())
        }
    })
 
    const upload = multer({storage: storage}).single("images");

    upload(req,res,(err)=>{ 
        
        storeInDatabase(req.file);

        res.status(201).json({
            Message:"File Uploaded",
            status:true,
            filename:req.file.filename
        });
    }) 
}

//Store Media into Database
export const storeInDatabase = async (media) =>{
    const uploadData = {
        _id:new mongoose.Types.ObjectId(),
        name:media.fieldname,
        type:media.mimetype,
        filename:media.filename,
        size:media.size,
        date:media.filename.split('-')[0]
    };
 
    const newUpload = new Uploads(uploadData);
    try{
         await newUpload.save();
    }catch(error){
    }
}

export const getImagesList = async (req,res) =>{
    try{ 
        	let uses = await Uploads.find().select(); 
            //let data = await Product.find().sort("name").skip(2).limit(2);
			res.status(200).json(uses)
    }catch(error){
            res.json({message: error.message})
    }
}
 
export const deleteFile = (req,res) =>{ 
    let count = delete_single_file(req.params.key);
    console.log(count);
    if( count > 0){
        res.status(422).json({
            Message:"File Delete",
            status:true
        });
    }else{
        res.status(422).json({
            Message:"File is not exist",
            status:false
        }); 
    }
}

export const deleteFiles = (req,res) =>{    
    let count = delete_multi_file(req.body.data);
    console.log(count);
    if( count > 0){
        res.status(422).json({
            Message:"File Delete",
            status:true
        });
    }else{
        res.status(422).json({
            Message:"File is not exist",
            status:false
        }); 
    }
}
