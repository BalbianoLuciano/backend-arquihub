const { projectModel } = require("../models");

const getProjects = async (req, res) => {
  try {
    console.log("hola");
    const allProjects = await projectModel.aggregate([{
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by_data",
      },
    }])
    const allProjects2 = await projectModel.populate(allProjects, {path: "users"});
    res.status(200).send(allProjects2);
  } catch (error) {
    console.log(error);
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      project_type,
      created_by,
      users,
    } = req.body;
    await projectModel.create({
      title,
      description,
      project_type,
      created_by
    });
    users.forEach(async (e) => {
      await projectModel.findOneAndUpdate(
        { title: title },
        { $push: { users: e } },
        { new: true, useFindAndModify: false }
      );
    });
    const newProject = await projectModel.findOne({title:title})
    res.send(newProject);
  } catch (error) {
    console.log(error);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const newProject = body;
    await projectModel.findOneAndUpdate(id, body);
    res.send(newProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectModel.deleteOne({ _id: id });
    res.send("Project deleted");
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const Project = await ProjectModel.findOne({ _id: id });
    res.send(Project);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
};
