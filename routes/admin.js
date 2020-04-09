const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.send('admin url!!!');
});

router.get('/products',function(req,res){
    res.send('admin products');
});

module.exports = router;