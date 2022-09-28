const { storageModel } = require("../models/index");
const PUBLIC_URL = process.env.PUBLIC_URL

const getStorages = async (req, res) => {
  try {
    const allStorages = await storageModel.find({});
    res.status(200).json(allStorages);
  } catch (error) {
    res.status(400).json(error);
  }
};
const createStorage = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const newStorage = await storageModel.create(fileData);
    res.status(200).send({newStorage});
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateStorage = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const changeStorage = body;
    await storageModel.findOneAndUpdate(id, body);
    res.status(200).send(changeStorage);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteStorage = async (req, res) => {
  try {
    const { id } = req.params;
    await storageModel.deleteOne({ _id: id });
    res.status(200).send("Storage deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getStorageById = async (req, res) => {
  try {
    const { id } = req.params;
    const searchStorage = await storageModel.findOne({ _id: id });
    res.status(200).send(searchStorage);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getStorages, createStorage, updateStorage, deleteStorage, getStorageById };
