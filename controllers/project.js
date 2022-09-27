const { projectModel } = require("../models/index");

const getProjects = async (req, res) => {
  try {
    const allProjects = await projectModel.find({});
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(400).json(error);
  }
};
const createProject = async (req, res) => {
  try {
    const { body } = req;
    const newProject = await projectModel.create(body);
    res.status(200).send(newProject);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const changeProject = body;
    await projectModel.findOneAndUpdate(id, body);
    res.status(200).send(changeProject);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectModel.deleteOne({ _id: id });
    res.status(200).send("Project deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const searchProject = await projectModel.findOne({ _id: id });
    res.status(200).send(searchProject);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject, getProjectById };
