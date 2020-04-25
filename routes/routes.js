const express = require('express');
const router  = express.Router();
const Category = require('../models/Category.js');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jwt-simple');
const secret = process.env.PASS;

router.post('/category/create', (req, res, next) => {
    const newCategory = new Category(req.body);
    newCategory.save()
    .then(test=>{
        res.status(200).json(test)
    })
    .catch(e=>console.log(e))
});

router.post('/signup', (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const newUser = new User(req.body);
    newUser.save()
    .then(() => {
        return res.json({message: 'Usuario creado.'});
    })
    .catch( error => {
        return res.status(500).json(error);
    })
});

router.post('/login', (req, res, next) => {
    let user = User.findOne({email: req.body.email})
        .then( user => {
            if(user && bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(200).json({
                token: jwt.encode({userId: user._id}, secret),
                userId: user._id,
                username: user.name});
            }

            return res.status(404).json({message: 'Crendenciales Invalidas.'});
        })
        .catch( error => {
            return res.status(500).json(error);
        })
});

router.post('/profile', (req, res, next) => {
    console.log(req.body.userId)
    console.log(req.body.name)
    console.log(req.body.lastName)
    User.updateOne({_id: req.body.userId}, {$set:{name: req.body.name, lastName: req.body.lastName, age: req.body.age}})
    .then( () => {
        return res.status(200).json({message: 'User Updated.'})
    }
    )
    .catch( error => {
        return res.status(500).json(error);
    })
});

module.exports = router;