const words = require('../words');
const {usersData} = require('../users');

const wordPage = {
    wordPage: function(username) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head class="head">
            <meta charset="UTF-8">
            <title>Word Guess Game</title>   
                <nav>
                <ul>
                    <li><a href="#">${username}</a></li>
                    <li><a href="#">${wordPage.logout()}</a></li>
                </ul>
                </nav>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <header id="web-title">Word Guess Game</header>
                <div id="word-guess-app">
                ${wordPage.guessedWord()}
                </div>      
        </body>
        </html>`;
    },

    logout: function() {
        return `<div class="log-out">
            <form action="/logout" method="POST">
                <button type="submit">Logout</button>
            </form>
        </div>`
    },


    guessedWord: function (username, list) {
        let data = '<p>';
        data += words.join(' ');
        data += '</p>';
        
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title class="head-title">Guess Word Game</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="guess-page">
                <div class="headerSection">
                    <h2 class="head-title">Guess Word Game</h2>
                    <p class="user-info">Username: ${username}</p>
                    <div class="option">
                        <form action="/logout" method="POST"><button type="submit">Logout</button></form>
                    </div>
                </div>
                <div class="word-list">
                    <h3 class="word-list-title">Word List</h3>
                    ${data}
                </div>
                <div class="guess-list">
                <h3 class="guess-list-title">Guess List</h3>
                <span class="number-guess"> The total number of valid guesses is ${usersData[username].totalGuessCount}</span>
                <div class="start-new-game">
                    <form action="/new-game" method="POST">
                        <button type="submit"> Start a New Game! </button>
                    </form>
                </div>
                    <div class="guess-history"> ` +
                    Object.values(usersData[username].guessedWord). map((guess,index) =>
                        `<div class="history-item">
                            <span class="use-guess">Your guess is: ${guess.currentWord}</span> 
                            <span class="num-match">${guess.matchedLetters === -1 ? "--------------------------------------------" : guess.matchedLetters === -2 ? "You got the secret word!" : `${guess.matchedLetters} letter/letters matched in your guess`} </span>
                            <span class = "error-massage">${usersData[username].errorMessage[index]}</span>
                        </div>
                        `
                    ).join('')
                +`</div>    
                <div class="your-guess">
                    <input class="wrapper" type="hidden" name="answer">
                    ${usersData[username].isWon ? `<p class= "success">Congratulations! You got the right word!</p>` : 
                    `
                        <form class="input-form" action="/guess" method="POST">
                            <label> Your Guess:</label>
                            <input class="input-guess-text" name="guessedWord" value="" placeholder="Please input your guess" required/>
                            <button type="submit">Submit</button>
                        </form>
                    `}
                </div>
                </div>
                ${usersData[username].isWon ? `<img class= "successImg" src="background.jpeg">` : ``}
        </body>
        </html> `
    },
    
}

module.exports = wordPage;