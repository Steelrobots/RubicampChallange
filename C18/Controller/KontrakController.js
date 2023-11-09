import { home, line } from "../C18.js";
import Dosen from "../Models/Dosen.js";
import Kontrak from "../Models/Kontrak.js";
import Mahasiswa from "../Models/Mahasiswa.js";
import Matakuliah from "../Models/Matakuliah.js";
import { tabelDosen } from "../Views/DosenView.js";
import { findKontrak, findResult, option, tabelKontrak } from "../Views/KontrakView.js";
import { tabelMahasiswa } from "../Views/MahasiswaView.js";
import { tabelMatakuliah } from "../Views/MatakuliahView.js";
import { rl } from "../connect.js";

export default class KontrakController {

    static option() {
        option();
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    KontrakController.listAll();
                    break;
                case '2':
                    KontrakController.find();
                    break;
                case '3':
                    KontrakController.add();
                    break;
                case '4':
                    KontrakController.delete();
                    break;
                case '5':
                    KontrakController.update();
                    break;
                case '6':
                    home();
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    KontrakController.option();
                    break;



            }
        })
    }

    static async listAll() {
        const kontrak = await Kontrak.list();
        if (kontrak) {
            tabelKontrak(kontrak)
            KontrakController.option()
        } else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            KontrakController.option()
        }
    }
    static async find() {
        const kontrak = await Kontrak.list();
        if (kontrak) {
            tabelKontrak(kontrak);
            rl.question(`Masukkan NIM Mahasiswa :`, async (NIM) => {
                const kontrak = await Kontrak.find(NIM)
                if (!kontrak.toString()) {
                    console.log(`Tidak ada kontrak dengan NIM ${NIM}`);
                    KontrakController.option()
                } else {
                    console.log(`Daftar kontrak mahasiswa dengan NIM ${NIM} adalah:`)
                    findResult(kontrak);
                    KontrakController.option();
                }
            })
        } else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            KontrakController.option()
        }
    }
    static async add() {
        console.log('Lengkapi data dibawah ini :')
        const mahasiswa = await Mahasiswa.list()
        if (mahasiswa) {
            tabelMahasiswa(mahasiswa)
            rl.question(`masukkan NIM mahasiswa: `, async (NIM) => {
                const matkul = await Matakuliah.list(NIM)
                if (matkul) {
                    tabelMatakuliah(matkul)
                    rl.question('masukkan Kode mata kuliah:', async (Matkul_ID) => {
                        const dosen = await Dosen.list();
                        if (dosen) {
                            tabelDosen(dosen)
                            rl.question('masukkan NIP Dosen:', async (NIP) => {
                                if (await Kontrak.findAdd(NIM, Matkul_ID)) {
                                    console.log('Gagal menambahkan kontrak, kontrak telah terdaftar')
                                } else {
                                    Kontrak.add(NIM, Matkul_ID, NIP)
                                    KontrakController.listAll()
                                    KontrakController.option()
                                }
                            })
                        }
                    })
                } else {
                    console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
                    KontrakController.option()
                }
            })
        }
    }
    static delete() {
        rl.question('Masukkan ID kontrak: ', async (kontrak_ID) => {
            const hapus = await Kontrak.findDelete(kontrak_ID)
            if (hapus) {
                console.log(`Data kontrak dengan ID ${kontrak_ID} telah dihapus `)
                await Kontrak.delete(kontrak_ID),
                    KontrakController.option()
            } else {
                console.log('Gagal menghapus kontrak, ID kontrak tidak terdaftar')
                KontrakController.option()
            }
        })
    }
    static async update() {
        const kontrak = await Kontrak.list();
        if (kontrak) {
            tabelKontrak(kontrak)
            rl.question('Masukkan NIM Mahasiswa:', async (NIM) => {
                line()
                const kontrak = await Kontrak.find(NIM)
                if (kontrak.toString()) {
                    console.log(`Detail mahasiswa dengan NIM '${NIM}' :`)
                    findKontrak(kontrak)
                    line()
                    rl.question('Masukkan id yang akan dirubah nilainya :', async (kontrak_ID) => {
                        line()
                        if (await Kontrak.findUpdate(kontrak_ID, NIM)) {
                            rl.question('tulis nilai yang baru :', async (Nilai) => {
                                line()
                                await Kontrak.update(Nilai, kontrak_ID, NIM)
                                console.log('Nilai telah di update')
                                await KontrakController.listAll()
                            })
                        } else{
                            console.log('ID dan NIM yang anda masukkan salah. silahkan masukkan data yang benar.')
                            KontrakController.option()
                        }

                    })
                } else {
                    console.log(`kontrak dengan NIM ${NIM} tidak ada, silahkan coba lagi`)
                    KontrakController.option()
                }
            })

        }  else {
            console.log('terjadi kesalahan dalam proses penampilan data, silahkan coba lagi')
            KontrakController.option()}
    }
}