const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;

const gameWeb = require('./game-web');
const gameController = require('./game-controller');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        const game = gameController.getGame(username)
        res.send(gameWeb.gamePage(username, game));
        return;
    }
    res.send(gameWeb.loginPage(null));
})

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        gameController.deleteGame(username)
    }
    res.redirect('/');
});

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;
        const guessedWord = req.body.guessword.trim();
        gameController.guess(username, guessedWord);
    }
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const regex = /^[a-z0-9]+$/i;
    const found = username.match(regex);

    if (username.toLowerCase() === 'dog' || !username) {
        res.status(401).send(gameWeb.loginPage("Invalid username"));
        return;
    }
    if (!found) {
        res.status(401).send(gameWeb.loginPage("Invalid username, only alphanumeric characters allowed"));
        return;
    }
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.cookie('sid', null);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));