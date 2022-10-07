const { reviewModel } = require("../models")

const getReviews = async (req, res) => {
    try {
        const allReviews = await reviewModel.findAllData({})
        res.status(200).send(allReviews)

    } catch (error) {
        res.status(400).send("Cant find reviews")
    }
}

const createReview = async (req, res) => {
    try {
        const { value, comment, post_id, user_id} = req.body;
        if(!value, !comment, !post_id,!user_id){
            return res.status(400).send("Missing required parameters")
        }
        const newReview = {value, comment, post_id, user_id} 
        await reviewModel.create(newReview)
        res.status(200).send(newReview)

    } catch (error) {
        res.status(400).send("Cant post this review")
    }
}

const updateReview = async (req, res) => {
    try {
      
        const { id } = req.params;
        const { value, comment, post_id} = req.body;
        const updateReview = { value, comment, post_id}
        await reviewModel.findOneAndUpdate(id,  updateReview )
        res.status(200).send(updateReview);

    } catch (error) {
        res.status(400).send("Cant update this review")
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
       await reviewModel.deleteOne({_id:id})
        res.status(200).send("Review deleted")
    } catch (error) {
        res.status(400).send("Failed to delete this review")
    }
}


const getReview = async (req, res) => {
    try {
        const { id, mood } = req.params;

        if(id.length < 24){
            return res.status(400).send("No searchable id")
        }
        if(mood=="post"){
            const reviews= await reviewModel.find({}).populate("user_id")
            const review = reviews.filter(e=>e.post_id==id); 
            return res.status(200).json(review)
        }
        if(mood==="user"){
        const reviews= await reviewModel.find({user_id:id}).populate("post_id");
        const review = reviews.filter(e=>e.post_id==id); 
        return res.status(200).send(review)}

        const reviews= await reviewModel.find({}).populate("post_id").populate("user_id");
        const review = reviews.filter(e=>e._id==id); 
        return res.status(200).send(review)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = { getReviews, createReview, updateReview, deleteReview, getReview }