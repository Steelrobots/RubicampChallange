import { home } from "../C18.js";
import { login } from "../Models/Login.js";
import { greetings } from "../Views/LoginView.js";
import { rl } from "../connect.js";

export default function loginAccount() {
    rl.question("username: ", async (answer) => {
        await login(answer).then((x) => {
            if (answer == x.username) {
                rl.question("Password: ", (answer2) => {
                    if (answer2 == x.password) {
                        greetings(x)
                        home()
                    }
                    else {
                        console.log('Password salah, silahkan coba lagi')
                        loginAccount()
                    }
                })
            }
        }).catch(() => {
            console.log("Username tdak ditemukan")
            loginAccount()
        })
    })
}