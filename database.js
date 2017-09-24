const goose = require('mongoose');
goose.connect('mongodb://mhacks:mhacks@ds040017.mlab.com:40017/fudrush', {useMongoClient: true});

var Schema = goose.Schema;
var ObjectId = Schema.ObjectId;

var Auth = new Schema ({
	email: String
}, {collection: 'Auth'});

var Locations = new Schema ({ 
	email: String,
	location: String
}, {collection: 'Locations'});

var KeyWords = new Schema ({
	email: String
}, {collection: 'KeyWords'} );

goose.model('Auth', Auth);
goose.model('Locations', Locations);
goose.model('KeyWords', KeyWords);
	
	
exports.CheckEmail = function (email, callback) { 
	goose.model('Auth').findOne({'email' : email}, function (err, doc) {
		if (err) { 
			callback(false);
		}
		else { 
			callback(true);
		};
	});
};


exports.GetLocation = function (email, callback) { 
	goose.model('Locations').findOne({'email' : email}, function (err, doc) { 
		if (err) { 
			callback();
		}
		else { 
			callback(doc);
		};
	});
};

exports.SetLocation = function (email, address) {
	exports.GetLocation(email, function (doc) { 
		if (doc) { 
			doc.location = address;
			doc.save();
		};
	});
};
	

exports.SetLocation("testingthis@mail.net", "16551 Dora Hamann Pkwy, Omaha NE 68116");