const fs = require("node:fs");

let data = fs.readFileSync("data.json", "utf-8");
const reference = JSON.parse(data);
//console.log(data);

const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan: ',
});

reference.push({ 'definition': 'sebutkan kota yang memiliki julukan Kota Intan?', 'term': 'garut' });

console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!');

let i = 0
console.log(`pertanyaan: ${reference[i].definition}`);

rl.prompt();

rl.on('line', (line) => {
    if (line.toString().toLowerCase() == reference[i].term.toLowerCase()) {
        console.log('Selamat anda benar!\n');
        i++
    }
    else {
        console.log('Wkwkwkwk, Anda kurang beruntung!');
    };
    if (i == reference.length) {
        rl.close();
    }
    console.log(`pertanyaan: ${reference[i].definition}`);
    rl.prompt();
}).on('close', () => {
    console.log('Anda menang!');
    process.exit(0);
});