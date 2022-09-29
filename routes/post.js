const express = require("express")
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, getPost} = require("../controllers/post")
const {verifyToken,  isAdmin, isSuperAdmin, isMember}= require("../middlewares")

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/",verifyToken, createPost)
router.put("/:id",verifyToken, updatePost)
router.delete("/:id",[verifyToken, isAdmin], deletePost)

module.exports = router;
