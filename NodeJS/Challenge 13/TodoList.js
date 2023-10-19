const fs = require('node:fs');
const readline = require('node:readline');
const data = fs.readFileSync("./toDo.json", "utf-8");
const obj = JSON.parse(data);
const command = process.argv[2], id = process.argv[3], inform = process.argv.slice(3).join(' ');

let hapus = id - 1
let tambah = obj.length + 1
const daftarIsi = `>>>> JS TODO <<<<
$ node TodoList.js <command>
$ node TodoList.js list
$ node TodoList.js task <task_id>
$ node TodoList.js add <task_content>
$ node TodoList.js delete <task_id>
$ node TodoList.js complete <task_id>
$ node TodoList.js uncomplete <task_id>
$ node TodoList.js list:outstanding asc|desc
$ node TodoList.js list:completed asc|desc
$ node TodoList.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node TodoList.js filter:<tag_name>
`

// console.log(daftarIsi);
if(!command){
    console.log(daftarIsi)
} else{
switch (command) {
    case 'help':
        console.log(daftarIsi)
        break;
    case 'list':
        console.log("Daftar Pekerjaan")
        for (let x of obj) {
            if (x.complete) {
                x.complete = "[x]"
                console.log(`${x.ID}. ${x.complete}. ${x.title}.`);
            } else {
                x.complete = "[ ]"
                console.log(`${x.ID}. ${x.complete}. ${x.title}.`);
            }
        }
        break;
    case 'task':
        for (let x in obj[hapus]) console.log(`${x}: ${obj[id - 1][x]}`);
        break;
    case 'add':
        if(inform){
            console.log(`${inform} telah ditambahkan.`);
            obj.push({"ID":tambah, "title":inform,"complete": false,tag:"" });
            fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
        }else if(!inform || inform == " ") return;
    case 'delete':
        console.log(`"${obj[id-1].title}" telah dihapus dari daftar`);
        obj.splice(hapus, 1);
        fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
        break;
    default:
        break;
}
}

