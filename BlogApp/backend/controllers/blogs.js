const Blogs = require('../blogs/blogs');
const imageProcess = require('../util/imageProcess');

const blogs = new Blogs();

const createBlogs = async (req, res) => {
  const id = blogs.createId();

  try {
    const imageName = await imageProcess(req, id);
    blogs.create(req.body, id, imageName); // http://locahost:3500/image-name
    res.json({ success: true, message: 'Blog created successfully.' });
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error!',
    });
    console.log('Error while creating blogs', error.message);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const data = await blogs.getAll();
    res.json({ success: true, blogs: data });
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error!',
    });
    console.log('Error while getting all blogs', error.message);
  }
};

const getSingleBlogs = async (req, res) => {
  try {
    const data = await blogs.getSingle(req.params.id);
    if (!data) {
      return res.json({
        success: false,
        message: 'Blog not found!',
      });
    }

    res.json({
      success: true,
      blogs: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error!',
    });
    console.log('Error while getting single blog', error.message);
  }
};

const getBlogsByCategory = async (req, res) => {
  try {
    const { category, qty } = req.params;
    const data = await blogs.getByCategory(category);
    if (!data) {
      return res.json({ success: false, message: 'Blogs not found!' });
    }

    if (qty) {
      return res.json({ success: true, blogs: [...data].splice(0, qty) });
    }

    res.json({ success: true, blogs: data });
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error!',
    });
    console.log('Error while getting blogs by category!', error.message);
  }
};

const searchPosts = async (req, res) => {
  try {
    const { query } = req.params;
    if (query.trim()) {
      const response = await blogs.searchPosts(req.params.query);
      if (response.length === 0)
        return res.json({ success: false, message: 'No match found..' });
      res.json({ success: true, blogs: response });
    }

    res.json({ success: false, message: 'No match found..' });
  }
  catch (error) {
    
    //res.json({ success: false, message: 'Something went wrong, server error!' });
      
    
  }
};

module.exports = {
  createBlogs,
  getAllBlogs,
  getSingleBlogs,
  getBlogsByCategory,
  searchPosts,
};