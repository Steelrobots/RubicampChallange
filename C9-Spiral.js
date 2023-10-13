function spiral(param1) {
    var matrix = [];
    let count = 0
  for(let i = 0; i < param1; i++) {
     matrix[i] = [];
  for(let j=0; j < param1;j++) {
       matrix[i][j] = count;
       count++
    }
   }    //console.log(matrix)  membuat array untuk di spiral   

   let result = [];
   let start = 0;
   let end = param1 - 1
   let number = 1;

   while (result.length < param1 * param1){

    for (let x = start; x < matrix.length; x++) {
      result.push(matrix[start][x]);      
    }
    for (let y = number; y < matrix.length; y++) {
      result.push(matrix[y][end]);
      
    }
    for (let z = 0; z < matrix.length; z++) {
      result.push(matrix[end][z]);
    }
    for (let w = 0; w < matrix.length; w++) {
      result.push(matrix[w][start]);      
    }
    start++;
    number++;
    end--;
    matrix.length--;
   }
   console.log(result);


}                  
spiral(5);
spiral(6);
spiral(7);