const express = require("express");
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject, getProjectById } = require("../controllers/project");

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
//*explota la fuente*