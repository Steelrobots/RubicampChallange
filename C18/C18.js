import DosenController from "./Controller/DosenController.js"
import JurusanController from "./Controller/JurusanController.js"
import MahasiswaController from "./Controller/MahasiswaController.js"
import MatkulController from "./Controller/MatkulController.js"





export function line(){
    let line = ''
    for(let i=0; i < 100; i++) line += '='
    return console.log(line)
};


// JurusanController.option()
//  DosenController.option()
//  MatkulController.option()
MahasiswaController.option()