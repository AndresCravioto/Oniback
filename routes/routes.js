const express = require('express');
const router  = express.Router();
const Category = require('../models/Category.js');


/* POST Test by id. */
router.post('/category/create', (req, res, next) => {
    const newCategory = new Category(req.body);
    newCategory.save()
    .then(test=>{
        res.status(200).json(test)
    })
    .catch(e=>console.log(e))
});

module.exports = router;