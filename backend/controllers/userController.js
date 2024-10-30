const User = require("../models/User");
const jwt = require("jsonwebtoken");


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
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        console.log("Entered password:", password);
        console.log("Stored hashed password:", user.password);

        // Compare the entered password with the hashed password
        const isPasswordCorrect = await user.matchPassword(password);

        console.log("Password match:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour expiry
        });

        // Send success response
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Optionally, you can decode the token to find the user. This depends on how you're using the token.
        // If you need the user ID for logging purposes, you can decode it like this:

        const token = req.cookies.token;  // Get the token from the cookies
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token

        // Find the user by ID if necessary
        const user = await User.findById(decoded.id);  // Assuming you want to log the user out
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Clear the cookie by setting a very short expiration time
        res.cookie('token', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',  // Only secure in production
            sameSite: 'strict', 
            maxAge: 1  // This clears the cookie immediately
        });

        // Send a success message
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Logout failed", error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if(user) {
            res.json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        } else {
            res.status(404).json({ message: "Could not find user"});
        }
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    signInUser,
    logoutUser,
    getUserData
}