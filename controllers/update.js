const { updateModel } = require("../models")
const { projectModel } = require("../models")

const getUpdates = async (req, res) => {
    try {
        const allUpdate = await updateModel.find({})
        res.send(allUpdate)

    } catch (error) {
        console.log(error)
    }
}

const postUpdate = async (req, res) => { //llegan title, description por body 
    try {  
        const { id } = req.params;      
        const { body } = req;
        //await projectModel.findById(id)
        const newUpdate = await updateModel.create(body)
        res.send(newUpdate)

    } catch (error) {
        console.log(error)
    }
}

const putUpdate = async (req, res) => { //llegan projectId por params y title y description por body
    try {
        const { id } = req.params;
        const { title, comments } = req.body;
        //console.log(body)
        await updateModel.findByIdAndUpdate(id, {title, comments})
        res.send("File Update")

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


module.exports = { getUpdates, postUpdate, putUpdate }