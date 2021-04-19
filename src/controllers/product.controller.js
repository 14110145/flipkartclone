const Product = require("../models/product.model");
const shortId = require("shortid");
const multer = require("multer");
const slugify = require("slugify");
const Category = require("../models/category.model");

exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) return res.status(202).json({ result });
    });
  } else {
    return res.status(400).json({ message: "Param is required" });
  }
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (category.type) {
            if (products.length > 0) {
              return res.status(200).json({
                products,
                priceRange: {
                  under500: 500,
                  under1k: 1000,
                  under2k: 2000,
                  under3k: 3000,
                },
                productsByPrice: {
                  under500: products.filter((product) => product.price <= 500),
                  under1k: products.filter((product) => product.price > 500 && product.price <= 1000),
                  under2k: products.filter((product) => product.price > 1000 && product.price <= 2000),
                  under3k: products.filter((product) => product.price > 2000 && product.price <= 3000),
                },
              });
            }
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) return res.status(200).json({ product });
    });
  } else {
    return res.status(400).json({ error: "Params is required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
