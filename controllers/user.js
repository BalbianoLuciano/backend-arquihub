const { usersModel } = require("../models");
const emailer = require("../config/emailer")
const bannedTemplate = require("../templates/banned")


const getUsers = async (req, res) => {
  try {
    const allUsers = await usersModel.find({});
    res.send(allUsers);
  } catch (error) {
    res.status(400).send("Cant find users");
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      favourites,
      status,
      job,
      description,
      page, 
      location,
      premium
    } = req.body;
    if (!name || !lastname || !nickname || !email || !password) {
      return res.status(400).send("Missing required parameters");
    }
    // console.log(name);
    const newUser = {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      favourites,
      status,
      job,
      description,
      page, 
      location,
      premium:false
    };
    // console.log(name);
    await usersModel.create(newUser);
    res.send(newUser);
  } catch (error) {
    res.status(400).send("Failed to create user", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      projects,
      favourites,
      status,
      job,
      description,
      page, 
      location,
      premium,
      avatar
    } = req.body;
    // console.log(status)
    const editedUser = {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      projects,
      favourites,
      status,
      job,
      description,
      page, 
      location,
      premium,
      avatar
    };

    if(editedUser.status === "active"){
      emailer.sendMail(editedUser.email , `Your account has been reestablished!`, 
      `${editedUser.name} Your account is now activated from the ban, welcome back!`)
      await usersModel.updateOne({_id:id}, editedUser);
      res.send(editedUser);
    }

    if(editedUser.status === "banned"){
      emailer.sendMail(editedUser.email, "Banned account" , bannedTemplate)
      await usersModel.updateOne({_id:id}, editedUser);
      res.send(editedUser);
    }

    if(editedUser.status === "inactive"){
      emailer.sendMail(editedUser.email, editedUser.name ? `${editedUser.name}, Welcome to Arquihub!` : `${newUser.nickname}, Your account is now inactive`, 
      `${editedUser.name} Your account is now off, comeback anytime!`)
      await usersModel.updateOne({_id:id}, editedUser);
      res.send(editedUser);
    }


  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.deleteOne({ _id: id });
    res.send("user deleted");
  } catch (error) {
    res.status(400).send("Failed to delete user");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const allUsers = await usersModel.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "created_by",
          as: "projects_created",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "user_id",
          as: "payments",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "user_id",
          as: "reviews",
        },
      },
    ]);

    const usersProjects = await usersModel.populate(allUsers, {
      path: "projects",
    });
    const usersPosts = await usersModel.populate(usersProjects, {
      path: "posts",
    });
    const usersFavourites = await usersModel.populate(usersPosts, {
      path: "favourites",
    });
    const getUser = usersFavourites.find((e) => e._id == id);
    res.status(200).send(getUser);
  } catch (error) {
    res.status(400).send("Cant get user");
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };
