const words = require('./words');

const usersData = {

};

const users = {
    set: function (username) {
        usersData[username] = {
            guessedWord: [],
            answer: getRandomWord(),
            errorMessage: [],
            totalGuessCount: 0,
            isWon: false,
        }
    },
}

const getRandomWord = function () {
    const pickNum = Math.floor(Math.random() * words.length);
    const word = words[pickNum].toLowerCase();
    return word;
}


module.exports = {users, usersData};