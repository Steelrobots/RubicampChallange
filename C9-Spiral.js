function spiral(param1) {
    let arr = [];
    let baru = 0;


    for (let i = 0; i < param1; i++) {
        arr[i] = [];
        for (let j = 0; j < param1; j++) {
            arr[i][j] = baru;
            baru++;
        }
    }
    let frontRow = 0;
    let frontCol = 0;
    let lastCol = param1 - 1;
    let lastRow = param1 - 1;
    let kurung = [];
    while (frontCol <= lastCol && frontRow <= lastRow) {

        for (let i = frontCol; i <= lastCol; i++) {
            kurung.push(arr[frontRow][i])
        }
        frontRow++;


        for (let i = frontRow; i <= lastRow; i++) {
            kurung.push(arr[i][lastCol])
        }
        lastCol--;

        if (frontRow <= lastRow)
            for (let i = lastCol; i >= frontCol; i--) {
                kurung.push(arr[lastRow][i])
            }
        lastRow--;

        if (frontCol <= lastCol) {
            for (let i = lastRow; i >= frontRow; i--) {
                kurung.push(arr[i][frontCol])
            }
            frontCol++;
        }
    }
    console.log(kurung);
}


spiral(5);
spiral(6);
spiral(7);