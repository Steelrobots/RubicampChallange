function romawi(n){
    
const tabel = [{ awal: 1000, akhir: 'M' },{ awal: 900, akhir: 'CM' },{ awal: 500, akhir: 'D' },{ awal: 400, akhir: 'CD' },{ awal: 100, akhir: 'C' },
    { awal: 90, akhir: 'XC' },{ awal: 50, akhir: 'L' },{ awal: 40, akhir: 'XL' },{ awal: 10, akhir: 'X' },{ awal: 9, akhir: 'IX' },
    { awal: 5, akhir: 'V' }, { awal: 4, akhir: 'IV' },{ awal: 1, akhir: 'I' }
];     
  
    let jadi = '';
    for (let i = 0; i < tabel.length; i++) {
        while (n >= tabel[i].awal) {
            jadi += tabel[i].akhir;
            n -= tabel[i].awal;
        }
    }
    return jadi;
}


console.log("Script Testing untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("------|----------|-------");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IV       | ", romawi(9));
console.log("13    | IV       | ", romawi(13));
console.log("1453  | IV       | ", romawi(1453));
console.log("1646  | IV       | ", romawi(1646));