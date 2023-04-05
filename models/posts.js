const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "News must have a title"],
  },
  content: {
    type: Object,
    required: [true, "News must have a detail"],
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "News must have a category"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cloudinaryId: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
