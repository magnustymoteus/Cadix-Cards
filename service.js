import * as mysql from 'mysql';
import * as bcrypt from 'bcrypt';
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dbcadixcards"
});
var hashSalt = (string, rounds) => {
    return new Promise(function(resolve, rej) {
        bcrypt.hash(string, rounds, function(err,hash) {
            if(err) return rej(err);
            resolve(hash);
        });
    });
}
var compareHash = (p, hash) => {
    return new Promise(function(resolve, rej) {
        bcrypt.compare(p, hash, function(err, result) {
            if(err) return rej(err);
            resolve(result);
        });
    });
}
var selectHash = (e) => {
    return new Promise(function(resolve, rej) {
        con.query("SELECT wachtwoord FROM tblklant WHERE email = ?", [e], (err,res) => {
            if(err) return rej(err);
            resolve(res);
        });
    });
}
export function insertKlant(data) {
    hashSalt(data[12], 9).then(function(result) {
    data[12] = result;
    con.query("INSERT INTO tblklant VALUES (DEFAULT, ?,?,?,?,?,?,?,?,?,?,?,?,?,0)", [data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],data[12]], (err) => {
        if(err)throw err;
    });
  });
}
export function checkKlant(e,t) {
    return new Promise(function(resolve, rej) {
        con.query("SELECT klantID FROM tblklant WHERE email = ? OR telefoonnummer= ?", [e,t], (err,res) => {
            if(err) return rej(err);
            resolve(res);
        });
    });
}
export function selectKlant(e, p) {
    return new Promise(function(resolve, rej) {
        selectHash(e).then(function(result) {
            if(result[0]) {
                compareHash(p, result[0].wachtwoord).then(function(compRes) {
                    if(compRes) {
                        con.query("SELECT naam, voornaam FROM tblklant WHERE email = ?", [e], (err,res) => {
                            if(err) return rej(err);
                            resolve(res);
                        });
                    }
                    else {
                        resolve('');
                    }
                })
            }
            else {
                resolve('');
            }
        });
    });
}
con.connect(function(err){
    if(err) throw err;
    console.log("Database connected");
});