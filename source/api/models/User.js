const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }, 
        profilePicture: {
            type: String,
            default: "default-picture.png",
        },
        savedMovies: {
            type: Array,
            required: false,
        },
        displayName: {
            type: String,
            default: "User"
        },
        region: {
            type: String,
            default: "South",
        },
        birthDate: {
            type: Date,
            default: Date.now()
        },
        gender: {
            type: String,
            default: "Male"
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
