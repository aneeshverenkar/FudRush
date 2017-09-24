module.exports = Endpoints;

function Endpoints(app){

    app.post('/foodRequest', function(req, res) {
       // console.log();

        //Get request to LUIS
        // var options = {
        //     method: 'GET',
        //     uri: 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/521f7b5d-b3d5-4340-91ef-7e4454ab2d89?subscription-key=109e12f042644e98af0902bf89b781ef&timezoneOffset=0&verbose=true&q='+fRequest,
        // };
         
        // rp(options)
        //     .then(function (parsedBody) {
        //         // POST succeeded...
        //     })
        //     .catch(function (err) {
        //         // POST failed...
        //     });


        
             res.send(req.body.fRequest);
        });

}