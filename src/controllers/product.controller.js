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
                productsByPrice: {
                  under500: products.filter((product) => product.price <= 500),
                  under1k: products.filter((product) => product.price > 500 && product.price <= 1000),
                  under2k: products.filter((product) => product.price > 1000 && product.price <= 2000),
                },
              });
            }
          } else if (error) {
            return res.status(400).json({ error });
          } else {
            return res.status(200).json({ products });
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
