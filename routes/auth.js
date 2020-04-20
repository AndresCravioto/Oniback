const express = require('express');
const router  = express.Router();
const jwt = require('jwt-simple');
const secret = process.env.PASS;


router.post(`/profile/:userId`, (req, res, next) => {
    if(req.params.userId != jwt.decode(req.headers.auth, secret)) {
        return res.status(403).json({message: 'Usuario no coincide.'});
    }

    User.findByIdAndUpdate(req.params.userId, {name: req.body.name})
    .then( ()=>{
        res.status(200).json()
    })
    .catch( error => {
        return res.status(500).json(error);
    });
    
});

router.get(`/profile`, (req, res, next) => {

    return res.status(200).send({message: 'hola'});
});

module.exports = router;