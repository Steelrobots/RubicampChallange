import { db } from "../connect.js";

export const login = (username) => new Promise(function(resolve,reject){
    db.get('SELECT * FROM akun WHERE username = ?', [username], (err,data) =>{
        if (err) reject(err)
        else resolve(data);
    })
})
