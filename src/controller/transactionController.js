import Transaction from '../model/TransactionSchema.js';
import { getCurrentDate } from '../myController/getCurrentDate.js';

export const getTransaction = async (req, res) => {
  try {
          let transactions = await Transaction.find({userId:req.params._id});
          res.status(200).json(transactions)
  } catch (error) {
          res.json({ message: error.message })
  }
}

export const singleTransaction = async (req, res) => {
  try {
          let transactions = await Transaction.findOne({transactionId:req.params._id});
          res.status(200).json(transactions)
  } catch (error) {
          res.json({ message: error.message })
  }
}

export const addTransaction = async (req, res) => {
  const userData = {
          //_id:new mongoose.Types.ObjectId(),
          transactionId: req.body.transactionId,
          userId: req.body.userId,
          price: req.body.price,
          item: req.body.item, 
          paypalId: req.body.paypalId, 
          status: 'complete',
          dateOfCreation: getCurrentDate(),
  };

  const newTransaction = new Transaction(userData);
  try {
          await newTransaction.save();
          res.status(201).json({ status:true,data:newTransaction });

  } catch (error) {
          res.json({ message: error.message });
  }
}