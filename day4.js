const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let file = syncReadFile('./input4.txt');
let numberOfScratchards = 0;
let cardTotals = new Map();

for (let i = 0; i < file.length; i++) {
  cardTotals.set(i, 1); //start with 1 copy of each card
}
for (let i = 0; i < file.length; i++) { //for each line in the file
  for (let n = 0; n < cardTotals.get(i); n++) { //n = the number of copies this scratchcard has
    numberOfScratchards++;
    let numbers = (file[i].split(': ')[1].split(' | '));
    let winning = numbers[0].split(/\s+/);
    let owned = numbers[1].split(/\s+/);
    let numMatches = 0;
    for (let j = 0; j < owned.length; j++) {
      if (winning.includes(owned[j]) && (owned[j] != '')) { //to account for single digit numbers
        numMatches++;
      }
    }
    for (let m = i; m < i+ numMatches; m++) { //go a numMatches amount of times
      if (m+1 < file.length) {
        cardTotals.set(m+1, (cardTotals.get(m+1) ?? 0) + 1)
      }
    }
  }
}
console.log('final map: ', cardTotals);
console.log('final value: ', numberOfScratchards);