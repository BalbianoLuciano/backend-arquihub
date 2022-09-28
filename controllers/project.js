const { projectModel } = require("../models");
const { create } = require("../models/Storage");

const getProjects = async (req, res) => {
  try {
    console.log("hola");
    const allProjects = await projectModel.find({});
    res.status(200).send(allProjects);
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

    const createProject = await projectModel.create({
      title,
      description,
      project_type,
      created_by
    });
    console.log(createProject);
    const {_id} = createProject;
    await users.forEach(async (e) => {
      await projectModel.updateOne({_id:_id},
        { $push: { users: e } },
        { new: true, useFindAndModify: false }
      );
    });
    const newProject = await projectModel.findById(_id)
    res.status(200).send(newProject);
  } catch (error) {
    console.log(error);
  }
};


const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      description,
      users
    } = req.body;
    await projectModel.findOneAndUpdate(id,    { 
      $set: {'description':description,'users':[] }
  });
     await users.forEach(async (e) => {
      await projectModel.updateOne({_id:id},
        { $push: { users: e } },
        { new: true, useFindAndModify: false }
      );
    }); 
    const updatedProject = await projectModel.findById(id)
    res.status(200).send(updatedProject);
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
    const allProjects = await projectModel.aggregate([{
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by_data",
      },
    }])
    const allProjects2 = await projectModel.populate(allProjects, {path: "users"});
    const project = allProjects2.find(e=>e._id==id);
    res.status(200).send(project);
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
