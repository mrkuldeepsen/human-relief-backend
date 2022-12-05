import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title:String,
    description:String,
    title_multi_lang:Array,
    description_multi_lang:Array,
    image:String,
    parent:String,
    dateofCreation:String
});

const Category = mongoose.model('category',categorySchema);

export default Category; 