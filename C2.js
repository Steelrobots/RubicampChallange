function deretKaskus(n){

    let kaliTiga = []
    for (let i = 1; i <= n; i++) {
        if((i * 3) % 5 === 0 && (i * 3) % 6 === 0){
            kaliTiga.push('KASKUS')
        } else if((i * 3) % 6 === 0){
            kaliTiga.push('KUS')
        } else if((i * 3) % 5 === 0){
            kaliTiga.push('KAS')
        } else {
            kaliTiga.push((i * 3))
        }
        
    } return kaliTiga;

}

console.log(deretKaskus(10));