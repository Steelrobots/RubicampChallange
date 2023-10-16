const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini>'
});

rl.prompt();

rl.on('line', (line) => {
    let arrSent = line.split(" ");
    let arrNew = [];
    let output = [];
    
    for (let i = 0; i < arrSent.length; i++) {
        if(arrSent[i].charAt(0).match(/[aiueoAIUEO]/)){
            output.push(arrSent[i]);
        } else {
            output.push(arrSent[i].slice(1).concat(arrSent[i].charAt(0)).concat('nyo'))
        }
        
        
    }console.log('hasil konversi :' +output.join(' '));

    rl.prompt();
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);

});