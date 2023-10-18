const fs = require('node:fs');
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: ',
});

if (!process.argv[2]) {
    console.log("Tolong sertakan nama file sebagai inputan soalnya");
    console.log("misalnya 'node C12-TebakTebakan.js data.json");
    process.exit()
}

const data = fs.readFileSync(`./${process.argv[2]}`, "utf-8");
const reference = JSON.parse(data);
reference.push({ 'definition': 'sebutkan kota yang memiliki julukan Kota Intan?', 'term': 'garut' });
let i = 0;
let salah = 0;
console.log(`selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file ini ${process.argv[2]}.\n Untuk bermain, jawablah dengan jawaban yang sesuai.`);
console.log("gunakan 'skip' untuk menangguhkan pertanyaanya, dan di akhir pertanyaan akan ditanyakan lagi.\n");

console.log(`Pertanyaan: ${reference[i].definition}`)
rl.prompt();

rl.on('line', (line) => {
    if (line.toString().toLowerCase() == reference[i].term.toLowerCase()) {
        console.log('Selamat anda benar!\n');
        i++
        if (i == reference.length) {
            console.log('Anda berhasil!');
            rl.close();
        } console.log(`pertanyaan: ${reference[i].definition}`);
    }
    else if (line == "skip") {
        reference.push(reference[i]);
        reference.splice(i, 1);
        salah = 0
        console.log(`pertanyaan: ${reference[i].definition}`);
    } else {
        salah++
        console.log(`Anda kurang beruntung! anda telah salah ${salah} kali, silahkan coba lagi.\n`);
    };

    rl.prompt();

}).on('close', () => {
    
    process.exit(0);
});
