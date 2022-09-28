const { reviewModel } = require("../models")

const getReviews = async (req, res) => {
    try {
        const allReviews = await reviewModel.findAllData({})
        res.status(200).send(allReviews)

    } catch (error) {
        console.log(error)
    }
}

const createReview = async (req, res) => {
    try {
        const { body } = req;
        const newReview = await reviewModel.create(body)
        res.status(200).send(newReview)

    } catch (error) {
        console.log(error)
    }
}

const updateReview = async (req, res) => {
    try {
      
        const { id } = req.params;
        const { body } = req;
        console.log(body)
        const newReview = body
        await reviewModel.findOneAndUpdate(id,  body )
        res.status(200).send(newReview);

    } catch (error) {
        console.log(error)
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
       await reviewModel.deleteOne({_id:id})
        res.status(200).send("Review deleted")
    } catch (error) {
        console.log(error)
    }
}


const getReview = async (req, res) => {
    try {
        const { id } = req.params;
        const Review = await reviewModel.findOne({_id:id})
        res.status(200).send(Review)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getReviews, createReview, updateReview, deleteReview, getReview }