const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
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

router.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
})

router.post('/', async(req, res) =>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })

    cus = await customer.save();
    res.send(cus);
})

function validateCustomer(cus){
    const schema = {
        isGold:Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required()
    }

    return Joi.validate(cus, schema);
}

module.exports = router;