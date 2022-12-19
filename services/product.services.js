const Product = require("../models/Product")


exports.getProductsService = async (filters, queries) => {
    const products = await Product.find({}).sort(queries.sortBy).select(queries.fields);
    return products;
}

exports.createProductService = async( data) => {
    const product = await Product.create(data);
    return product;
}

exports.updateProductService = async(productId, data) => {
    const result = await Product.updateOne({_id:productId }, {$set: data}, {
        runValidators: true
    });

    return result;
}

exports.bulkUpdateProductService = async(data) => {
    // const result = await Product.updateMany({_id: data.ids}, data.data, {
    //     runValidators: true
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id: product.id}, {$set: product.data}))
    });
    const result = await Promise.all(products);

    return result;
}

exports.deleteProductServiceById = async(productId) => {
    const result = await Product.deleteOne({_id: productId});
    return result;
}

exports.bulkDeleteProductService = async(ids) => {
    const result = await Product.deleteMany({_id: ids});
    return result;
}