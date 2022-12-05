import mongoose from 'mongoose';

const uploadScheema = mongoose.Schema({
    name:String,
    type:String,
    filename:String,
    size:Number,
    date:String,
    dateofCreation:String
});

const Uploads = mongoose.model('uploads',uploadScheema);

export default Uploads; 