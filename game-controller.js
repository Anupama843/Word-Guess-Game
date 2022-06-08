"use strict";
const words = require('./words');
const compare = require('./compare');

const games = {};

function getSecretWord() {
    const rendomIndex = Math.floor(Math.random() * words.length-1);
    return words[rendomIndex];
}

function createNewGame() {
    let secretWord = getSecretWord();
    let guesses = [];
    let state = "inProgress";
    return {
        words,
        secretWord,
        guesses,
        state
    }
}

function performGuess(game, guessedWord) {
    const matchCount = compare(game.secretWord, guessedWord);
    const isValidGuess = (game.words.some( word => word === guessedWord.toLowerCase()));
    game.guesses.push({"word": guessedWord, "matchCount": matchCount, "isValid": isValidGuess});
    if (guessedWord.toLowerCase() == game.secretWord.toLowerCase()) {
        game.state = "completed";
    }
}

const gameController = {
    guess: function(username, guessedWord) {
        const game = games[username];
        performGuess(game, guessedWord);
    },

    getGame: function (username) {
        if (games[username]) {
            return games[username];
        }
        const newGame = createNewGame();
        games[username] = newGame;
        console.log("\nNew Game with")
        console.log("username = " + username)
        console.log("secretWord = " + newGame.secretWord + "\n")
        return newGame;
    },

    deleteGame: function (username) {
        delete games[username];
    }
};

module.exports = gameController;


