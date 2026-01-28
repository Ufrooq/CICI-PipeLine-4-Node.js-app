const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster email lookups
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email: email.toLowerCase() });
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

const findUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

module.exports = {
    User,
    findUserByEmail,
    findUserById,
    createUser
};