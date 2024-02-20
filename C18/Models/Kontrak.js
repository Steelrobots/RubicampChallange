import { db } from "../connect.js";


export default class Kontrak {
    constructor(obj) {
        this.NIP = obj.NIP; this.Matkul_ID = obj.Matkul_ID;
        this.NIM = obj.NIM; this.Nilai = obj.Nilai;
    }

    save() {
        db.run("INSERT INTO kontrak(NIM, Matkul_ID, NIP) VALUES (?, ?, ?)", [this.NIM, this.Matkul_ID, this.NIP], (err, data) => {
            if (err) console.log(err)
            else data
        })

    };

    static list() {
        return new Promise(function (resolve, reject) {
            db.all("select kontrak_ID, kontrak.NIM AS NIM, Mahasiswa.Nama_Mahasiswa AS Nama, Mata_kuliah.Matkul_nama AS Mata_kuliah, Dosen.Nama_Dosen AS Dosen,Nilai FROM kontrak LEFT JOIN Mahasiswa ON kontrak.NIM = Mahasiswa.NIM LEFT JOIN Mata_kuliah ON Mata_kuliah.Matkul_ID = kontrak.Matkul_ID LEFT JOIN Dosen ON Dosen.NIP = kontrak.NIP", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static find(NIM) {
        return new Promise(function (resolve, reject) {
            db.all("SELECT kontrak_ID,Mahasiswa.Nama_Mahasiswa AS Nama,Mata_kuliah.Matkul_nama AS Mata_kuliah,Dosen.Nama_Dosen AS Dosen,Nilai FROM kontrak LEFT JOIN Mahasiswa ON kontrak.NIM = Mahasiswa.NIM LEFT JOIN Mata_kuliah ON Mata_kuliah.Matkul_ID = kontrak.Matkul_ID LEFT JOIN Dosen ON Dosen.NIP = kontrak.NIP WHERE kontrak.NIM = ?", [NIM], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static add(NIM, Matkul_ID, NIP) {
        return new Promise(function (resolve, reject) {
            const kontrak = new Kontrak({ NIM: NIM, Matkul_ID: Matkul_ID, NIP: NIP });
            return kontrak.save()

        })
    }
    static delete(kontrak_ID) {
        return new Promise(function (resolve, reject) {
            db.get("DELETE FROM kontrak WHERE kontrak_ID = ? ", [kontrak_ID], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static update(Nilai, kontrak_ID, NIM) {
        return new Promise(function (resolve, reject) {
            db.run("UPDATE kontrak SET Nilai = ? WHERE kontrak_ID = ? AND NIM = ? ", [Nilai, kontrak_ID, NIM], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static findAdd(NIM, Matkul_ID) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM kontrak WHERE NIM = ? AND Matkul_ID = ? ", [NIM, Matkul_ID], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static findDelete(kontrak_ID) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM kontrak WHERE kontrak_ID = ?", [kontrak_ID], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static findUpdate(kontrak_ID, NIM) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM kontrak WHERE kontrak_ID = ? AND NIM = ?", [kontrak_ID, NIM], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
}
