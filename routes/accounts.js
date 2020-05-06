const express = require('express');
const router = express.Router();
const models = require('../models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');

passport.serializeUser((user,done)=>{
    console.log('serializeUser');
    done(null, user);
})
passport.deserializeUser((user,done)=>{
    //const result = user;
    //result.password="";
    console.log('deserializeUser');
    done(null,user);
})

passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
},
    async(req, username, password, done)=>{
        //조회
        const user = await models.User.findOne({
            where : {
                username,
                password : passwordHash(password)
            },
            // attributes : {exclude : ['password']}
        });
        //유저에서 조회되지 않을 시
        if(!user){
            return done(null, false, {message: '일치하는 아이디 패스워드가 존재하지 않습니다.'});
        }
        //유저에서 조회되면 세션등록쪽으로 데이터를 넘김
        else{
            return done(null, user.dataValues);
        }
    }
))

router.get('/', ( _ , res) => {
    res.send('account app');
});

router.post('/login',
    passport.authenticate('local',{    //authenticate ('local') ?? 
        failureRedirect:'/accounts/login',
        failureFlash:true
    }),
    (_,res)=>{
        res.send('<script>alert("로그인성공"); location.href="/accounts/success";</script>');
    }
);


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
router.get('/login', ( req , res) => {
    res.render('accounts/login.html', {flashMessage : req.flash().error});
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
router.get('/success', (req,res)=>{
    res.send(req.user);
})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/accounts/login');
})

module.exports = router;