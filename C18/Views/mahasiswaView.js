import Table from "cli-table";
import { line } from "../C18.js";


export function option() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali `)

    line()
}

export function tabelMahasiswa(array) {
    let table = new Table({
        head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
    });
    array.forEach(item => {
        table.push([item.NIM, item.Nama_Mahasiswa, item.umur, item.Alamat, item.Jurusan_ID, item.nama_jurusan])
    });
    console.log(table.toString())
};

export function findResult(data) {
    line()

    console.log(`
Detail Mahasiswa dengan NIM : '${data.NIM}'
NIM             : ${data.NIM}
Nama            : ${data.Nama_Mahasiswa}
Tanggal Lahir   : ${data.umur}
Alamat          : ${data.Alamat}
Kode Jurusan    : ${data.Jurusan_ID}
    `)
};

