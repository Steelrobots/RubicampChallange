import Table from "cli-table";
import { line } from "../C18.js";


export function option() {
    line()

    console.log(`
Silahkan pilih opsi dibawah ini:
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Update Nilai
[6] Kembali `)

    line()
}

export function tabelKontrak(array) {
    let table = new Table({
        head: ['ID', 'NIM', 'Nama', 'Mata kuliah', 'Dosen', 'Nilai']
    });
    array.forEach(item => {
        table.push([item.kontrak_ID, item.NIM, item.Nama, item.Mata_kuliah, item.Dosen, item.Nilai ? item.Nilai : ''])
    });
    console.log(table.toString())
};

export function findResult(array) {
    let tabel = new Table({
        head: ["ID", "Mata Kuliah", "Dosen", "Nilai"]
    })
    array.forEach(item => {
        tabel.push([item.kontrak_ID, item.Mata_kuliah, item.Dosen, item.Nilai ? item.Nilai : ''])

    });
    console.log(`Nama Mahasiswa : ${array[0].Nama}`)
    console.log(tabel.toString())
}
export function findKontrak(array) {
    let tabel = new Table({
        head: ["ID", "Mata Kuliah", "Nilai"]
    })
    array.forEach(item => {
        tabel.push([item.kontrak_ID, item.Mata_kuliah, item.Nilai ? item.Nilai : ''])

    });
    console.log(tabel.toString())
}