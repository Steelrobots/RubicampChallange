import { line } from "../C18.js"

export function greetings(login){
    line()
    console.log(`Welcome, ${login.username}. Your acces level is: ${login.level.toUpperCase()}`)
}