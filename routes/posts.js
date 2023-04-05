const express = require("express");

const router = express.Router();

const posts = require("../controllers/posts");

router.route("/").post(posts.postBlog).get(posts.getPosts);
router.route("/:id").get(posts.getPost).delete(posts.deletePost);

module.exports = router;
