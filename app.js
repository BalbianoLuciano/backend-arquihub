require("dotenv").config()
const express = require('express')
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000
const dbConnect = require("./config/mongo")

app.use(cors())

//LLamando rutas

app.use("/api", require("./routes"))
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}!`))

dbConnect()