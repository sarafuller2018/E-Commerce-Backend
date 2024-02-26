const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    // makes it wait until you find all the category data to avoid errors 
    const tagData = await Tag.findAll({
      include: [ Product ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    // allows you to see error in terminal instead of just the number
    console.log(err);
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [ Product ]
    });
    res.status(200).json(tagData);
  } catch (err) {
     // allows you to see error in terminal instead of just the number
     console.log(err);
     res.status(500).json(err);
  }
});

 // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tagData);
  } catch (err) {
     // allows you to see error in terminal instead of just the number
     console.log(err);
     res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;