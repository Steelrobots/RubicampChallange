import DosenController from "./Controller/dosenController.js"
import JurusanController from "./Controller/jurusanController.js"





export function line(){
    let line = ''
    for(let i=0; i < 100; i++) line += '='
    return console.log(line)
};


// JurusanController.option()
 DosenController.option()