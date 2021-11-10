import {insertKlant, selectKlant, checkKlant} from "./service.js";
import express from "express";
import expressValidator from 'express-validator'; //voor toekomstige back-end form validation
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
        res.render("home", {root: './view', logged: true, name_string: `${req.session.naam} ${req.session.voornaam}`});
    }
    else {
        res.render("home", {root: './view', logged: false});
    }
});
app.get("/register", async(req, res)=> {
    if(req.session.loggedIn) res.status(403).send("U bent al ingelogd");
    else res.render("register", {root: './view', msg: ''});
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
    else res.render("login", {root:"./view", failed: false});
});
app.post("/login/auth", async(req, res)=> {
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;
    let remember = req.body.remember;
    if(email && wachtwoord) {
        selectKlant(email,wachtwoord).then(function(result) {
            if(result) {
                req.session.loggedIn = 1;
                req.session.naam = result[0].naam;
                req.session.voornaam = result[0].voornaam;
                req.session.cookie.expires = (remember)? 7 * 24 * 3600 * 1000: 720000;
                res.redirect("/home");
            }
            else {
                res.render("login", {root:"./view", failed: true});
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    }
    else {
        res.status(400).send("De ingevulde gegevens kloppen niet");
    }
});
app.get("/logout", async(req, res) => {
    req.session.destroy();
    res.redirect("/home");
});
app.get("*", async(req, res)=> {
    res.redirect("/home");
});

app.listen(3000, () => console.log("Running on port 3000"));