const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;

  // Update the brand
  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({_id: data.ids}, data.data, {
  //     runValidators: true
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, { $set: product.data })
    );
  });
  const result = await Promise.all(products);

  return result;
};

exports.deleteProductServiceById = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
