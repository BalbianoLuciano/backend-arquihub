const { projectModel, updateModel, downloadModel, usersModel } = require("../models");

const { create } = require("../models/Storage");
const emailer = require("../config/emailer")
const getProjects = async (req, res) => {
  try {
    const allProjects = await projectModel.aggregate([
      {
        $lookup: {
          from: "storages",
          localField: "pdf_file",
          foreignField: "_id",
          as: "pdf_initial_file",
        },
      }
    ])
    const projectsWPopulate = await projectModel.populate(allProjects,{path:"created_by"})
    res.status(200).send(projectsWPopulate);
  } catch (error) {
    console.log(error);
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      created_by,
      users,
      project_file,
      pdf_file,
      visibility
    } = req.body;

    const createProject = await projectModel.create({
      title,
      description,
      created_by,
      project_file,
      pdf_file,
      visibility
    });


     const projectCreator = await usersModel.findOne({ "_id": created_by })
     const creator = projectCreator.email
     const mappedUsers = users.map((u)=> u.value)
     const projectAuthors = await usersModel.find().where('_id').in(mappedUsers).exec();
     const authorsEmails = projectAuthors.map((author) => author.email)
     const emails = [creator, authorsEmails]


    const {_id} = createProject;
    await projectModel.updateOne({_id:_id},
      { $push: { users: created_by } },
      { new: true, useFindAndModify: false }
    );
    await usersModel.updateOne({_id:created_by},
      { $push: { projects: _id } },
      { new: true, useFindAndModify: false }
    );
    await users.forEach(async (e) => {
      await projectModel.updateOne({_id:_id},
        { $push: { users: e.value } },
        { new: true, useFindAndModify: false }
      );
      await usersModel.updateOne({_id:e.value},
        { $push: { projects: _id } },
        { new: true, useFindAndModify: false }
      );
    });

    const newProject = await projectModel.findById(_id)
    emailer.sendMail(emails.flat(1), "Project Created", `<div><p>Project created \n here is your <a href = https://arquihub.vercel.app/projectDetail/${_id}> link </a></p></div`)
    console.log(newProject);

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
    } = req.body;
    const project = await projectModel.findById(id)
    console.log(project);
    await projectModel.findOneAndUpdate(id,    { 
      $set: {'description':description}
  });


  // const created_by = project.created_by 
  // const projectCreator = await usersModel.findOne({ "_id": created_by })
  // const creator = projectCreator.email
  
  // const mappedUsers = users.map((u)=> u.value)
  // const projectAuthors = await usersModel.find().where('_id').in(mappedUsers).exec();
  // const authorsEmails = projectAuthors.map((author) => author.email)
  // const emails = [creator, authorsEmails]

    const updatedProject = await projectModel.findById(id)
    // console.log(updatedProject);
    //  emailer.sendMail(emails.flat(1), "Project Updated", `<div><p>Project Updated
    //  </p></div`)
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
    const allProjects = await projectModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by_data",
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "project_file",
        foreignField: "_id",
        as: "initial_file",
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "pdf_file",
        foreignField: "_id",
        as: "pdf_initial_file",
      },
    }
    ])
    const updates = await updateModel.findAllData({})
    const downloads = await downloadModel.find({project_id:id}).populate("user_id").populate("update_id")
/*     const updates2  = await updateModel.populate(updates, {path: "users"})
    console.log(updates2.storage) */
    const allProjects2 = await projectModel.populate(allProjects, {path: "users"});
    const project = allProjects2.find(e=>e._id==id);
    const update = updates.filter(e=>e.project_id==id);
    res.status(200).send({...project,updates:update,downloads});
  } catch (err) {
    res.status(404).send({err: err.message});
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
};
