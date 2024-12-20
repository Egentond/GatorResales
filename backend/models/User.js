const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // For generating random reset tokens

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stripeAccountId: {type: String}
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// This function generates a token for the user to reset their password and update the database
userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // expires in 10 minutes

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
