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

function getIntFromSpelledNumber(string) {
    //filthy but how else could you do this man
    switch (string) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'zero':
            return 0;
        default:
          console.log(`what did you do ${string} isn't a number`);
      }
      
}

let numbers = ['one','two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let file = syncReadFile('./input1.txt');
let totalValue = 0;
for (let i = 0; i < file.length; i++) { //for each line in the file
    let firstDigit = '';
    let possibleNumber = '';
    let foundFirst = false;
    let foundLast = false;
    let lastDigit = '';
    possibleNumber = '';
        for (let j = file[i].length; j >= 0; j--) { //for each character in the line
        if (!foundLast) {
            const currChar = file[i].charAt(j);
            if (stringIsNumber(currChar)) {
                console.log('checking ', currChar);
                lastDigit = currChar;
                // totalValue = totalValue + parseInt(lastDigit);
                foundLast = true;
            } else if (possibleNumber == '') {
                possibleNumber = currChar;
            } else {
                for (let t = 0; t < numbers.length; t++) { //for each string in numbers
                    let numberToCheck = (numbers[t].split('').reverse().join('').substring(0, possibleNumber.length)); //substring of an actual number
                    if (numberToCheck == possibleNumber) {
                        if (possibleNumber == numbers[t].split('').reverse().join('')) {
                            console.log('full numbers only' , possibleNumber);
                            lastDigit = getIntFromSpelledNumber(possibleNumber);
                            console.log('yattazo ', lastDigit);
                            foundLast = true;
                        } else {
                            possibleNumber += currChar;
                        }
                    }
                }
            }
            possibleNumber = currChar;
        }
    }
         possibleNumber = '';
    for (let j = 0; j < file[i].length; j++) { //for each character in the line
        if (!foundFirst) {
            const currChar = file[i].charAt(j);
            if (stringIsNumber(currChar)) {
                console.log('checking ', currChar);
                firstDigit = currChar;
                // totalValue = totalValue + parseInt(firstDigit);
                foundFirst = true;
            } else if (possibleNumber == '') {
                possibleNumber = currChar;
            } else {
                for (let t = 0; t < numbers.length; t++) { //for each string in numbers
                    let numberToCheck = (numbers[t].substring(0, possibleNumber.length)); //substring of an actual number
                    if (numberToCheck == possibleNumber) {
                        if (possibleNumber == numbers[t]) {
                            console.log('full numbers only' , possibleNumber);
                            firstDigit = getIntFromSpelledNumber(possibleNumber);
                            console.log('yattazo ', firstDigit);
                            foundFirst = true;
                        } else {
                            possibleNumber += currChar;
                        }
                    }
                }
            }
            possibleNumber = currChar;
        }
    }

    console.log('im sure this is working', firstDigit, " ", lastDigit, parseInt(firstDigit + lastDigit));
    const wholeNumber = parseInt(firstDigit + lastDigit);
    totalValue += wholeNumber;
}
console.log('final value: ', totalValue);