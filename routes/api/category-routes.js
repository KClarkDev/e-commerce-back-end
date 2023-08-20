const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET all categories and associated products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by its ID value, along with its associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryID = req.params.id;
    const categoryData = await Category.findByPk(categoryID, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST (create) a new category
router.post("/", async (req, res) => {
  try {
    // Retrieve data from the request body
    const { category_name } = req.body;

    // Create a new category using Sequelize
    const newCategory = await Category.create({
      category_name: category_name,
    });

    // Respond with the newly created category
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (update} a category by its ID value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its ID value
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
