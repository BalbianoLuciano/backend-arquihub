const { usersModel } = require("../models");

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
    } = req.body;
    if (!name || !lastname || !nickname || !email || !password) {
      return res.status(400).send("Missing required parameters");
    }
    console.log(name);
    const newUser = {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      status,
    };
    console.log(name);
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
    } = req.body;

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
    };

    await usersModel.findOneAndUpdate(id, editedUser);
    res.send(editedUser);
  } catch (error) {
    res.status(400).send("Failed to update user");
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
      path: "favourites_post",
    });
    const getUser = usersFavourites.find((e) => e._id == id);
    res.status(200).send(getUser);
  } catch (error) {
    res.status(400).send("Cant get user");
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };
