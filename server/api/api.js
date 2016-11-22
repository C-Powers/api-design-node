var router = require('express').Router();

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

var userRouter = require('./user/userRoutes');
var categoryRouter = require('./category/categoryRoutes');
var postRouter = require('./post/postRoutes');

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;
