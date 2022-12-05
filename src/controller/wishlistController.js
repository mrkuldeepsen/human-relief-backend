import { getCurrentDate } from "../myController/getCurrentDate.js";
import Wishlist from "../model/wishlistScema.js";
//Parents

export const getWishlist = async (req, res) => {
  try {
    let wishlists = await Wishlist.find({ userId: req.params.id });
    res.status(200).json(wishlists)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const addWishlist = async (request, response) => {

  const wishlist = await Wishlist.findOne({ postId: request.body.postId, userId: request.body.userId })

  if (wishlist) {
    response.status(400).send(
      { message: "Post Id must be unique" }
    )
  }
  else {

    if (request.body.userId === "") {
      response.json({ message: "User id can not be empty" });
    } else

      if (request.body.pastId === "") {
        response.json({ message: "Post is can not be empty" });
      } else {
        const wishlistdataData = {
          userId: request.body.userId,
          postId: request.body.postId,
          dateofCreation: getCurrentDate(),
        };

        const newWishlistdata = new Wishlist(wishlistdataData);
        try {
          await newWishlistdata.save();
          response.status(201).json({
            data: newWishlistdata
          });
          //res.status(201).json({ token, data: newUser });

        } catch (error) {
          response.status(500).json({ message: error.message });
        }
      }
  }

}

export const deleteWishlist = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Wishlist.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      res.status(201).json({
        message: "Remove From Wishlist is deleted Sccessfully",
        status: true,
      });
    } else {
      res.status(201).json({
        message: "Recored Not Match",
        status: false,
      });
    }

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({ userId: req.params.id });
    if (result) {
      res.status(201).json({
        message: "Wishlist is Clear",
        status: true,
      });
    } else {
      res.status(201).json({
        message: "Recored Not Match",
        status: false,
      });
    }
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