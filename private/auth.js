const formurl_encode = require('form-urlencoded');
const http = require('http');
const sync = require('sync-request');

exports.auth_data = formurl_encode({
			grant_type: 'client_credentials', 
			client_id: 'enTwpl01W2O6OD8hGnf71A',
			client_secret: 'EGOXQxildoE6FnC6c7cE2crZIZ7MIyqIpy6bYvTW4GHCdbBPZJ2VS9CcoNeAg882', 
	});
exports.auth_url = 'https://api.yelp.com/oauth2/token';

exports.GenerateAccessToken = function (data) { 
	var res = sync('POST', exports.auth_url, {body: data});
	var res_data = JSON.parse(res.getBody('utf8'));
	exports.AccessToken = res_data["access_token"];
	exports.AuthHeader = "Bearer " + exports.AccessToken;
}	

exports.GenerateAccessToken(exports.auth_data);
