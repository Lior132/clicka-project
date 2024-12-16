
const bcrypt = require('bcrypt'); 
const User =require('../models/User');

const SignUpUser = async (req, res) => {
    try {
        const { token, password, mail } = req.body;  

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            token,
            mail,
            password:hashedPassword,
        });
        await newUser.save();

     
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};



module.exports = {
    SignUpUser ,
};