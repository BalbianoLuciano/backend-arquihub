const express = require("express");
const { createStorage, getStorages, getStorageById } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware  = require("../utils/handleStorage")

router.post("/", uploadMiddleware.single("myFile"), createStorage)
router.get("/", getStorages);
router.get("/:id", getStorageById);


module.exports = router;