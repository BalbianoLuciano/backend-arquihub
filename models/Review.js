const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    value: {
      type: Number,
      validator: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.statics.findAllData = function () {
  const joinReviews = this.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "post_id",
        foreignField: "_id",
        as: "post",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);
  return joinReviews;
};

module.exports = mongoose.model("reviews", ReviewSchema);
