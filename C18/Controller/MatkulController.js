import Matakuliah from "../Models/Matakuliah.js";
import { findResult, option, tabelMatakuliah } from "../Views/matakuliahView.js";
import { rl } from "../connect.js";



export default class MatkulController {

    static option() {
        option();
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    MatkulController.listAll();
                    break;
                case '2':
                    MatkulController.find();
                    break;
                case '3':
                    MatkulController.add();
                    break;
                case '4':
                    MatkulController.delete();
                    break;
                case '5':
                    MatkulController.home();
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    MatkulController.option();
                    break;



            }

        })
    }

    static async listAll() {
        const matkul = await Matakuliah.list();
        if (matkul) {
            tabelMatakuliah(matkul)
            MatkulController.option()
        } else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            MatkulController.option()

        }
    }
    static find() {
        rl.question('Masukkan ID Mata kuliah: ', async (kode) => {
            const search = await Matakuliah.find(kode);
            if (search) {
                findResult(search);
                MatkulController.option()
            } else {
                console.log(`Mata kuliah dengan id ${kode}, tidak terdaftar`);
                MatkulController.option()
            }
        })

    }
    static async add() {
        console.log('Lengkapi data di bawah ini:\n');
        const matkul = await Matakuliah.list()
        if (matkul) {
            tabelMatakuliah(matkul);
            rl.question('ID Mata kuliah : ', async (kode) => {
                rl.question('Mata Kuliah : ', async (nama) => {
                    rl.question('SKS :', async (sks) => {
                        if (await Matakuliah.find(kode)) {
                            console.log('Gagal menambahkan Mata kuliah karena sudah ada di database');
                            MatkulController.option()
                        } else {
                            Matakuliah.add(kode, nama, sks);
                            console.log('Mata Kuliah telah ditambahkan');
                            MatkulController.option()
                        }
                    })
                })
            });
        } else {
            console.log('Terjadi kesalahan dalam menampilkan data')
            MatkulController.option();
        }
    }

    static delete() {
        rl.question('Masukkan ID Mata kuliah: ', async (kode) => {
            const matkul = await Matakuliah.find(kode)
            if (matkul)
                console.log(`Data Mata kuliah dengan ID ${kode}, telah dihapus`)
            Matakuliah.delete(kode),
                MatkulController.option()
        })
    }


}
