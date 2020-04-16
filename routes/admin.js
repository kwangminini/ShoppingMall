const express = require('express');
const router = express.Router();
const models = require('../models');
router.get('/', function(req,res){
    res.send('admin url!!!');
});

// router.get('/products',function(req,res){
//     res.render('admin/products.html',{  //template 이후 경로 
//         message : "hello",
//         camp : "nodejs"
//     });
// });

function testMiddleware(req,res,next){
    console.log('미들웨어 작동');
    next();
}
function testMiddleware2(req,res,next){
    console.log('미들웨어 작동222');
    next();
}
router.get( '/products' ,testMiddleware,testMiddleware2, async( _ ,res)=>{ //middleware 를 한번 거친다, next()로 제어권을 넘김
    const products= await models.Products.findAll();
    res.render( 'admin/products.html' ,{ products }); //value , key값이 같으면 하나만 적어도 된다
});
// render.get('/products', (_,res) =>{
//     models.Products.findAll({
//     }).then((products)=>{ //DB에서 받은 products를 products변수명으로 내보냄
//         res.render('admin/products.html',{products : products});
//     });
// })
router.get('/products/write',( _ ,res) => {
    res.render('admin/form.html');
});

router.post('/products/write', async(req,res) =>{
    await models.Products.create(req.body
        //{
        // name : req.body.name,
        // price : req.body.price,
        // description : req.body.description
         //}
    );
    res.redirect('/admin/products');
});

router.get('/products/detail/:id' , async(req, res)=>{  //에러 처리는 try catch
    try {
        //const product = await models.Products.findByPk(req.params.id);
        const product = await models.Products.findOne({
            where : {
                id : req.params.id
            },
            include : [
                'Memo'
            ]
        });
        res.render('admin/detail.html', { product: product });  
    } catch (e) {
        
    }
});
router.get('/products/edit/:id' , async(req, res) => {
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    try{
        const product = await models.Products.findByPk(req.params.id);
        res.render('admin/form.html', { product : product });
    }catch(e){

    }
});

router.post('/products/edit/:id' , async(req, res) => {
 
    try{
 
        await models.Products.update(
            req.body , 
            { 
                where : { id: req.params.id } 
            }
        );
        res.redirect('/admin/products/detail/' + req.params.id );
 
    }catch(e){
 
    }
 
});
router.get('/products/delete/:id', async(req, res) => {
 
    try{
 
        await models.Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/products');
 
    }catch(e){
 
    }
 
});
// router.get('/products/delete/:id', (req, res) => {
//     models.Products.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function() {
//         res.redirect('/admin/products');
//     });
// });

router.post('/products/detail/:id' , async(req, res) => {

    // await models.ProductsMemo.create({  <-----이게 원래 방식
    //     content : req.body.content,
    //     product_id : req.body.product_id
    // });
    // res.redirect
    try{ 

        const product = await models.Products.findByPk(req.params.id);
        // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
        await product.createMemo(req.body)
        res.redirect('/admin/products/detail/'+req.params.id);  

    }catch(e){
        console.log(e)
    }

    
});

router.get('/products/delete/:product_id/:memo_id', async(req, res) => { 
    try{
        await models.ProductsMemo.destroy({
            where: {
                id: req.params.memo_id //?
            }
        });
        res.redirect('/admin/products/detail/' + req.params.product_id );

    }catch(e){

    }

});

module.exports = router;
