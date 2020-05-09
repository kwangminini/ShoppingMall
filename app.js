// const livereload = require('livereload');
// const livereloadMiddle = require('connect-livereload');
// // 라이브 서버 설정
// const liveServer = livereload.createServer({
//     // 변경시 다시 로드할 파일 확장자들 설정
//     exts: ['html', 'css', 'ejs'],
//     debug: true
// });
//liveServer.watch(__dirname);
const express = require('express');

const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
// db 관련
const db = require('./models');
const cookieParser = require('cookie-parser');

//flash 메시지 관련
const flash = require('connect-flash');
//passport 로그인 관련
const passport = require('passport');
const session = require('express-session');

// DB authentication
db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    //return db.sequelize.sync();
})
.then(() => {
    console.log('DB Sync complete.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
const admin = require('./routes/admin');
const contacts = require('./routes/contacts');
const accounts = require('./routes/accounts');
const auth = require('./routes/auth');
const app = express();
const port = 3000;

nunjucks.configure('template', { //template라는 폴더위치 
    autoescape: true,   //위험한 반복 태그같은거를 방어해준다.?
    express: app
});

//console.log(__dirname);

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//업로드 path 추가
app.use('/uploads', express.static('uploads'));    //static 차이를 알자 , 왼쪽이 url , 오른쪽이 폴더 경로

//session 관련 셋팅
app.use(session({
    secret : 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 2000 * 60 * 60  //지속시간 2시간
    }
}));
//passport 적용
app.use(passport.initialize());
app.use(passport.session());
 
//플래시 메시지 관련
app.use(flash());


app.get('/',function(req,res){
    res.send('first app update');
}); //get 요청(url요청) 

app.use('/admin', admin);
app.use('/contacts', contacts);
app.use('/accounts',accounts);
app.use('/auth',auth);
//app.use(livereloadMiddle());

// app.get('/admin',function(req,res){
//     res.send('admin url 입니다.');
// });

app.listen(port, function(){
    console.log('Express listening on port', port);
});
//nodemon으로 실행하면 hot reloading 

