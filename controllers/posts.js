const Blog = require("../models/posts");
const cloudinary = require("../utils/cloudinary");

exports.postBlog = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, content, category } = req.body;

    const newBlogPost = new Blog({
      title,
      content,
      category,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newBlogPost.save();

    res.status(201).json({
      status: "successful",
      newBlogPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Blog.find();

    res.status(200).json({
      status: "successful",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "successful",
      post,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await cloudinary.uploader.destroy(blog.cloudinaryId);
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "successful",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
