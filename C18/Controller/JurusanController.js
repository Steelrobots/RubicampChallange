import { home } from "../C18.js";
import Jurusan from "../Models/Jurusan.js";
import { findResult, option, tabelJurusan } from "../Views/JurusanView.js";
import { rl } from "../connect.js";



export default class JurusanController {

    static option() {
        option()
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    JurusanController.listAll();
                    break;
                case '2':
                    JurusanController.find();
                    break;
                case '3':
                    JurusanController.add();
                    break;
                case '4':
                    JurusanController.delete();
                    break;
                case '5':
                    home();
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    JurusanController.option();
                    break;



            }

        })
    }

    static async listAll() {
        const jurusan = await Jurusan.list();
        if (jurusan) {
            tabelJurusan(jurusan)
            JurusanController.option()
        } else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            JurusanController.option()

        }
    }
    static find() {
        rl.question('Masukkan Kode Jurusan: ', async (kode) => {
            const search = await Jurusan.find(kode);
            if (search) {
                findResult(search);
                JurusanController.option()
            } else {
                console.log(`Jurusan dengan kode ${kode}, tidak terdaftar`);
                JurusanController.option()
            }
        })

    }
    static async add() {
        console.log('Lengkapi data di bawah ini:\n');
        const jurusan = await Jurusan.list()
        if (jurusan) {
            tabelJurusan(jurusan);
            rl.question('Kode Jurusan : ', async (kode) => {
                rl.question('Nama Jurusan : ', async (nama) => {
                    if (await Jurusan.find(kode)) {
                        console.log('Gagal menambahkan Jurusan karena sudah ada di database');
                        JurusanController.option()
                    } else {
                        Jurusan.add(kode, nama);
                        console.log('jurusan telah ditambahkan');
                        JurusanController.option()
                    }
                })
            });
        } else {
            console.log('Terjadi kesalahan dalam menampilkan data')
            JurusanController.option();
        }
    }
    static delete() {
        rl.question('Masukkan Kode Jurusan: ', async (kode) => {
            const jurusan = await Jurusan.find(kode)
            if (jurusan) {
                console.log(`Data Jurusan ${kode}, telah dihapus`)
                await Jurusan.delete(kode),
                    JurusanController.option()
            } else {
                console.log('Gagal menghapus Jurusan, ID Jurusan tidak terdaftar')
                Jurusan.option()
            }
        })
    }


}
