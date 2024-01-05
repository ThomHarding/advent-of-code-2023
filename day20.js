const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

let cardValues = new Map(); //gotta rank cards somehow
cardValues.set('A', 13);
cardValues.set('K', 12);
cardValues.set('Q', 11);
cardValues.set('J', 10);
cardValues.set('T', 9);
cardValues.set('9', 8);
cardValues.set('8', 7);
cardValues.set('7', 6);
cardValues.set('6', 5);
cardValues.set('5', 4);
cardValues.set('4', 3);
cardValues.set('3', 2);
cardValues.set('2', 1);

function testForFiveOfAKind(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let foundFive = '';
    seenCards.forEach(function (value, key, map) {
        if (value >= 5) {
            foundFive = key;
        }
      });
      return (foundFive == '') ? false : foundFive;
}

function testForFourOfAKind(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let foundFour = '';
    seenCards.forEach(function (value, key, map) {
        if (value >= 4) {
            foundFour = key;
        }
      });
      return (foundFour == '') ? false : foundFour;
}

function testForThreeOfAKind(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let foundThree = '';
    seenCards.forEach(function (value, key, map) {
        if (value >= 3) {
            foundThree = key;
        }
    });
    return (foundThree == '') ? false : foundThree;
}

function testForFullHouse(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let hasThree = null;
    let hasTwo = null;
    seenCards.forEach(function (value, key, map) {
        if (value == 3) {
            hasThree = key;
        }
        if (value == 2) {
            hasTwo = key;
        }
    });
    if ((hasThree != null) && (hasTwo != null)) {
    return [hasTwo, hasThree];
    }
    return false;
}

function testForTwoPair(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let pairs = [];
    seenCards.forEach(function (value, key, map) {
        if (value == 2) {
            pairs.push(key);
        }
      });
    if (pairs.length == 2) {
        return pairs;
    }
    return false;
}

function testForOnePair(cards) {
    let seenCards = new Map();
    for (let i = 0; i < cards.length; i++) {
        seenCards.set(cards[i], (seenCards.get(cards[i]) ?? 0) + 1)
    }
    let foundPair = '';
    seenCards.forEach(function (value, key, map) {
        if (value == 2) {
            foundPair = key;
        }
      });
      return (foundPair == '') ? false : foundPair;
}

function highestCard(cards) {
    let highestCard = 0;
    for (let i = 0; i < cards.length; i++) {
        highestCard = Math.max(highestCard, cardValues.get(cards[i]));
    }
    return highestCard;
}

let file = syncReadFile('./input7.txt');
let hands = [];
let bids = [];
for (let i = 0; i < file.length; i++) { //for each line in the file
    let currHand = file[i].split(' ')[0];
    let currBid = file[i].split(' ')[1];
    hands.push(currHand);
    bids.push(currBid);
}
let totalWinnings = 0;
let fiveOfAKinds = [];
let fourOfAKinds = [];
let threeOfAKinds = [];
let fullHouses = [];
let twoPairs = [];
let onePairs = [];
let highCards = [];
for (let i = 0; i < hands.length; i++) { //for each hand
    if (testForFiveOfAKind(hands[i]) != false) {
        fiveOfAKinds.push([hands[i], bids[i]]);
    } else if (testForFourOfAKind(hands[i]) != false) {
        fourOfAKinds.push([hands[i], bids[i]]);
    } else if (testForFullHouse(hands[i]) != false) {
        fullHouses.push([hands[i], bids[i]]);
    } else if (testForThreeOfAKind(hands[i]) != false) {
        threeOfAKinds.push([hands[i], bids[i]]);
    } else if (testForTwoPair(hands[i]) != false) {
        twoPairs.push([hands[i], bids[i]]);
    } else if (testForOnePair(hands[i]) != false) {
        onePairs.push([hands[i], bids[i]]);
    } else {
        highCards.push([hands[i], bids[i]]);
    }
}

function compareCards(a, b) {
    return (cardValues.get(a) - cardValues.get(b));
}

function compareHands(a, b) {
    for (let i = 0; i < 5; i++) {
        if (compareCards(a[0][i], b[0][i]) != 0) {
            return (compareCards(a[0][i], b[0][i]));
        }
    }
    return a;
}


let currRank = 0;
highCards.sort(compareHands);
highCards.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
onePairs.sort(compareHands);
onePairs.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
twoPairs.sort(compareHands);
twoPairs.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
threeOfAKinds.sort(compareHands);
threeOfAKinds.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
fullHouses.sort(compareHands);
fullHouses.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
fourOfAKinds.sort(compareHands);
fourOfAKinds.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
fiveOfAKinds.sort(compareHands);
fiveOfAKinds.forEach(function (hand) {
    currRank++;
    totalWinnings += (hand[1] * currRank);
});
// console.log('hands:', hands, 'bids:', bids);
console.log('winnings: ', totalWinnings);