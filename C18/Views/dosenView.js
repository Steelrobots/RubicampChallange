import Table from "cli-table";
import { line } from "../C18.js";


export function option() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali `)

    line()
}

export function tabel(array) {
    let table = new Table({
        head: ['NIP', 'Nama Dosen']
    });
    array.forEach(item => {
        table.push([item.NIP, item.Nama_Dosen])
    });
    console.log(table.toString())
};

export function findResult(data){
    line()
    
    console.log(`
Detail Dosen dengan NIP : '${data.NIP}'
NIP         : ${data.NIP}
Nama Dosen  : ${data.Nama_Dosen}
    `)
};

