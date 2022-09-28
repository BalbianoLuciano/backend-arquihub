const express = require("express")
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getUser }= require("../controllers/user")

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router;