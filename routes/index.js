const router = require('express').Router();
const apiRoutes = require('./api'); // requires api folder

//have to use this to get access to the api folders/routes
router.use('/api', apiRoutes);

//sends this message if you do not put in a correct route, wildcard route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;

//routes goes here first because there was no specific route in the server