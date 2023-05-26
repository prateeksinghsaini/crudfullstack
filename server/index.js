import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mysql from "mysql2"

const app = express()

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)"
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?"
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params
    const { name, email, contact } = req.body
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    console.log(sqlUpdate);
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})


app.listen(5000, () => {
    console.log("Listening on ---> http://localhost:5000")
})