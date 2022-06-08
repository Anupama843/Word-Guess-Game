"use strict";
module.exports = compare;

function compare(word, guess) {
  
  const wordObject = {};
  for (let i = 0; i < word.length; i++) {
    const char = word.charAt(i).toLowerCase();
    if (char in wordObject) {
      wordObject[char] = wordObject[char] + 1;
    } else {
      wordObject[char] = 1;
    }
  }

  const guessObject = {};
  for (let i = 0; i < guess.length; i++) {
    const char = guess.charAt(i).toLowerCase();
    if (char in guessObject) {
      guessObject[char] = guessObject[char] + 1;
    } else {
      guessObject[char] = 1;
    }
  }

  let count = 0
  for (const key of Object.keys(wordObject)) {
      if (key in guessObject) {
        count += Math.min(wordObject[key], guessObject[key]);
      }
  }
  
  return count; 
}

