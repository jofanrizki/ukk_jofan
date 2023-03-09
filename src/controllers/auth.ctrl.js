const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("../models");
// const fs = require('fs');
// const uploadFile = require("../middleware/upload");
// const baseUrl = "http://localhost:3000/uploads/";

const User = db.user;


const register = async(req, res) => {
    
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password || !role) {
        res.status(400).send({ message: "All input is required!" });
    }

    const oldUser = await User.findOne({ email });    if (oldUser){
        res.status(400).send({ message: "User already exists!" });
    }
    else {
        
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: encryptedPassword,
            role,
            
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        user.token = token;

        user.save((err, result) => {
            if (err){
                res.status(500).send({ message: "Error Save Data!" });
            }
            else{
                res.status(201).json(result);
            }
        });
    }
   
}

const login = async(req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!(email || password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    else{
        res.status(400).send("Invalid Credentials");
    }
    
}


module.exports = {
    register,
    login
}