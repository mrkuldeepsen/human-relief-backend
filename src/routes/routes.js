import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { getUser, getProfile, userRegister, deleteUser, editUser, changePassword, searchUser, userLogin, uniqueUser, userList } from '../controller/user-controller.js'
import { deleteFile, deleteFiles, getImagesList, fileUpload } from '../controller/fileController.js';
import { getParent, addParent, deleteParent, updateParent } from "../controller/parentController.js";
import { getCategory, addCategory, deleteCategory, updateCategory } from "../controller/categoryController.js";
import {
    getDonation, addDonation, deleteDonation, updateDonation,
    donationSearchByCategory, searchDonation, getSingleDonation,
    wishlistHandle, getWishlists
} from "../controller/donationController.js";
import { getCart, addToCart, deleteCart, clearCart } from '../controller/cartController.js'
import { addWishlist, getWishlist, deleteWishlist, clearWishlist } from "../controller/wishlistController.js";
import { uploadImage } from "../controller/imageController.js";
import jwt from 'jsonwebtoken';
const jwtkey = "jwt";
const router = express.Router();

const tokenVerify = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const status = false;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        jwt.token = bearer[1];

        jwt.verify(jwt.token, jwtkey, (err, authData) => {
            if (err) {
                res.json({ result: err });
            } else {
                next();
            }
        })

    } else {
        res.status(404).json({ "Result": "Token not provided" })
    }
}

//user
router.get('/', getUser);
router.post('/userList', tokenVerify, userList);
router.post('/register', userRegister);
router.delete('/delete/:id', deleteUser);
router.put('/users/update/:id', editUser);
router.put('/users/changePassword/:id', changePassword);
router.get('/users/search/:key', searchUser);
router.get('/users/profile/:id', getProfile);
router.post('/login', userLogin);
router.get('/users/unique/:email', uniqueUser);

//Parent
router.get('/getParent', getParent);
router.post('/addParent', addParent);
router.delete('/deleteParent/:id', deleteParent);
router.put('/updateParent/:_id', updateParent);

//Category
router.get('/getCategory', getCategory);
router.post('/addCategory', addCategory);
router.delete('/deleteCategory/:id', deleteCategory);
router.put('/updateCategory/:_id', updateCategory);

//Donation
router.get('/getDonation', getDonation);
router.get('/getSingleDonation/:id', getSingleDonation);
router.post('/addDonation', addDonation);
router.delete('/deleteDonation/:id', deleteDonation);
router.put('/updateDonation/:_id', updateDonation);
router.get('/donationSearchByCategory/:key', donationSearchByCategory);
router.get('/searchDonation/:key', searchDonation);


//Cart
router.get('/getCart/:id', getCart);
router.post('/addToCart', addToCart);
router.delete('/deleteCart/:id', deleteCart);
router.delete('/clearCart/:id', clearCart);

//Wishlist
router.get('/getWishlist/:id', getWishlist);
router.delete('/deleteWishlist/:id', deleteWishlist);
router.delete('/clearWishlist/:id', clearWishlist);
router.post('/addWishlist/', addWishlist);


router.post('/uploads/', uploadImage);
router.put('/wishlistHandle/:_id', wishlistHandle);
router.get('/wishlistHandle/:key', getWishlists);

//File Upload
/*
import multer from 'multer';
import { uploadImage } from "../controller/imageController.js";
router.post('/uploads', (req,res)=>{
        const storage = multer.diskStorage({
            destination: function(req,file,cb){
                cb(null,'./uploads')
            },
            filename: function(req,file,cb){
                cb(null, Date.now() + '--' + file.originalname.replace(/\s+/g, '-').toLowerCase())
            }
        })
    
        const upload = multer({storage: storage}).single("images");
    
        upload(req,res,(err)=>{
            console.log(req.file);
            console.log(req.file.filename);
            res.status(201).json({
                Message:"File Uploaded",
                status:true,
                filename:req.file.filename
            }); 
        }) 
    }) 
 */
import { getTransaction, addTransaction, singleTransaction } from "../controller/transactionController.js";

router.get('/transactions/:_id', getTransaction);
router.get('/transaction/:_id', singleTransaction);
router.post('/transaction', addTransaction);

export default router;  