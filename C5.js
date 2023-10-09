function stringManipulation(word){
    if(word.charAt(0).match(/[aiueoAIUEO]/)){
        console.log(word)
    } else {
        let newWord = word.slice(1,word.length).concat(word.charAt(0)).concat('nyo');
        console.log(newWord);
    }
}


stringManipulation('ayam');
stringManipulation('bebek');