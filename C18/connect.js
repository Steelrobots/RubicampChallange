import path from 'path';
import sqlite3 from 'sqlite3';
import readline from "readline";


const dbpath = path.join(__dirname, 'db', 'university.db')

export const db = new sqlite3.Database(dbpath);
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini>'
});

// db.all('SELECT * FROM Mahasiswa', (err, rows) => {
//     console.log(rows)
// });