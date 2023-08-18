// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// STUDY NOTE: The "through" option is specifically used in the context of defining a many-to-many association with an intermediary or junction table. This intermediary table holds the relationships between the associated records.

// Set up associations between tables

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  },
  foreignKey: "tag_id",
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  },
  foreignKey: "product_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
