import multer from "multer";
import Images from "../model/imageSChema.js";
import { getCurrentDate } from "../myController/getCurrentDate.js";

export const uploadImage = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '--' + file.originalname.replace(/\s+/g, '-').toLowerCase())
    }
  })

  const upload = multer({ storage: storage }).single("images");

  upload(req, res, (err) => {
    /*
    console.log(req.file);
    console.log(req.file.filename);
    res.status(201).json({
      Message: "File Uploaded",
      status: true,
      filename: req.file.filename
    });
    */
    updateImageToServer(req,res,req.file);
  })
}

const updateImageToServer = async(req,res,data) =>{
  console.log(data)

  const imageData = {
    title: data.filename,
    type: data.mimetype,
    destination: '/uploads',
    size: data.size, 
    dateofCreation: getCurrentDate(),
  };

  const newImage = new Images(imageData);
  try {
    await newImage.save();
    res.status(201).json({
      Message: "File Uploaded",
      status: true,
      filename: data.filename
    });
    //res.status(201).json({ token, data: newUser });

  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}