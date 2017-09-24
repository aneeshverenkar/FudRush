module.exports = Endpoints;
var rp = require('request-promise');
var yelpAPI = require('./yelp.js');
var database = require('./database.js');

function Endpoints(app){

   
    app.post('/updateAddress', function(req, res) {
        console.log(req.body.address);
        database.SetLocation("a@g.com", req.body.address);
        res.render('home.html', {address: req.body.address});

    });

    app.get('/address', function(req,res){
      
        
    })

    app.get('/test', function(req,res){

        var fRequest = 'suggest some cheap italian place to me';
        //Get request to LUIS
        var options = {
            method: 'GET',
            uri: 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/521f7b5d-b3d5-4340-91ef-7e4454ab2d89?subscription-key=109e12f042644e98af0902bf89b781ef&timezoneOffset=0&verbose=true&q='+fRequest,
        };
         
        rp(options)
            .then(function (parsedBody) {
             var intents = JSON.parse(parsedBody);
             //  console.log();
               var price = '1';
               if(intents.entities[1].entity == 'cheap'){
                   price = '1,2';
               }else if(intents.entities[1].entity == 'expensive'){
                   price = '3,4,5';
               }else{
                   price = '1';
               }
 
                //Yelp it!
              
           var location =   database.GetLocation("a@g.com", function(doc){
            console.log(doc.location);
            var location = doc.location;
            var restaurants = yelpAPI.SearchForBusinesses(location, price, intents.entities[0].entity);
             
             if(restaurants=='error'){
                 var r = 'Address not found. Please update it.';
                 res.send(r);
                 return;
             }
            
             var reply = 'There\'s ' +restaurants.businesses[0].name +' at '+restaurants.businesses[0].location.address1+'. It has a '+restaurants.businesses[0].rating+' star rating.';
             console.log(reply);
             res.send(reply);

        });
           
            })
            .catch(function (err) {
             res.send('Sorry, I did not find any near by.');
            });

    })

    app.post('/foodRequest', function(req, res) {
       // console.log();

       var fRequest = req.body.fRequest; //'suggest a cheap indian place to eat';
       //Get request to LUIS
       var options = {
           method: 'GET',
           uri: 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/521f7b5d-b3d5-4340-91ef-7e4454ab2d89?subscription-key=109e12f042644e98af0902bf89b781ef&timezoneOffset=0&verbose=true&q='+fRequest,
       };
        
       rp(options)
           .then(function (parsedBody) {
            var intents = JSON.parse(parsedBody);
            //  console.log();
              var price = '1';
              if(intents.entities[1].entity == 'cheap'){
                  price = '1,2';
              }else if(intents.entities[1].entity == 'expensive'){
                  price = '3,4,5';
              }else{
                  price = '1';
              }

               //Yelp it!
		     
		  //var location = database.GetLocation("testingthis@mail.net");   
		  var location = "500 S State St, Ann Arbor, MI 48109";
          var restaurants = yelpAPI.SearchForBusinesses(location, price, intents.entities[0].entity);
          // console.log(restaurants.businesses[0].name);
          if(restaurants=='error'){
            var r = 'Address not found. Please update it.';
            res.send(r);
            return;
        }
		  
           var reply = 'There\'s ' +restaurants.businesses[0].name +' at '+restaurants.businesses[0].location.address1+'. It has a '+restaurants.businesses[0].rating+' star rating.';
           console.log(reply);
           res.send(reply);
           })
           .catch(function (err) {
            res.send('Sorry, I did not find any near by.');
           });

             
        });

}