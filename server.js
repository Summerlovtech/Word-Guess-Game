const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const loginPage = require('./pages/loginPage');
const wordPage = require('./pages/wordPage');
const {users,usersData} = require('./users');
const game = require('./game');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

// Implement login flow
app.post('/login', (req,res)=> {
    const username = req.body.username.trim();
    let allowedUsername = new RegExp('^[A-Za-z0-9]*$');
    if ( !username ) {
        res.status(401).send(loginPage.loginPage(`Username can't be empty.`));
        return;
    }else if (username === 'dog') {
        res.status(401).send(loginPage.loginPage(`dog is not a valid username.`));
        return;
    }else if(!allowedUsername.test(username)) {
        res.status(401).send(loginPage.loginPage(`${username} is not a valid username. Please only use letters and numbers.`));
        return;
    } 
    const sid = uuid.v4();
    sessions[sid] = { username };
    res.cookie('sid', sid);
    res.redirect('/');
});

const sessions = {};

 // Implement home page
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!usersData[username]) {
            users.set(username);
        }
        const answer = usersData[username].answer;
        console.log(`At home page, logged in as ${username} and answer is ${answer}`);
        res.send(wordPage.guessedWord(username, usersData[username]));
        return;
    }
    res.send(loginPage.loginPage());
});

 // Implement guess logic
app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;

    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        users.set(username);
        res.redirect('/');
    } else {
        res.send(loginPage.loginFail('Please login at first!'));
    }
})

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!usersData[username]) {
            users.set(username);
        }
        const answer = usersData[username].answer;
        const guessedWord = req.body.guessedWord;
        game.checkValid(guessedWord,username);
        // wordPage.guessedWord;
        console.log(`logged in as ${username} and answer is ${answer}`);
        res.redirect('/');
        return;
    }
    res.send(loginPage.loginPage());
}),

  // Implement logout flow
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))