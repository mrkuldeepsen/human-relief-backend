import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({
    transactionId:String,
    userId:String,
    paypalId:String,
	  price:String,
    item:Array,
    status:String,
    dateOfCreation:String,
});
 
const Transaction = mongoose.model('transaction',TransactionSchema);

export default Transaction; 