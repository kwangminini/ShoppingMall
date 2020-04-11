const express = require('express');

const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
// db 관련
const db = require('./models');

// DB authentication
db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    // return db.sequelize.sync();
})
.then(() => {
    console.log('DB Sync complete.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
const admin = require('./routes/admin');
const app = express();
const port = 3000;

nunjucks.configure('template', { //template라는 폴더위치
    autoescape: true,   //위험한 반복 태그같은거를 방어해준다.?
    express: app
});

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.send('first app update');
}); //get 요청(url요청) 
app.use('/admin', admin);

// app.get('/admin',function(req,res){
//     res.send('admin url 입니다.');
// });


app.listen(port, function(){
    console.log('Express listening on port', port);
});
//nodemon으로 실행하면 hot reloading 