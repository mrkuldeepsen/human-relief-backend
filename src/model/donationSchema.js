import mongoose from 'mongoose';

const donationSchema = mongoose.Schema({
    title:String,
    description:String,
    image:String,
    category:Array,
    donationDate:String,
    createdBy:String,
    targetAmmount:Number,
    raisedSoFar:Number,
    dateofCreation:String,
    isFeature:Boolean,
    poster:String,
    wishlist:Array,
    translation_title:Array,
    translation_description:Array,
});

const Donation = mongoose.model('donation',donationSchema);

export default Donation; 