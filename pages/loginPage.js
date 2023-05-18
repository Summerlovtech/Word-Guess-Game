const loginPage = {
    loginPage: function(message) {
      return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>Word Guess Game Login</title>
              <div class="web-title">
                <h1>Word Guess Game</h1>
              </div>
              <link rel="stylesheet" href="/login.css">
          </head>
          <body>
              <div id="login-app">
                ${message ? `<p class= "fail">${message} <p/>` : ""}</p>
                ${loginPage.login()}
              </div>
          </body>
          </html>
      `;
    },
 
      login:function(){
          return `<div class="login-page">
          <form action="/login" method="POST">
            <label class="input-label">Input Your User Name 
              <input type="text" name="username" placeholder="Username" required></input>
            </label>
            <button type="submit"> Login </button>
          </form>
        </div>`;
      },

  }

module.exports = loginPage;