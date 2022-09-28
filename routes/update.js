const express = require("express")
const router = express.Router();
const { getUpdates, postUpdate, putUpdate} = require("../controllers/update")

router.get("/", getUpdates)
//router.get("/:id", getPost)
router.post("/", postUpdate)
router.put("/:id", putUpdate)
//router.delete("/:id", deletePost)

module.exports = router;