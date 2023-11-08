import { db } from "../connect.js";

export default class Matakuliah {
    constructor(obj) {
        this.Matkul_ID = obj.Matkul_ID; this.Matkul_nama = obj.Matkul_nama; this.SKS = obj.SKS
    };

    save() {
        db.run("INSERT INTO Mata_kuliah (Matkul_ID, Matkul_nama, SKS) values (?, ?, ?)",
            [this.Matkul_ID, this.Matkul_nama, this.SKS], (err, data) => {
                if (err) console.log(err)
                else data

            })
    }

    static list() {
        return new Promise(function (resolve, reject) {
            db.all("SELECT * FROM Mata_kuliah", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            });
        });
    };
    static add(matkulId, namaMatkul,sks) {
        const matkul = new Matakuliah({ Matkul_ID: matkulId, Matkul_nama: namaMatkul,SKS : sks });
        return matkul.save()
    };

    static find(Matkul_ID) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM Mata_kuliah WHERE Matkul_ID = ?", [Matkul_ID], (err, data) => {
                if (err) reject(err);
                else resolve(data)
            })
        })
    };
    static delete(Matkul_ID) {
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM Mata_kuliah WHERE Matkul_ID = ?", [Matkul_ID], (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}