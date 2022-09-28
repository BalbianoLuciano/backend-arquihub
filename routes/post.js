const express = require("express")
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, getPost} = require("../controllers/post")

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

module.exports = router;
