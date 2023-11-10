import { home } from "../C18.js";
import Dosen from "../Models/Dosen.js";
import { findResult, option, tabelDosen } from "../Views/DosenView.js";
import { rl } from "../connect.js";



export default class DosenController {

    static option() {
        option();
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    DosenController.listAll();
                    break;
                case '2':
                    DosenController.find();
                    break;
                case '3':
                    DosenController.add();
                    break;
                case '4':
                    DosenController.delete();
                    break;
                case '5':
                    home();
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    DosenController.option();
                    break;



            }

        })
    }

    static async listAll() {
        const dosen = await Dosen.list();
        if (dosen) {
            tabelDosen(dosen)
            DosenController.option()
        } else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            DosenController.option()

        }
    }
    static find() {
        rl.question('Masukkan NIP: ', async (kode) => {
            const search = await Dosen.find(kode);
            if (search) {
                findResult(search);
                DosenController.option()
            } else {
                console.log(`Dosen dengan NIP ${kode}, tidak terdaftar`);
                DosenController.option()
            }
        })

    }
    static async add() {
        console.log('Lengkapi data di bawah ini:\n');
        const dosen = await Dosen.list()
        if (dosen) {
            tabelDosen(dosen);
            rl.question('NIP : ', async (kode) => {
                rl.question('Nama Dosen : ', async (nama) => {
                    if (await Dosen.find(kode)) {
                        console.log('Gagal menambahkan Dosen karena sudah ada di database');
                        DosenController.option()
                    } else {
                        Dosen.add(kode, nama);
                        console.log('dosen telah ditambahkan');
                        DosenController.option()
                    }
                })
            });
        } else {
            console.log('Terjadi kesalahan dalam menampilkan data')
            DosenController.option();
        }
    }

    static delete() {
        rl.question('Masukkan NIP: ', async (kode) => {
            const dosen = await Dosen.find(kode)
            if (dosen) {
                console.log(`Data Dosen ${kode}, telah dihapus`)
                await Dosen.delete(kode),
                DosenController.option()
            } else{
                console.log('Gagal menghapus Dosen, NIP tidak terdaftar')
                DosenController.option()
            }
        })
    }


}
