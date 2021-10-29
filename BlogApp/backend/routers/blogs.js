const express = require('express');
const router = express.Router();
const uploads = require('../middleware/multer');
const {
  createBlogs,
  getAllBlogs,
  getSingleBlogs,
  getBlogsByCategory,
  searchPosts,
} = require('../controllers/blogs');
const { validator, result, validateFile } = require('../middleware/validator');

router.post(
  '/create',
  uploads.single('thumbnail'),
  validator,
  result,
  validateFile,
  createBlogs
);

router.get('/blogs', getAllBlogs);
router.get('/blogs/single/:id', getSingleBlogs);
router.get('/blogs/:category/:qty?', getBlogsByCategory);
router.post('/blogs/search/:query', searchPosts);

module.exports = router;