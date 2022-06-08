const homePage = {
    startPage: function() {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="styles.css"/>
            <title>Word Guessing Game</title>
        </head>
        <body>
            <div class="start-page">
                <div class="heading">
                    <h1> Welcome! To play word guess game </h1>
                    <h1> GUESS THE SECRET WORD </h1>
                </div>
                <div class="start-game">
                    <form action="/" method="POST">
                        <input class="player-name" name="playername" value="" placeholder="Enter player name"/>
                        <button class="button" type="submit">START GAME</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}; 
module.exports = homePage;