module.exports = OAuth;

function OAuth(app){


var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
 clientId: 'a7543547e3dad9c0ebc8',
 clientSecret: 'bed2d4261be6e4bc9421fafdbf4e6d033cd930ba',
 accessTokenUri: 'https://github.com/login/oauth/access_token',
 authorizationUri: 'https://github.com/login/oauth/authorize',
 redirectUri: 'http://example.com/auth/github/callback',
 scopes: ['user']
})

app.get('/auth/github', function (req, res) {   
    var uri = githubAuth.code.getUri()
   
    res.redirect(uri)
  })

  app.get('/auth/github/callback', function (req, res) {
    githubAuth.code.getToken(req.originalUrl)
      .then(function (user) {
        console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... } 
   
        // Refresh the current users access token. 
        user.refresh().then(function (updatedUser) {
          console.log(updatedUser !== user) //=> true 
          console.log(updatedUser.accessToken)
        })
   
        // Sign API requests on behalf of the current user. 
        user.sign({
          method: 'get',
          url: 'http://example.com'
        })
   
        // We should store the token into a database. 
        return res.send(user.accessToken)
      })
  })

}