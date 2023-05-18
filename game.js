/*All the functions about the word game*/
/*Game: contains the state of a single game, 
including the secret word, previous guesses, and score.*/
const words = require('./words');
const {usersData} = require('./users');

const game = {
    checkValid: function (guessedWord,username) {
        const currentWord = guessedWord;
        const secretWord = usersData[username].answer;
        visitedWords = usersData[username].guessedWord;
        const found = visitedWords.some(guess => guess.currentWord === currentWord);
        if (!words.includes(currentWord)) {
            usersData[username].errorMessage.push(`${currentWord} is invalid, please check Word List.`);
            visitedWords.push({currentWord,matchedLetters:-1});
        } else if(!found && currentWord !== secretWord) {
            const matchedLetters = game.compareWord(currentWord, secretWord);
            visitedWords.push({currentWord,matchedLetters});
            usersData[username].totalGuessCount += 1;
            console.log(visitedWords);
            usersData[username].errorMessage.push(`${currentWord} is incorrect, please try again!`); 
        } else if(found) {
            usersData[username].errorMessage.push(`${currentWord} has been guessed, please try again!`);
            visitedWords.push({currentWord,matchedLetters:-1});
        } else{
            usersData[username].isWon = true;
            usersData[username].totalGuessCount += 1;
            visitedWords.push({currentWord,matchedLetters:-2});
            usersData[username].errorMessage.push("");
        }
    },

    compareWord: function (guess, word) {
        if (word === null || word === undefined || guess === null || guess === undefined) {
            return 0;
        }
        let count = 0;
        const word1 = word.toLowerCase();
        const word2 = guess.toLowerCase();
        const dict = {}; 
        // Creating a dictionary of each letter in the word
        
        if ( word1 === word2 ) {
            return word.length;
        } else {
            for ( let char in word1) { 
                if (dict.hasOwnProperty(word1[char])) {
                let key = word1[char];
                dict[key] += 1;
                } else {
                dict[word1[char]] = 1;
                }
            }
        }
        
        for ( let char in word2) {
            if (dict.hasOwnProperty(word2[char])) {
              if (dict[word2[char]] > 0) {
                dict[word2[char]] -= 1;
                count ++;
                }   
            }
        }
        return count;
    },
}

module.exports = game;