const {Customer, validate} = require('../models/customer');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
})

router.post('/', async(req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })

    cus = await customer.save();
    res.send(cus);
})

router.put('/:id', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },
    {new: true}
    );
    if(!customer) return res.status(400).send('the customer with given id was not found');

    res.send(customer);
})

router.delete('/:id', async(req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(400).send('the customer with given id was not found');
    res.send(customer);
})

router.get('/:id', async(req,res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(400).send('the customer with given id was not found');
    res.send(customer);
})

module.exports = router;