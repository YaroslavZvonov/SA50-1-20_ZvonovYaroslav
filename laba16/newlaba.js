const mysql = require("mysql");

const express = require("express");
const app = express();
app.set("view engine", "hbs");
const pool = mysql.createPool({
    host: "localhost",
    user: "zvonov",
    database: "laba4",
    password: "user@123",
    connectionLimit: 3
});

// connection.query("SELECT * FROM speciality",
//     (err, results, fields) => {
//         console.log(err);
//         console.log(results);
//         console.log(fields);
//     });

app.get("/", function (req, res) {
    pool.query("SELECT * FROM speciality inner join studgrup ON studgrup.special = speciality.kod", function (err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            speciality: data 
        });
    });
});

app.get("/stud", function (req, res) {
    pool.query("SELECT * FROM studenty", function (err, data) {
        if (err) return console.log(err);
        res.render("stud.hbs", {
            studenty: data 
        });
    });
});

app.get("/create", function (req, res) {
    pool.query("Select * FROM studgrup",
        function (err, data) {
        if (err) return console.log(err);
        res.render("create.hbs", {
            speciality: data
        });
    }); 
}); 

const urlencodedParser = express.urlencoded({
    extended: false
});

app.post("/create", urlencodedParser, function (req, res)
{
if (!req.body) return res.sendStatus(400);
const name= req.body.name;
const familia = req.body.familia;
const surname = req.body.surname;
const gruppa = req.body.gruppa;
const birth = req.body.birth;
   pool.query("INSERT INTO studenty (name, familia, surname, gruppa, birth) VALUES (?,?,?,?,?)", [name, familia, surname, gruppa, birth], function (err, spec) {
   if (err) return console.log(err);
        res.redirect("/");
   });
 });


app.listen(3000, function () {
    console.log("Сервер ожидает подключения");
});