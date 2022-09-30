require("dotenv").config()
const express = require('express')
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3001
const dbConnect = require("./config/mongo")
const bodyParser = require('body-parser')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

app.use(cors());



///auth0




app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.static("storage"))
app.use(morgan('dev'));





const jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//LLamando rutas

app.use("/api", require("./routes"))
app.use(express.json())
app.use(jsonParser)
app.use(urlencodedParser)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}!`))

dbConnect()