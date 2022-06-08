const mysql = require("mysql");

const sendmailer = require('./mail');
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

app.get("/", function (req, res) {
    pool.query("SELECT * FROM speciality", function (err, data) {
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

app.get("/scpec", function (req, res) {
    pool.query("SELECT * FROM speciality", function (err, data) {
        if (err) return console.log(err);
        res.render("scpec.hbs", {
            speciality: data 
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
const message = {
    from: "<shawn.king86@ethereal.email>",
    to: "sa50_ia.a.zvonov@mpt.ru",
    subject: "Оповіщення",
    text: "Додан новий студент.",
    };
sendmailer(message)
   pool.query("INSERT INTO studenty (name, familia, surname, gruppa, birth) VALUES (?,?,?,?,?)", [name, familia, surname, gruppa, birth], function (err, spec) {
   if (err) return console.log(err);
        res.redirect("/");
   });
 });

 app.post("/scpec", urlencodedParser, function (req, res)
 {
 if (!req.body) return res.sendStatus(400);
 const nomer= req.body.nomer;
    pool.query("INSERT INTO speciality (nomer) VALUES (?)", [nomer], function (err, spec) {
    if (err) return console.log(err);
         res.redirect("/scpec");
    });
  });

app.listen(3000, function () {
    console.log("Сервер очікує підключення");
});



