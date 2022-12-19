const { 
    getProductsService, 
    createProductService, 
    updateProductService 
} = require("../services/product.services");


exports.getProducts = async(req,res, next) => {
    try {
        // To get specific product
        // const product = await Product.find({_id: '639feb8c48f4bf4c6e071b45'});

        // To get only in-stock products
        // const products = await Product.find({status: {$ne: 'out-of-stock'}});

        // To get only name and quantity 
        // const products = await Product.find({}, 'name quantity');

        // To get without name and quantity
        // const products = await Product.find({}, '-name -quantity');

        // Advantage of using mongoose
        // const products = await Product.where('name').equals(/\w/)
        // .where('quantity').gt(50).lt(600)
        // .limit(2).sort({quantity: -1});

        // To get specific one product
        // const product = await Product.findById('639feb8c48f4bf4c6e071b');

        // To get all products
        const products = await getProductsService();

        res.status(200).json({
            status: 'success',
            message: 'Successfully get the products',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Something went wrong',
            error: error.message
        })
    }
}

exports.createProduct = async(req, res, next) => {
    // Save or create product
    try{
        // If I don't want to change anything
        const result = await createProductService(req.body);
        result.logger()

        // If I want to change any properties of the product
        // const product = await new Product(req.body);
        // const res = await product.save();

    res.status(200).json({
        status: 'success',
        message: 'Successfully saved product',
        data: result
    })
    }
    catch(error){
        res.status(404).json({
            status: 'Failed',
            message: 'Something went wrong',
            error: error.message
        })
    }
}

exports.updateProduct = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await updateProductService(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated product',
            data: result
        })
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            message: 'Something went wrong',
            error: error.message
        })
    }
}