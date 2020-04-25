const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', ( _ , res) => {
    res.send('account app');
});

router.get('/join', ( _ , res) => {
    var text="중복체크"
    res.render('accounts/join.html');
});
router.post('/join', async(req, res) => {
    try{
        await models.User.create(req.body);
        res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');

    }catch(e){

    }
});
router.get('/login', ( _ , res) => {
    res.render('accounts/login.html');
});
router.post('/ajax/check',async(req,res)=>{
    const userNames = await models.User.findOne( //해당 username을 사용하는 유저가 있는지 확인
        {
            where : {username : req.body.username}
        } 
    );  
    if(userNames){  //쿼리 결과 response
        res.json(true);
    }
    //console.log(":::"+JSON.stringify(req.body.username));      
}) 

module.exports = router;