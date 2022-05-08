const Product = require("../models/product");

exports.getAddproduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    activeAddProduct: true,
    path: "/admin.add-product",
    productCSS: true,
    formsCSS: true,
  });
  // next();
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  /* Logging the products array to the console. */
  // console.log(adminData.products);

  const products = Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      hasProducts: products.length > 0,
      path: "/",
      activeShop: true,
      productCSS: true,
    });
  });
};
