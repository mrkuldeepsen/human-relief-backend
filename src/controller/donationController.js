import Donation from '../model/donationSchema.js';
import { getCurrentDate } from '../myController/getCurrentDate.js';
//Parents

export const getDonation = async (req, res) => {
  try {
    let uses = await Donation.find();
    res.status(200).json(uses)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const getSingleDonation = async (req, res) => {
  try {
    let uses = await Donation.find({_id:req.params.id});
    res.status(200).json(uses)
  } catch (error) {
    res.json({ message: error.message })
  } 
}

export const addDonation = async (request, response) => {
  if (request.body.title === "") {
    response.json({ message: "Title can not be empty" });
  } else

    if (request.body.category === "") {
      response.json({ message: "Category can not be empty" });
    } else

      if (request.body.donationDate === "") {
        response.json({ message: "Donation date can not be empty" });
      } else

        if (request.body.createdBy === "") {
          response.json({ message: "Created by can not be empty" });
        } else

          if (request.body.targetAmmount === "") {
            response.json({ message: "Target Ammount can not be empty" });
          } else
            if (request.body.raisedSoFar === "") {
              response.json({ message: "Raised so far by can not be empty" });
            } else

              if (request.body.image === "") {
                response.json({ message: "Image can not be empty" });
              } else {
                const donationData = {
                  title: request.body.title,
                  image: request.body.image,
                  category: request.body.category,
                  description: request.body.description,
                  donationDate: request.body.donationDate,
                  createdBy: request.body.createdBy,
                  targetAmmount: request.body.targetAmmount,
                  raisedSoFar: request.body.raisedSoFar,
                  isFeature:request.body.isfeature,
                  poster:request.body.poster,
                  translation_description:request.body.translation_description,
                  translation_title:request.body.translation_title,
                  dateofCreation: getCurrentDate(),
                };

                const newDonation = new Donation(donationData);
                try {
                  await newDonation.save();
                  response.status(201).json(newDonation);
                  //res.status(201).json({ token, data: newUser });

                } catch (error) {
                  response.status(500).json({ message: error.message });
                }
              }
}

export const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete({ _id: req.params.id });
    res.status(201).json("Parent deleted Successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const wishlistHandle = async (request, response) => {
  console.log(request.body)
  try {
    let data = await Donation.updateOne(
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

export const getWishlists = async (request, response) => {
  const donations = await Donation.find({
    "$or":[
      { "wishlist.id": { $regex: request.params.key, $options: '$i' } }
    ] 
  });

  try {
    response.send(donations);
  } catch (error) {
    response.status(500).send(error);
  }
}

export const updateDonation = async (request, response) => {
  try {
    let data = await Donation.updateOne(
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

export const donationSearchByCategory = async (request, response) => {
  const donations = await Donation.find({
    "$or":[
      { "category.title": { $regex: request.params.key, $options: '$i' } }
    ]
  });

  try {
    response.send(donations);
  } catch (error) {
    response.status(500).send(error);
  }
}

export const searchDonation = async (request, response) => {
  const donations = await Donation.find({
    "$or":[
      { "category.title": { $regex: request.params.key, $options: '$i' } },
      { "title": { $regex: request.params.key, $options: '$i' } },
      { "translation_title.en": { $regex: request.params.key, $options: '$i' } },
      { "translation_title.de": { $regex: request.params.key, $options: '$i' } }
    ]
  });

  try {
    if(donations.length === 0){
      response.send({
        data:donations,
        message:"Data not found",
        status:false
      });
    }else{
      response.send({
        data:donations,
        message:donations.length+" Record found",
        status:true,
        no_of_record:donations.length
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
}
