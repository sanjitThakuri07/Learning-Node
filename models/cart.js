const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "carts.json"
);

const writeFile = (filePath, contentToWrite, errFn) => {
  fs.writeFile(filePath, JSON.stringify(contentToWrite), errFn);
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //   fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart and find the existing cart items
      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //     Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      writeFile(p, cart, (err) => {
        console.log(err);
      });
      // fs.writeFile(p, JSON.stringify(cart), (err) => {
      //   console.log(err);
      // });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cb(JSON.parse(fileContent));
        return;
      }
      cb(null);
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        return;
      }

      let updatedCart = { ...JSON.parse(filecontent) };
      const productToRemove = updatedCart.products.find(
        (product) => product.id === id
      );

      if (!productToRemove) return;
      const productToRemoveQty = productToRemove.qty;
      // remove from the cart
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productToRemoveQty;
      console.log(updatedCart);
      writeFile(p, updatedCart, (err) => {
        console.log(err);
      });
    });
  }
};
