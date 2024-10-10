const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const user = new User();
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