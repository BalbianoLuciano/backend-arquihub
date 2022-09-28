const mongoose = require("mongoose")


const ProjectSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
    timestamps: true
})

ProjectSchema.statics.findAllData = function () {
    const joinReviews = this.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by_data",
        },
      },
    ]);
    return joinReviews;
  };
module.exports = mongoose.model("projects", ProjectSchema)