const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let file = syncReadFile('./input4.txt');
let pointTotal = 0;
for (let i = 0; i < file.length; i++) { //for each line in the file
    let numbers = (file[i].split(': ')[1].split(' | '));
    let winning = numbers[0].split(/\s+/);
    let owned = numbers[1].split(/\s+/);
    // console.log('card numbers', winning, owned);
    let numMatches = 0;
    for (let j = 0; j < owned.length; j++) {
      if (winning.includes(owned[j]) && (owned[j] != '')) { //to account for single digit numbers
        // console.log('matching on ', owned[j]);
        numMatches++;
      }
    }
    if (numMatches >= 1) {
      pointTotal += (1 * Math.pow(2, numMatches - 1));
    }
    // console.log('card ', i, ': ', pointTotal, ' points');
}
console.log('final value: ', pointTotal);