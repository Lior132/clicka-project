
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserDetails = require('../models/UserDetails')

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

// const SignUpUserToken = async (req, res) => {
//     try {
//         const { token, mail } = req.body;

//         if (!token) {
//             return res.status(400).json({ message: 'Token is required' });
//         }

//         if (!mail) {
//             return res.status(400).json({ message: 'Email is required to identify the user' });
//         }

//         // חיפוש המשתמש על פי כתובת המייל
//         const updatedUser = await User.findOneAndUpdate(
//             { mail }, // תנאי החיפוש - מציאת משתמש עם אותו מייל
//             { token },
//             { new: true, upsert: false } // מחזיר את המסמך המעודכן, ולא יוצר אחד חדש אם הוא לא נמצא
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'Token added successfully', user: updatedUser });
//     } catch (error) {
//         console.error('Error updating token:', error);
//         res.status(500).json({ message: 'Error updating token', error: error.message });
//     }
// };

const SignUpUserToken = async (req, res) => {
    try {
        const { token, mail } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        if (!mail) {
            return res.status(400).json({ message: 'Email is required to identify the user' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        // חיפוש המשתמש על פי כתובת המייל
        const updatedUser = await User.findOneAndUpdate(
            { mail }, // תנאי החיפוש - מציאת משתמש עם אותו מייל
            { token },
            { new: true, upsert: false } // מחזיר את המסמך המעודכן, ולא יוצר אחד חדש אם הוא לא נמצא
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // הגדרת הטוקן בעוגייה
        res.cookie('authToken', token, {
            httpOnly: true, // מונע גישה לעוגייה דרך JavaScript בצד הלקוח
            secure: process.env.NODE_ENV === 'production', // משתמש ב-secure רק בפרודקשן
            sameSite: 'strict', // מונע שליחה מאתרים חיצוניים
            maxAge: 7 * 24 * 60 * 60 * 1000, // תוקף העוגייה לשבוע
        });

        res.status(200).json({ message: 'Token added successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating token:', error);
        res.status(500).json({ message: 'Error updating token', error: error.message });
    }
};


const postProfileDetailes = async (req, res) => {
    try {
        const { fullName, age, gender, images } = req.body;
        const userId = req.user._id; // גישה ל-ID מתוך המידע המפוענח

        if (!userId) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        let userProfile = await UserDetails.findOne()

        if (!userProfile) {
            userProfile = new UserDetails({
                userId,
                fullName,
                age,
                gender,
                images
            })
        } else {
            userProfile.fullName = fullName;
            userProfile.age = age;
            userProfile.gender = gender;
            userProfile.images = images;
        }

        await userProfile.save();

        res.status(200).json({ massage: 'Profile updated successfully', data: userProfile});

    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProfileDetails = async (req, res) => {
    try {
        const userId = req.userId; // מקבל את ה-userId מה-token

        // חיפוש פרטי הפרופיל לפי userId
        const userProfile = await UserDetails.findOne({ userId });

        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        res.status(200).json({ message: 'Profile fetched successfully', data: userProfile });

    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    SignUpUser,
    SignUpUserToken,
    postProfileDetailes,
    getProfileDetails
};