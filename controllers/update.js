const { updateModel } = require("../models")
const { projectModel } = require("../models")

const getUpdate = async (req, res) => {
    try {
        const { id }= req.params;
        const idProject = await projectModel.findById(id)        
        const allUpdate = await updateModel.find({})
        res.send(idProject)

    } catch (error) {
        console.log(error)
    }
}

const postUpdate = async (req, res) => { //llegan title, description por body 
    try {  
        const { id } = req.params;      
        const { body } = req;
        const idProject = await projectModel.findById(id)
        const newUpdate = await updateModel.create(body)
        res.send(newUpdate)

    } catch (error) {
        console.log(error)
    }
}

const putUpdate = async (req, res) => { //llegan projectId por params y title y description por body
    try {
        const { id } = req.params;
        const { body } = req;
        console.log(body)
        const newUpdate = body
        await updateModel.findOneAndUpdate(id,  body )
        res.send(newUpdate)

    } catch (error) {
        console.log(error)
    }
}

// const deletePost = async (req, res) => {
//     try {
//         const { id } = req.params;
//        await postModel.deleteOne({_id:id})
//         res.send("Post deleted")
//     } catch (error) {
//         console.log(error)
//     }
// }


// const getPost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const post = await postModel.findOne({_id:id})
//         res.send(post)
//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = { getUpdate, postUpdate, putUpdate }