const fs = require('node:fs');
const data = fs.readFileSync("./toDo.json", "utf-8");
const obj = JSON.parse(data);
const command = process.argv[2].toLowerCase(), id = process.argv[3], inform = process.argv.slice(3).join(' ');

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

        if (inform) {
            console.log(`${inform} telah ditambahkan.`);
            obj.push({ "ID": tambah, "title": inform, "complete": false, tag: "" });
            fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
        } else if (!inform || inform == " ") return;

        break;

    case 'delete':

        console.log(`"${obj[hapus].title}" telah dihapus dari daftar`);
        obj.splice(hapus, 1); 
        obj.forEach((item, index )=> {
            item.ID = index + 1;
        fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
       
        });

        break;

    case 'complete':

        console.log(`"${obj[hapus].title}" telah selesai.`);
        obj[id - 1].complete = true;
        fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");

        break;

    case 'uncomplete':
        console.log(`"${obj[hapus].title}" status selesai dibatalkan.`);
        obj[id - 1].complete = false;
        fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
        break;

    case 'list:outstanding':
        console.log('Daftar Pekerjaan');
        let outstanding = [];
        for (let x of obj) {
            if (!x.complete) {
                x.complete = "[]";
                outstanding.push(`${x.ID}. ${x.complete}. ${x.title}.`);
            }
        }
        if (id === 'asc') {
            console.log(outstanding.join('\n'))
        } else if (id === "desc") {
            console.log(outstanding.reverse().join('\n'));
        }
        break;

    case 'list:completed':
        console.log('Daftar Pekerjaan');
        let completed = []
        for (let x of obj) {
            if (x.complete) {
                x.complete = "[x]";
                completed.push(`${x.ID}. ${x.complete}. ${x.title}.`);
            }
        }
        if (id === 'asc') {
            console.log(completed.join('\n'))
        } else if (id === "desc") {
            console.log(completed.reverse().join('\n'));
        }
        break;
    case 'tag':
        console.log(`"Tag ${process.argv.slice(4)}" telah ditambahkan ke dalam '${obj[obj.findIndex(x => x.ID == id)].title} `);
        obj[hapus].tag = obj[hapus].tag.concat(process.argv.slice(4));

        fs.writeFileSync("./toDo.json", JSON.stringify(obj), "utf-8");
        break;


    default:
        if (!command || command == 'help') {
            console.log(daftarIsi);
        }
        else if (command.toLowerCase().startsWith(`filter:${command.slice(7)}`)) {
            console.log("Daftar Pekerjaan")
            for (let x of obj) {
                if (x.tag.includes(command.slice(7))) {
                    if (x.complete) {
                        x.complete = "[x]";
                        console.log(`${x.ID}. ${x.complete}. ${x.title}`)
                    } else if (!x.complete) {
                        x.complete = "[ ]"
                        console.log(`${x.ID}. ${x.complete}. ${x.title}`)
                    }
                }
            }
        }
        break;
}
