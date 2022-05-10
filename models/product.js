const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const db = require("../util/database");

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
    return db.execute(
      "insert into products (title, price, description, imageUrl) values(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static findById(id) {
    return db.execute(`select * from products where products.id= ?`, [id]);
  }

  static fetchAll() {
    return db.execute("Select * from products");
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
