const { postModel,reviewModel, usersModel} = require("../models")
const {verifyToken}= require("../middlewares/auth.jwt")

const getPosts = async (req, res) => {
    try {
        const allPosts = await postModel.find({})
        res.send(allPosts)

    } catch (error) {
        res.status(400).send("No posts found")
    }
}

const createPost = async (req, res) => {
    try {
        const { title,
            description,
            visibility,
            created_by,
            project_type,
            mts2,
            project_id,
            rooms,
            year,
            bathrooms,
            image,
            authors,
            additional_data,
            rating
        } = req.body;

        if (!title || !description || !project_type) {
            return res.status(400).send("Missing required parameters")
        }  

        const newPost = {
            title,
            description,
            visibility,
            created_by,
            project_type,
            project_id,
            mts2,
            rooms,
            image,
            year,
            bathrooms,
            additional_data,
            rating
        }
        console.log(newPost)
        const createPost = await postModel.create(newPost)

        const {id} = createPost;
         authors.forEach(async (e) => {
            console.log(e)
            await postModel.updateOne({_id:id},
              { $push: { authors: e.value } },
              { new: true, useFindAndModify: false }
            );
            await usersModel.updateOne({_id:e.value},
                { $push: { posts: id } },
                { new: true, useFindAndModify: false }
              );
          });
          const newPostF = await postModel.findById(id)

          res.status(200).send(newPostF);
    } catch (err) {
        res.status(400).send({err:err.message})
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            created_by,
            visibility,
            project_id,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            authors,
            additional_data,
            rating } = req.body;

        const updatePost = {
            title,
            description,
            project_id,
            project_type,
            mts2,
            rooms,
            year,
            bathrooms,
            additional_data,
            rating
        }

        await postModel.findOneAndUpdate(id, updatePost)
        res.send(updatePost)

    } catch (error) {
        res.status(400).send("Cant update this post")
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.deleteOne({ _id: id })
        res.send("Post deleted")
    } catch (err) {
        res.status(400).send({err:err.message})
    }
}


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const allPosts = await postModel.aggregate([
            {
              $lookup: {
                from: "projects",
                localField: "project_id",
                foreignField: "_id",
                as: "project",
              },
            },
            {
                $lookup: {
                  from: "users",
                  localField: "created_by",
                  foreignField: "_id",
                  as: "created_by_data",
                },
              },
          ]);
          const post = allPosts.find(e=>e._id==id); 
             const postReviews= await reviewModel.aggregate([{
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user_data",
                },
              },]);
              const reviews = postReviews.filter(e=>e.post_id==id)
            const userPost = await postModel.populate(post, {path:"authors"}); 
           const getPost ={...userPost,reviews:reviews} 
            res.status(200).send(getPost);
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getPosts, createPost, updatePost, deletePost, getPost } 
