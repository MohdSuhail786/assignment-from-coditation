const { getProducts, saveProduct, updateProduct, getProduct } = require('../controllers/ProductController')
const { saveCategory, getCategories, getCategoryNames } = require('../controllers/CategoryController')

const router = require('express').Router()

router.get('/category-names',getCategoryNames)
router.get('/category',getCategories)
router.post('/product',saveProduct)
router.post('/update/product',updateProduct)
router.post('/category',saveCategory)
router.get('/products',getProducts)
router.get('/getProduct',getProduct)

router.get('/',async(req,res)=>{
    return res.json({message:"Welcome!!"})
})

module.exports = router