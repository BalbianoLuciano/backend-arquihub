const { updateModel } = require("../models")


const getUpdates = async (req, res) => {
    try {
        const allUpdate = await updateModel.findAllData({})
        res.send(allUpdate)

    } catch (error) {
        res.status(400).send("No updates found")
    }
}

const createUpdate = async (req, res) => { //llegan title, description por body 
    try { 
        const { title, comments, project_id, user_id, storage_id } = req.body;

        if(!title || !comments || !project_id || !user_id || !storage_id){
            res.status(400).send("Missing fields to complete")
        } else {
        const newUpdate = { title, comments, project_id, user_id, storage_id}
        await updateModel.create(newUpdate)
        res.status(200).send(newUpdate)
        }
    } catch (error) {
        res.status(400).send("Can't post this update")
    }
}

const putUpdate = async (req, res) => { 
    try {
        const { id } = req.params;
        const { comments } = req.body;

        if(!comments){
            res.status(400).send("A comment is needed")
        } else {
        const update = { comments }
        await updateModel.findByIdAndUpdate(id, update)
        res.send(update)
        }
    } catch (error) {
        res.status(400).send("Can't update")
    }
}



module.exports = { getUpdates, createUpdate, putUpdate }

/*
project
{
"_id": "633384d2925d0057f3f1745e",
        "title": "Nisman",
        "description": "adios giles",
        "created_by": "6333a1b9118df73d073826f3",
        "project_file": "aquí va el archivo",
        "project_type": "casa",
        "createdAt": "2022-09-27T23:18:42.126Z",
        "updatedAt": "2022-09-28T23:24:32.647Z",
        "__v": 0,
        "users": [],
        "created_by_data": []
}

user 
{       
"_id": "6334e691a6d62b6d071ec3e0",
        "name": "Tom",
        "lastname": "Menem",
        "nickname": "Jvmpers",
        "email": "peronista@kk.com",
        "password": "asdasdasd",
        "type": "user",
        "projects": [],
        "posts": [],
        "favourites": [],
        "status": "active",
        "createdAt": "2022-09-29T00:28:01.244Z",
        "updatedAt": "2022-09-29T00:28:01.244Z",
        "__v": 0
    },

storage
{
    "_id": "633482bc35d8091929fc3244",
    "filename": "file-1664385724132.dwg",
    "createdAt": "2022-09-28T17:22:04.145Z",
    "updatedAt": "2022-09-28T17:22:04.145Z",
    "__v": 0
},
*/