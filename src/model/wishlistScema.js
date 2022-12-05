import mongoose from 'mongoose';

const wishlistScema = mongoose.Schema({
    postId: { type: String },
    userId: String,
    dateofCreation: String,
});

const Wishlist = mongoose.model('wishlist', wishlistScema);

export default Wishlist; 