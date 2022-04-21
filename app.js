const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./database')
const mysql = require('mysql')

const mySqlConnect = mysql.createConnection(db.mysqlCon)
mySqlConnect.connect()

setInterval(() => {
    mySqlConnect.query('SELECT 1')
}, 10000);

const app = express()

const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const tasks = require('./routes/tasks')
app.use('/tasks', tasks)

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})