import { db } from "../connect.js";

export default class Dosen {
    constructor(obj) {
        this.NIP = obj.NIP; this.Nama_Dosen = obj.Nama_Dosen;
    };

    save() {
        db.run("INSERT INTO Dosen (NIP, Nama_Dosen) values (?, ?)",
            [this.NIP, this.Nama_Dosen], (err, data) => {
                if (err) console.log(err)
                else data

            })
    }

    static list() {
        return new Promise(function (resolve, reject) {
            db.all("SELECT * FROM Dosen", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            });
        });
    };
    static add(nip, namaDosen) {
        const dosen = new Dosen({ NIP: nip, Nama_Dosen: namaDosen });
        return dosen.save()
    };

    static find(NIP) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM Dosen WHERE NIP = ?", [NIP], (err, data) => {
                if (err) reject(err);
                else resolve(data)
            })
        })
    };
    static delete(NIP) {
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM Dosen WHERE NIP = ?", [NIP], (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}