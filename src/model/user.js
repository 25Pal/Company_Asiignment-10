const mongoose = require('mongoose')
const validator = require("validator")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email !")
            }
        }
    },
    password: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema);