const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const writeFile = (filePath, contentToWrite, errFn) => {
  fs.writeFile(filePath, JSON.stringify(contentToWrite), errFn);
};

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        writeFile(p, updatedProducts, (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.floor(Math.random() + Date.now() / 1000).toString();
        products.push(this);
        writeFile(p, products, (err) => {
          console.log(err);
        });
      }
    });
  }

  static findById(id, cb2) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb2(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const filteredProducts = products.filter((p) => p.id !== id);
      writeFile(p, filteredProducts, (err) => {
        Cart.deleteProduct(id, product.price);
      });
    });
  }
};
