const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async(req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User with given email already registered');

    let newUser = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    const singleUser = await newUser.save();

    const token = jwt.sign({_id:singleUser._id}, config.get('jwtPrivateKey'));

    res.header('x-auth-token', token).send(_.pick(singleUser,['_id','name','email']));
})

module.exports = router;