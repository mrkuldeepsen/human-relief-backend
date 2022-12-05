import Parents from "../model/parentScheema.js"
//Parents

export const getParent = async (req, res) => {
  try {
    let uses = await Parents.find();
    res.status(200).json(uses)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const addParent = async (request, response) => {
  if (request.body.title === "") {
    response.json({ message: "Title can not be empty" });
  } else {
    const parentData = {
      title: request.body.title,
      description: request.body.description,
      dateofCreation: getCurrentDate(),
    };

    const newParent = new Parents(parentData);
    try {
      await newParent.save();
      response.status(201).json(newParent);
      //res.status(201).json({ token, data: newUser });

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}


export const deleteParent = async (req, res) => {
  console.log(req.params.id);
  try {
          await Parents.findByIdAndDelete({ _id: req.params.id });
          res.status(201).json("Parent deleted Successfully");
  } catch (error) {
          res.status(409).json({ message: error.message });
  }
}


export const updateParent = async (request, response) => {
  console.log(request.params);
  try {
          let data = await Parents.updateOne(
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