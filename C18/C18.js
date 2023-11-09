import DosenController from "./Controller/DosenController.js"
import JurusanController from "./Controller/JurusanController.js"
import KontrakController from "./Controller/KontrakController.js"
import loginAccount from "./Controller/LoginController.js"
import MahasiswaController from "./Controller/MahasiswaController.js"
import MatkulController from "./Controller/MatkulController.js"
import { rl } from "./connect.js"

export function line() {
    let line = ''
    for (let i = 0; i < 100; i++) line += '='
    return console.log(line)
};

export function start() {
    line()
    console.log(`
Welcome to Universitas Pendidikan Indonesia
Jl.Setiabudhi No. 255
    `)
    line()
    loginAccount()
}
export function exit(){
    line()
    console.log('Anda telah keluar')
    start()
}

export function home() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata kuliah
[5] Kontrak
[6] Keluar `)

    line()
    rl.question('Masukkan salah satu nomor dari opsi di atas:', (index) => {
        switch (index) {
            case '1':
                MahasiswaController.option()
                break;
            case '2':
                JurusanController.option()
                break;
            case '3':
                DosenController.option()
                break;
            case '4':
                MatkulController.option()
                break;
            case '5':
                KontrakController.option()
                break;
            case '6':
                exit()
                break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    home();
                    break;


        }
    })
}

start()





// // JurusanController.option()
// //  DosenController.option()
// //  MatkulController.option()
// // MahasiswaController.option()
// KontrakController.option()