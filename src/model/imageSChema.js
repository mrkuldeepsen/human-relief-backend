import mongoose from 'mongoose';

const imageSChema = mongoose.Schema({
    title:String,
    type:String,
    destination:String,
	size:String,
	dateofCreation:String,
});
 
const Images = mongoose.model('images',imageSChema);

export default Images; 