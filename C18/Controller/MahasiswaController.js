import Jurusan from "../Models/Jurusan.js";
import Mahasiswa from "../Models/Mahasiswa.js";
import { tabelJurusan } from "../Views/jurusanView.js";
import { findResult, option, tabelMahasiswa } from "../Views/mahasiswaView.js";
import { rl } from "../connect.js";




export default class MahasiswaController {

    static option() {
        option();
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    MahasiswaController.listAll();
                    break;
                case '2':
                    MahasiswaController.find();
                    break;
                case '3':
                    MahasiswaController.add();
                    break;
                case '4':
                    MahasiswaController.delete();
                    break;
                case '5':
                    MahasiswaController.home();
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    MahasiswaController.option();
                    break;



            }

        })
    }

    static listAll() {
        Mahasiswa.list().then((data) => {
            tabelMahasiswa(data);
            MahasiswaController.option();
        })
    }
    static find() {
        rl.question('Masukkan NIM Mahasiswa : ', (NIM) => {
            Mahasiswa.find(NIM).then((data) => {
                findResult(data);
                MahasiswaController.option()
            }).catch(() => {
                console.log(`Mahasiswa dengan NIM ${NIM} tidak terdaftar`)
                MahasiswaController.option()
            })
        })
    }
    static add() {
        console.log('Lengkapi data di bawah ini :')
        Mahasiswa.list().then((data) => {
            tabelMahasiswa(data);
            rl.question("NIM :", (NIM) => {
                rl.question("Nama :", (Nama_Mahasiswa) => {
                    rl.question("Tanggal lahir :", (umur) => {
                        rl.question("Alamat :", (Alamat) => {
                            Jurusan.list().then((data) => {
                                tabelJurusan(data)
                                rl.question('Kode Jurusan', (Jurusan_ID) => {
                                    Mahasiswa.find(NIM).then((data) => {
                                        console.log(`Mahasiswa dengan NIM ${data.NIM} sudah terdaftar. Silahkan masukkan data dengan benar`)
                                        MahasiswaController.option()
                                    }).catch(() => {
                                        Mahasiswa.add(NIM, Nama_Mahasiswa, Alamat, Jurusan_ID, umur);
                                        console.log('Mahasiswa telah ditambahkan');
                                        Mahasiswa.list().then((data) => {
                                            tabelMahasiswa(data)
                                            MahasiswaController.option()
                                        }).catch(() => {
                                            console.log('Gagal menambahkan data Mahasiswa');
                                            MahasiswaController.option()
                                        })
                                    })
                                })  
                            }).catch(() => {
                                    console.log('Terjadi kesalahan pada saat menampilkan data. Silahkan coba lagi');
                                    MahasiswaController.option()
                                })
                        })
                    })
                })
            })

        }).catch(() => {
            console.log("Terjadi kesalahan dalam menampilkan data Mahasiswa. Silahkan coba lagi")
            MahasiswaController.option()
        })
    }
    static delete(){
        rl.question('Masukkan NIM Mahasiswa:', (NIM) =>{
            Mahasiswa.find(NIM).then((data) =>{
                Mahasiswa.delete(data.NIM).then(() =>{
                console.log(`data Mahasiswa ${NIM}, telah dihapus `);
                MahasiswaController.option();
            }).catch(()=>{
                console.log('Gagal menghapus data, terjadi kesalahan dalam menghapus data. silahkan coba lagi');
                MahasiswaController.option()
            });
            }).catch(()=>{
                console.log(`Gagal menghapus data karena NIM ${NIM} tidak ada dalam database`)
            });
        });
    };

}


