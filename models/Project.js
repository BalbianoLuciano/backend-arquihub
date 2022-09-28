const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    visibility: {
      type: Boolean,
    },
    created_by: {
      type: String,
    },
    project_file: {
      type: String,
    },
    project_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", ProjectSchema);
