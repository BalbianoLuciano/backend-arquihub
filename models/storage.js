const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// StorageSchema.statics.findAllData = function(){
//   const joinStorages = this.aggregate([
//     {
//         $lookup: {
//           from: "updates",
//           localField:"updates_id",
//           foreignField: "_id",
//           as: "updates"
//         }
//     }
//   ])
//   return joinStorages
// }

module.exports = mongoose.model("storages", StorageSchema);
