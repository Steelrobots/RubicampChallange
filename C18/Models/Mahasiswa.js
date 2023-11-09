import { db } from "../connect.js";

export default class Mahasiswa {
    constructor(obj) {
        this.NIM = obj.NIM; this.Nama_Mahasiswa = obj.Nama_Mahasiswa;
        this.Alamat = obj.Alamat; this.Jurusan_ID = obj.Jurusan_ID;
        this.umur = obj.umur;
    }
    save() {
        db.run("INSERT INTO Mahasiswa (NIM, Nama_Mahasiswa, Alamat, Jurusan_ID, umur) values (?, ?, ?, ?, ?)",
            [this.NIM, this.Nama_Mahasiswa, this.Alamat, this.Jurusan_ID, this.umur], (err, data) => {
                if (err) console.log(err)
                else data

            })
    }

    static list() {
        return new Promise(function (resolve, reject) {
            db.all("SELECT NIM,Nama_Mahasiswa,umur,Alamat,Jurusan.Jurusan_ID, Jurusan.Jurusan_name AS nama_jurusan FROM Mahasiswa LEFT JOIN Jurusan on Mahasiswa.Jurusan_ID = Jurusan.Jurusan_ID", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            });
        });
    };
    static add(NIM, Nama_Mahasiswa, Alamat, Jurusan_ID, umur) {
        const mahasiswa = new Mahasiswa({ NIM: NIM, Nama_Mahasiswa: Nama_Mahasiswa, Alamat: Alamat, Jurusan_ID: Jurusan_ID, umur: umur });
        return mahasiswa.save()
    };

    static find(NIM) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM Mahasiswa WHERE NIM = ?", [NIM], (err, data) => {
                if (err) reject(err);
                else resolve(data)
            })
        })
    };
    static delete(NIM) {
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM Mahasiswa WHERE NIM = ?", [NIM], (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }
}