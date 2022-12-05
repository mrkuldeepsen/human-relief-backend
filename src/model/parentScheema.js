import mongoose from 'mongoose';

const parentScheema = mongoose.Schema({
    title:String,
    description:String,
    dateofCreation:String
});

const Parents = mongoose.model('parents',parentScheema);

export default Parents; 