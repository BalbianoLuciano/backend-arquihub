const express = require("express")
const router = express.Router();
const { getUpdate, postUpdate, putUpdate} = require("../controllers/update")

//router.get("/:id", getUpdate)
//router.get("/:id", getPost)
router.post("/:id", postUpdate)
router.put("/:id", putUpdate)
//router.delete("/:id", deletePost)

module.exports = router;