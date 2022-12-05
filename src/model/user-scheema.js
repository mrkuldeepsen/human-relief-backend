import mongoose from 'mongoose';

const userScheema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
	token:String,
    password:String,
    varified:Boolean,
    dateofCreation:String
});

const User = mongoose.model('user',userScheema);

export default User; 