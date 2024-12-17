
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SignUpUser = async (req, res) => {
    try {
        const { token, password, mail } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            token,
            mail,
            password: hashedPassword,
        });
        await newUser.save();


        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const SignUpUserToken = async (req, res) => {
    try {
        const { token, mail } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        if (!mail) {
            return res.status(400).json({ message: 'Email is required to identify the user' });
        }

        // חיפוש המשתמש על פי כתובת המייל
        const updatedUser = await User.findOneAndUpdate(
            { mail }, // תנאי החיפוש - מציאת משתמש עם אותו מייל
            { token },
            { new: true, upsert: false } // מחזיר את המסמך המעודכן, ולא יוצר אחד חדש אם הוא לא נמצא
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Token added successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating token:', error);
        res.status(500).json({ message: 'Error updating token', error: error.message });
    }
};


module.exports = {
    SignUpUser,
    SignUpUserToken
};