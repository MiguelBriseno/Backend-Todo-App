const db = require('../database')
const mysql = require('mysql')
const express = require('express')
const router = express.Router()

const mySqlConnect = mysql.createConnection(db.mysqlCon)
mySqlConnect.connect()
setInterval(() => {
    mySqlConnect.query('SELECT 1')
}, 10000);

// ENDPOINT PARA AÑADIR TAREA A LA BASE DE DATOS
router.post('/addTask', (req, res) => {
    let data = new Date()
    let vls = {
        task: req.body.task,
        date: data
    }
    let query = `INSERT INTO tasks SET ?`
    mySqlConnect.query(query, vls, (err, rows) => {
        if(err){
            console.log(err)
            res.json({status: false, error: "Server error 0123"})
        }
        else{
            res.json({status: true})
        }
    })
})

// ENDPOINT PARA OBTENER LAS TAREAS DE LA BASE DE DATOS
router.post('/getTasks', (req, res) => {
    let query = `SELECT * FROM tasks ORDER BY id ASC`
    mySqlConnect.query(query, (err, rows) => {
        if(err){
            console.log(err)
            res.json({status: false, error: "Server error 1234"})
        }
        else{
            res.json({status: true, data: rows})
        }
    })
})

module.exports = router