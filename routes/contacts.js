const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/',async(req,res)=>{
    try{
    const contacts = await models.Contacts.findAll();

    res.render('contacts/list.html',{contacts : contacts});
    }catch(e){}
});

router.get('/write', (_,res)=>{
    res.render('contacts/form.html');
});
router.post('/write',async(req,res)=>{
    try{
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
    console.log("detail get contact:::"+JSON.stringify(contact));
    res.render('contacts/detail.html',{contact:contact});
    }catch(e){}
});
router.post('/detail/:id',async(req,res)=>{
    try{
    const contact = await models.Contacts.findByPk(req.params.id);
    console.log(":::::::"+JSON.stringify(req.body));
    await contact.createComment(req.body)
    res.redirect('/contacts/detail/'+req.params.id);
    }catch(e){}
});
router.get('/edit/:id', (req,res)=>{
    models.Contacts.findByPk(req.params.id).then((contact)=>{
        res.render('contacts/form.html',{contact:contact});
    });
});
router.post('/edit/:id',(req,res)=>{
    models.Contacts.update(
        {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description
        },
        {
            where : {id : req.params.id}
        }
    ).then(()=>{
        res.redirect('/contacts/detail/'+req.params.id);
    });
})
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