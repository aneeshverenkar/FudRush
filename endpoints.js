module.exports = Endpoints;

function Endpoints(app){

    app.post('/foodRequest', function(req, res) {
        //console.log(request.body.request);
        
             res.send("OK!");
        });

}