import { db } from "../connect.js";

export default class Jurusan {
    constructor(obj) {
        this.Jurusan_ID = obj.Jurusan_ID; this.Jurusan_name = obj.Jurusan_name;
    };

    save() {
        db.run("INSERT INTO Jurusan (Jurusan_ID, Jurusan_name) values (?, ?)",
            [this.Jurusan_ID, this.Jurusan_name], (err, data) => {
                if (err) console.log(err)
                else data
              
            })
    }

    static list(next) {
        db.all("SELECT * FROM Jurusan", (err, rows) => {
            if (err) console.log(err)
            else next(rows)
        });
    };

    static add(jurusanId, jurusanNama) {
        const jurusan = new Jurusan({ Jurusan_ID: jurusanId, Jurusan_name: jurusanNama });
        return jurusan.save()
    };

    static find(Jurusan_ID) {
        return new Promise(function(resolve,reject){db.get("SELECT * FROM Jurusan WHERE Jurusan_ID = ?", [Jurusan_ID], (err, data) => {
            if (err) reject(err);
            else resolve(data)
        })
        })
    };
    static delete(Jurusan_ID) {
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM Jurusan WHERE Jurusan_ID = ?", [Jurusan_ID], (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}