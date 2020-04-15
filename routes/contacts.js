const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/',function(req,res){
    models.Contacts.findAll({
    }).then((contacts) => {
        res.render('contacts/list.html',{contacts : contacts});
    });
});
router.get('/write', (_,res)=>{
    res.render('contacts/form.html');
});
router.post('/write',(req,res)=>{
    models.Contacts.create(
        req.body
    ).then(()=>{
        res.redirect('/contacts');
    });
});
router.get('/detail/:id',(req,res)=>{
    models.Contacts.findByPk(req.params.id).then((contact)=>{
        res.render('contacts/detail.html',{contact:contact});
    });
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
module.exports=router;