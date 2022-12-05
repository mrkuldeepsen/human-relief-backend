import Category from "../model/categorySchema.js"
//Parents

export const getCategory = async (req, res) => {
  try {
    let uses = await Category.find();
    res.status(200).json(uses)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const addCategory = async (request, response) => {
  if (request.body.title === "") {
    response.json({ message: "Title can not be empty" });
  } else 
  
  if (request.body.image === "") {
    response.json({ message: "Image can not be empty" });
  }else{
    const parentData = {
      title: request.body.title,
      image: request.body.image,
      parent: request.body.parent,
      description: request.body.description, 
      title_multi_lang: request.body.title_multi_lang, 
      dateofCreation: getCurrentDate(),
    };

    const newParent = new Category(parentData);
    try {
      await newParent.save();
      response.status(201).json(newParent);
      //res.status(201).json({ token, data: newUser });

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}


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