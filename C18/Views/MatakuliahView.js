import Table from "cli-table";
import { line } from "../C18.js";


export function option() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali `)

    line()
}

export function tabelMatakuliah(array) {
    let table = new Table({
        head: ['ID Mata kuliah', 'Mata Kuliah', 'SKS']
    });
    array.forEach(item => {
        table.push([item.Matkul_ID, item.Matkul_nama, item.SKS])
    });
    console.log(table.toString())
};

export function findResult(data){
    line()
    
    console.log(`
Detail Mata Kuliah dengan Id : '${data.Matkul_ID}'
ID Mata Kuliah        : ${data.Matkul_ID}
Mata Kuliah           : ${data.Matkul_nama}
SKS                   : ${data.SKS}
    `)
};

