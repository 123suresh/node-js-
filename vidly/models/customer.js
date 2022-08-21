const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold:{
        type: Boolean,
        required: true,
        default: false
    },
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    }
}));

function validateCustomer(cus){
    const schema = {
        isGold:Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required()
    }

    return Joi.validate(cus, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;