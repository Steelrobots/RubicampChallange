function weirdMultiply(sentence) {
    var numb = sentence.toString()
    if (numb.length > 1) {
        let result = 1
        for (let i = 0; i < numb.length; i++) {
            result *= numb[i];

        }
        return weirdMultiply(result);
    }
    else {
        return sentence;

    }

}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
