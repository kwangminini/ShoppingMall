const express = require('express');

const admin = require('./routes/admin');
const app = express();
const port = 3000;

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