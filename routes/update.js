const express = require("express")
const router = express.Router();
const { getUpdates, createUpdate, putUpdate} = require("../controllers/update")

router.get("/", getUpdates)
router.post("/", createUpdate)
router.put("/:id", putUpdate)


module.exports = router;