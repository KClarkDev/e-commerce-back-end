const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags and associated products
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single tag by its ID, along with associated product data
router.get("/:id", async (req, res) => {
  try {
    const tagID = req.params.id;
    const tagData = await Tag.findByPk(tagID, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag
router.post("/", async (req, res) => {
  try {
    // Retrieve data from the request body
    const { tag_name } = req.body;

    // Create a new category using Sequelize
    const newTag = await Tag.create({
      tag_name: tag_name,
    });

    // Respond with the newly created category
    res.status(201).json({
      message: `${newTag.tag_name} tag created successfully!`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
