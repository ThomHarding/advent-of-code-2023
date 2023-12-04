const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let file = syncReadFile('./input2.txt');
let powerTotal = 0;
for (let i = 0; i < file.length; i++) { //for each line in the file
    let game = file[i].split(': ')[1].split('; '); //array of the type ['X green, Y blue, Z red', 'X red, Y blue, Z green']
    let gameId =  parseInt(file[i].split(': ')[0].substring(5));
    let colourTotal = new Map();
    colourTotal.set('red', 0);
    colourTotal.set('blue', 0);
    colourTotal.set('green', 0);
    for (let t = 0; t < game.length; t++) { //each pull of cubes
        let pulls = game[t].split(', ');
        for (let n = 0; n < pulls.length; n++) { //finally, each pull itself
            let splitPull = pulls[n].split(' ');
            colourTotal.set(splitPull[1], (Math.max(colourTotal.get(splitPull[1]) ,parseInt(splitPull[0])))); //to what it previously was plus this pull
        }
    }
    let powerThisGame = (colourTotal.get('red') * colourTotal.get('blue') * colourTotal.get('green'))
    powerTotal += powerThisGame;
}
console.log('final value: ', powerTotal);