import Table from "cli-table";
import { line } from "../C18.js";


export function option() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali `)

    line()
}

export function tabelJurusan(array) {
    let table = new Table({
        head: ['Kode Jurusan', 'Nama Jurusan']
    });
    array.forEach(item => {
        table.push([item.Jurusan_ID, item.Jurusan_name])
    });
    console.log(table.toString())
};

export function findResult(data){
    line()
    
    console.log(`
Detail jurusan dengan kode : '${data.Jurusan_ID}'
Kode Jurusan    : ${data.Jurusan_ID}
Nama Jurusan    : ${data.Jurusan_name}
    `)
};

