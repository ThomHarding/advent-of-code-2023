const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

function stringIsNumber(input) {
    return (input >= '0' && input <= '9');
}

let file = syncReadFile('./input1.txt');
let totalValue = 0;
let parsedLines = 0;
for (let i = 0; i < file.length; i++) {
    let firstDigit = '';
    for (let j = 0; j < file[i].length; j++) {
        const currChar = file[i].charAt(j)
        if (stringIsNumber(currChar)) {
            console.log('checking ', currChar);
            firstDigit = currChar;
            break;
        }
    }
    let lastDigit = '';
    for (let j = file[i].length; j >= 0; j--) {
        const currChar = file[i].charAt(j)
        if (stringIsNumber(currChar)) {
            console.log('checking from back ', currChar);
            lastDigit = currChar;
            break;
        }
    }
    console.log('im sure this is working', firstDigit, " ", lastDigit, parseInt(firstDigit + lastDigit));
    const wholeNumber = parseInt(firstDigit + lastDigit);
    totalValue += wholeNumber;
    parsedLines++;
}
console.log('final value: ', totalValue ,parsedLines);