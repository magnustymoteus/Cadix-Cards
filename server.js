import {insertKlant, selectKlant, checkKlant, updateStats, getUsers, getUser, updateKlant} from "./service.js";
import express from "express";
import expressValidator from 'express-validator'; //voor betere back-end form validation in de toekomst
import session from 'express-session';
import bodyParser from 'body-parser';
import open from 'open';
const app = express();
app.use(session({
    secret: "Hsahcuidhuivcnxois8327873*",
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 3600000
    }
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static('view'));
open("http://localhost:3000/home");
app.get("/home", async(req, res)=> {
    if(req.session.loggedIn) {
       updateStats(req.session.klantID).then(function(result) {
            if(result[0]) {
                req.session.naam = result[0].naam;
                req.session.voornaam = result[0].voornaam;
                req.session.isAdmin = result[0].admin;
                res.render("home", {logged: true, name_string: `${req.session.naam} ${req.session.voornaam}`, isAdmin: req.session.isAdmin});
            }
            else {
                req.session.destroy();
                res.redirect('/home');
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    }
    else {
        res.render("home", {logged: false});
    }
});
app.get("/register", async(req, res)=> {
    if(req.session.loggedIn) res.status(403).send("U bent al ingelogd");
    else res.render("register", {msg: ''});
});
app.post("/register/auth", async(req, res)=> {
    let regData = new Array();
    let empty = 0;
    for(let i=0;i<Object.keys(req.body).length;i++) {
        regData.push(Object.values(req.body)[i]);
        if(!regData[i].length) empty = 1;
    }
    if(!empty) {
        checkKlant(regData[11],regData[10]).then(function(result) {
            if(result[0]) {
                res.render('register', {msg: 'Een account met dezelfde email of telefoonnummer bestaat al.'});
            }
            else {
                insertKlant(regData);
                res.render('register', {msg: 'Geregistreerd!'});
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    }
});



app.get("/login", async(req, res)=> {
    if(req.session.loggedIn) res.status(403).send("U bent al ingelogd");
    else res.render("login", {failed: false});
});
app.post("/login/auth", async(req, res)=> {
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;
    let remember = req.body.remember;
    if(email && wachtwoord) {
        selectKlant(email,wachtwoord).then(function(result) {
            if(result) {
                req.session.loggedIn = 1;
                req.session.klantID = result[0].klantID;
                req.session.cookie.expires = (remember)? 7 * 24 * 3600 * 1000: 720000;
                res.redirect("/home");
            }
            else {
                res.render("login", {failed: true});
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    }
    else {
        res.status(400).send("De ingevulde gegevens kloppen niet");
    }
});
app.get('/admin', async(req,res) => {
    if(req.session.isAdmin) {
        updateStats(req.session.klantID).then(function(result) {
            if(result[0]) {
                let adminTypeArg = (result[0].admin==1)?"Moderator":(result[0].admin==2)?"Administrator":"Super Administrator";
                if (result[0].admin) {
                    getUsers().then((result) => {
                        res.render("admin", {logged: true, name_string: `${req.session.naam} ${req.session.voornaam}`, adminType: adminTypeArg, users: result});
                    });
                }
                else {
                    req.session.isAdmin=0;
                    res.redirect('/home');
                }
            }
            else {
                req.session.destroy();
                res.redirect('/home');
            }
            }).catch((err) => setImmediate(() => { throw err; }));
    }
    else res.status(403).send("forbidden");
});
app.get("/admin/user", async(req, res) => {
    if(req.session.isAdmin && req.query.id) {
        updateStats(req.session.klantID).then(function(result) {
            if(result[0].admin) {
                getUser(req.query.id).then((user) => {
                    res.render('user', {logged: true, name_string: `${req.session.naam} ${req.session.voornaam}`, userInfo: user[0]}) 
                });

            }
            else {
                req.session.isAdmin=0;
                res.redirect('/home');
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    }
   else res.status(404).send("not found");
});
app.post('/admin/user', async(req, res) => {
    let data = new Array();
    let empty = 0;
    for(let i=0;i<Object.keys(req.body).length;i++) {
        data.push(Object.values(req.body)[i]);
        if(!data[i].length) empty = 1;
    }
    if(!empty) {
            updateKlant(data, req.query.id);
            res.redirect("/admin");
    }
    else res.status(404).send("Error");
});
app.get("/logout", async(req, res) => {
    req.session.destroy();
    res.redirect("/home");
});
app.get("*", async(req, res)=> {
    res.redirect("/home");
});
app.listen(3000, () => console.log("Running on port 3000"));