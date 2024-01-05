const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

function findDerivatives (array) {
    //this has a 0% chance of doing what i want
    console.log('oh god', array);
    let derivatives = [];
    let needsRecursion = false;
    for (let i = 0; i < array.length - 1; i++) {
        let diff = (array[i+1] - array[i]);
        console.log('nightmare', array[i+1], array[i]);
        if (diff != 0) {
            needsRecursion = true;
        }
        derivatives.push(diff);
    }
    if (needsRecursion) {
        derivatives = findDerivatives(derivatives);
    }
}

let file = syncReadFile('./input9.txt');
let lines = [];
for (let i = 0; i < file.length; i++) {
    lines.push(file[i].split(' '));
}
console.log('uh huh',  lines);
let histories = [];
for (let i = 0; i < file.length; i++) { //for each line in the file
    histories.push(file[i].split(' '));
}
let totalValue = 0;
for (let i = 0; i < histories.length; i++) { //for each history
    totalValue += findDerivatives(histories[i]);
}

console.log(histories);