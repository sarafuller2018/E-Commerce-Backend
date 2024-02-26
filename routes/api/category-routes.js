const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    //makes it wait until you find all the category data to avoid errors 
    const categoryData = await Category.findAll({
      include: [ Product ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    //allows you to see error in terminal instead of just the number
    console.log(err);
    res.status(500).json(err);
  }
});

//colon means params
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [ Product ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
     //allows you to see error in terminal instead of just the number
     console.log(err);
     res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData);
  } catch (err) {
     //allows you to see error in terminal instead of just the number
     console.log(err);
     res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});


///help?
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
