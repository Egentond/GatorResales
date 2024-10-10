const User = require("../models/User");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists) {
            res.status(400).json({ message: "User already exists"});
            return;
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        if(user) {
            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
            });
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastname: user.lastName,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    } catch(error) {
        console.error("User registration failed", error);
    }
}

const signInUser = async (req, res) => {
    try {
        const user = await User.findById();

    } catch(error) {
        console.error("User registration failed", error);
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = await User.findById();


    } catch(error) {
        console.error("User registration failed", error);
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await User.findById();

    } catch(error) {
        console.error("Failed to get user data", error);
    }
}

module.exports = {
    registerUser,
    signInUser,
    logoutUser,
    getUserData
}