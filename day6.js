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
console.log('times', times);
let distances =  file[1].split(':')[1].split(/\s+/);
//times and distances are still arrays of strings but that's fine
distances.shift();
for (let i = 0; i < times.length; i++) { //for each race
    let waysThisRace = 0;
    //we have a number of ways to do the race up to the race's duration
    for (let t = 1; t < times[i]; t++) {
        let velocity = t; //for clarity
        let time = times[i] - t; //if we start at time t, we have (overall time minus t) milliseconds left
        //as such, we travel at velocity * time, with no acceleration
        let distance = velocity * time;
        if (distance > parseInt(distances[i])) {
            waysThisRace++;
        }
    }
    waysToWin.push(waysThisRace);
}
//now we shrimply multiply them together
let finalSum = waysToWin[0];
for (let i = 1; i < waysToWin.length; i++) {
    finalSum *= waysToWin[i];
}
console.log('distances', distances);
console.log('final value: ', finalSum);