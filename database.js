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

exports.UpdateLocation = function (address) { 
	var email = "testingthis@mail.net";
	goose.model('Locations').findOne({'email' : email}, function (err, doc) { 
		if (err) { 
			callback();
		}
		else { 
			doc.location = address;
			doc.save();
			return true;
			//callback(doc);
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

exports.GetLocation("testingthis@mail.net", function (doc) { 
	if (doc) { 
		doc.location = '500 S State St, Ann Arbor, MI 48109';
		doc.save();
		console.log(doc.location);
	};
});
