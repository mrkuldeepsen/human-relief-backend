import User from '../model/user-scheema.js';
import { encription_data, description_data } from '../myController/cryptography.js';
import jwt from 'jsonwebtoken';
const jwtkey = "jwt";
import { getCurrentDate } from '../myController/getCurrentDate.js';

export const getUser = async (req, res) => {
        try {
                let uses = await User.find();
                res.status(200).json(uses)
        } catch (error) {
                res.json({ message: error.message })
        }
}

export const getProfile = async (req, res) => {
        console.log(req.params.id);
        try {
                let uses = await User.find({ _id: req.params.id });
                res.status(200).json(uses)
        } catch (error) {
                res.json({ message: error.message })
        }
}

export const userList = async (req, res) => {
        try {
                let uses = await User.find();
                res.status(200).json(uses)
        } catch (error) {
                res.json({ message: error.message })
        }
}

/*
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
*/



export const userRegister = async (req, res) => {
        //res.status(200).json('Send data From user Routes 420');
        console.log("API hit 1");
        const password = encription_data(req.body.password);

        const userData = {
                //_id:new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
                dateofCreation: getCurrentDate(),
        };

        const newUser = new User(userData);
        try {
                await newUser.save();
                //res.status(201).json(newUser);
                jwt.sign({ newUser }, jwtkey, { expiresIn: '2592000s' }, (err, token) => {
                        res.status(201).json({ token, data: newUser });
                })

        } catch (error) {
                res.json({ message: error.message });
        }
}

export const deleteUser = async (req, res) => {
        console.log(req.params.id);
        try {
                await User.findByIdAndDelete({ _id: req.params.id });
                res.status(201).json("User deleted Successfully");
        } catch (error) {
                res.status(409).json({ message: error.message });
        }

}

export const changePassword = async (request, response) => {
        const password = encription_data(request.body.password);
        const newPassword = {'password':password}; 
        try {
                let data = await User.updateOne(
                        {_id:request.params.id},
                        {
                                $set: newPassword
                        }
                );
                response.send(data);
        } catch (error) {
                response.status(409).json({ message: error.message });
        }
}


export const editUser = async (request, response) => {
        console.log(request.params);

        try {
                let data = await User.updateOne(
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

export const userLogin = async (req, res) => {
        User.findOne({ email: req.body.email }).then((data) => {
                //    console.log("kio 221");

                if (data) {
                        let password = description_data(data.password);
                        if (password == req.body.password) {
                                jwt.sign({ data }, jwtkey, { expiresIn: '2592000s' }, (err, token) => {
                                          
                                        res.status(200).json({
                                                data,
                                                token,
                                                Message: "Login Successful",
                                                status: true
                                        });


                                })

                        } else {
                                res.status(422).json({
                                        Message: "Password Incorrect",
                                        status: false
                                });
                        }
                } else {
                        res.status(422).json({
                                Message: "User Not Exist",
                                status: false
                        });
                }
        });

}

//Unique User 
export const uniqueUser = async (req, res) => {
        console.log(req.params.email);
        try {
                let uses = await User.find({ "email": req.params.email });
                if (uses.length > 0) {
                        res.status(422).json({
                                Message: "User Exist",
                                status: false
                        });
                } else {
                        res.status(422).json({
                                Message: "Unique User",
                                status: true
                        });
                }

        } catch (error) {
                res.json({ message: error.message })
        }
}


export const searchUser = async (req, res) => {
        let data = await User.find(
                {
                        "$or": [
                                { "name": { $regex: req.params.key, $options: '$i' } }
                        ]
                }
        );
        res.send(data);
};