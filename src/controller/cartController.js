import Cart from "../model/cartSchema.js";
import { getCurrentDate } from "../myController/getCurrentDate.js";
//Parents

export const getCart = async (req, res) => { 
  console.log("Hit")
  try {
    let carts = await Cart.find({userId: req.params.id});
    res.status(200).json(carts)
  } catch (error) {
    res.json({ message: error.message })
  }
} 

export const addToCart = async (request, response) => {
  console.log(request.body.price);
  if (request.body.title === "") {
    response.json({ message: "Title can not be empty" });
  } else 

  if (request.body.title === "") {
    response.json({ message: "Price can not be empty" });
  } else 
  
  if (request.body.image === "") {
    response.json({ message: "Image can not be empty" });
  }else{
    const cartData = {
      title: request.body.title,
      image: request.body.image,
      productId: request.body.productId,
      userId: request.body.userId, 
      price: request.body.price, 
      dateofCreation: getCurrentDate(),
    };

    const newCart = new Cart(cartData);
    try {
      await newCart.save();
      response.status(201).json({
        data:newCart
      });
      //res.status(201).json({ token, data: newUser });

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}

export const deleteCart = async (req, res) => {
  console.log(req.params.id);
  try {
          const result = await Cart.findByIdAndDelete({ _id: req.params.id });
          if(result){
            res.status(201).json({
              message:"Cart is deleted Sccessfully",
              status:true,
            });
          }else{
            res.status(201).json({
              message:"Recored Not Match",
              status:false,
            });
          }
          
  } catch (error) {
          res.status(409).json({ message: error.message });
  }
}

export const clearCart = async (req, res) => {
  try {
          await Cart.deleteMany({ userId: req.params.id });
          res.status(201).json({
            data:Cart,
            message:"Parent deleted Successfully"
          });
  } catch (error) {
          res.status(409).json({ message: error.message });
  }
}


/*
export const deleteCategory = async (req, res) => {
  console.log(req.params.id);
  try {
          await Category.findByIdAndDelete({ _id: req.params.id });
          res.status(201).json("Parent deleted Successfully");
  } catch (error) {
          res.status(409).json({ message: error.message });
  }
}


export const updateCategory = async (request, response) => {
  console.log(request.params);
  try {
          let data = await Category.updateOne(
                  request.params,
                  {
                          $set: request.body
                  }
          );
          response.send(data);
  } catch (error) {
          response.status(409).json({ message: error.message });
  }

}
*/