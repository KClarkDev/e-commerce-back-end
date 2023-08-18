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

Category.hasMany(Product);

Product.belongsToMany(Tag, {
  through: {
    model: product_tag,
  },
  foreignKey: "tag_id",
});

Tag.belongsToMany(Product, {
  through: {
    model: product_tag,
  },
  foreignKey: "product_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
