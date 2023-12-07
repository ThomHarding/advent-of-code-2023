const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let file = syncReadFile('./input6.txt');
let waysToWin = [];
//first step: parse out useful information
let times =  file[0].split(':')[1].split(/\s+/);
times.shift(); //the first item is empty due to how split works with the whitespace
let overallTime = '';
times.forEach(e => {
    overallTime += e;
});
let distances =  file[1].split(':')[1].split(/\s+/);
//times and distances are still arrays of strings but that's fine
distances.shift();
let overallDistance = '';
distances.forEach(e => {
    overallDistance += e;
});
console.log(overallDistance, overallTime);
let lowestVelocity = 0;
//we have a number of ways to do the race up to the race's duration
for (let t = 1; t < overallTime; t++) {
    let velocity = t; //for clarity
    let time = overallTime - t;
    //since we know it's velocity * time, once we know the lowest velocity
    //we know that the highest velocity will be what we previously uesd as the time value
    if (overallDistance < (velocity * time)) {
        lowestVelocity = velocity;
        break;
    }
}
console.log('total ways', 0 - (lowestVelocity - (overallTime - lowestVelocity + 1)));