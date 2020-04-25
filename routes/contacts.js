const express = require('express');
const router = express.Router();
const models = require('../models');
const csrf = require('csurf');
const csrfProtection = csrf({cookie:true});
//이미지 저장 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname,'../uploads');
const fs = require('fs');   //fileSystem 

//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,uploadDir);
    },
    filename : (req,file,callback)=>{
        callback(null,'products-'+Date.now()+'.'+file.mimetype.split('/')[1]);
    }
});
const upload = multer({storage});
router.get('/',async(req,res)=>{
    try{
    const contacts = await models.Contacts.findAll();

    res.render('contacts/list.html',{contacts : contacts});
    }catch(e){}
});

router.get('/write', csrfProtection,(req,res)=>{
    res.render('contacts/form.html', {csrfToken : req.csrfToken()});
});
router.post('/write', upload.single('thumbnail') ,csrfProtection,async(req,res)=>{
    try{
        req.body.thumbnail = (req.file) ? req.file.filename : "";
        await models.Contacts.create( req.body );
        res.redirect('/contacts');
    }catch(e){}
});
router.get('/detail/:id',async(req,res)=>{
    try{
    const contact = await models.Contacts.findOne({
        where : {
            id : req.params.id
        },
        include :[
            'Comment'
        ]
    });
    //console.log("detail get contact:::"+JSON.stringify(contact));
    res.render('contacts/detail.html',{contact:contact});
    }catch(e){}
});
router.post('/detail/:id',async(req,res)=>{
    try{
    const contact = await models.Contacts.findByPk(req.params.id);
    //console.log(":::::::"+JSON.stringify(req.body));
    await contact.createComment(req.body)
    res.redirect('/contacts/detail/'+req.params.id);
    }catch(e){}
});
router.get('/delete/:contact_id/:comment_id', async(req,res)=>{
    try{
    await models.ContactsComment.destroy({
        where : {
            id : req.params.comment_id
        }
    });
    res.redirect('/contacts/detail/'+req.params.contact_id);
    }catch(e){}
});
router.get('/edit/:id', csrfProtection, (req,res)=>{
    models.Contacts.findByPk(req.params.id).then((contact)=>{
        res.render('contacts/form.html',{contact:contact, csrfToken:req.csrfToken()});
    });
});
router.post('/edit/:id',upload.single('thumbnail'),csrfProtection,async(req,res)=>{
    const contact = await models.Contacts.findByPk(req.params.id);
    if(req.file && contact.thumbnail) {  //요청중에 파일이 존재 할시 이전이미지 지운다.
        fs.unlinkSync( uploadDir + '/' + contact.thumbnail );
    }
    //console.log("리퀘스트바디:::::::"+JSON.stringify(req.file));
    req.body.thumbnail = (req.file) ? req.file.filename : contact.thumbnail;
    await models.Contacts.update(
            req.body,
        {
            where : {id : req.params.id}
        }
    )
    res.redirect('/contacts/detail/'+req.params.id);
});
router.get('/delete/:id',(req,res)=>{
    models.Contacts.destroy({
        where : {
            id : req.params.id
        }
    }).then(function(){
        res.redirect('/contacts')
    });
});

module.exports=router;