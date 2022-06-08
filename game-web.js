"use strict";

const gameWeb = {
  loginPage: function (loginError) {
    return `
    <!doctype html>
    <html>
      <head>
          <link rel="stylesheet" href="styles.css"/>
      </head>
      <body>
      <div class="header">
      <h1>Welcome to the Word Guess Game</h1>
      <form action="/login" method="POST" id="login-form">
          Username: <input name="username" class="login-input">
          <p class="login-error">${(loginError === null) ? "" : loginError}</p>
          <button type="submit" class="login-button">Login</button>
      </form>
      </div>
      <script src="login-validation.js"></script>
      </body>
    </html>
  `
  }, 
  gamePage: function (username, game) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Word Guess Game</title>
          <link rel="stylesheet" href="styles.css"/>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to the Word Guess Game</h1>
            <p>You are logged in as <b>"${username}"</b></p> 
          </div>
          ${gameWeb.getWordList(game)}
          ${gameWeb.getOutgoing(game)}
          ${gameWeb.getGameState(game)}
          ${gameWeb.getNewGame()}
          <script src="game-validation.js"></script>
        </body>
      </html>
    `;
  },
  getWordList: function (game) {
    return `
        <ul class="word-list">` +
      Object.values(game.words).map(word => `
          <li >
          <span >${word}</span>
          </li>
        `).join('') + `</ul>`
  },
  getOutgoing: function (game) {
    if (game.state == 'completed') {
      return `<br/>`
    }
    return `
        <div class="guess-input">
            <form action="/guess" method="POST">
                <input class="guess-word-input" name= "guessword" placeholder="Enter a guess word from above list"/>
                <button class="submit-button" type="submit">SUBMIT</button>
                <p class="guess-word-input-error"></p> 
            </form>
        </div>
        `
  },
  getNewGame: function () {
    return `
      <div class="new-game">
          <form action="/new-game" method="POST">
              <button id ="Button" type="submit">New Game</button>
          </form>
      </div>
      <form action="/logout" method="POST" class="logout">
            <button type="submit">Logout</button>
        </form>
      `
  },
  getGameState: function (game) {
    const congratsMessage = game.state == 'completed' ? `<h2 class="win-message">🎉🎉🎉 Congrats!!, you won the game!</h2>` : ``
    const validGuesses = game.guesses.length + ` valid ${game.guesses.length > 1 ? `guesses` : `guess`}`
    return congratsMessage + `
      <ul class="game-guesses"><h2>Previous Guesses, ${validGuesses}</h2>` +
      Object.values(game.guesses.slice(0).reverse()).map((guess, index) => `
        <li>
          <div class="guess">
            <span class="guess-word-title">Attempt ${game.guesses.length - index}</span>
            <div class="guess-word-body">
              <span class="guess-word">Guess Word = ${guess.word} </span>
              <span class="guess-word-count"></br>Number of letter matched = ${guess.matchCount}</span>
            </div>
          </div>
        </li>
      `).join('') + `</ul>`;
  }
};


module.exports = gameWeb;