'use strict';
const http = require('http');
const sync = require('sync-request');
const formurl_encode = require('form-urlencoded');
const auth = require('./private/auth.js');
const businesses_search_url = 'https://api.yelp.com/v3/businesses/search';
const businesses_id_url = 'https://api.yelp.com/v3/businesses/';


exports.SearchForBusinesses = function (location, price_range, keywords) { 
	var res = sync('GET', businesses_search_url, {
		headers: { 
			Authorization: auth.AuthHeader
		},
		qs: {
			'location': location,
			term: "restaurants",
			categories: keywords,
			'price': price_range,
			sort_by: 'rating',
			open_now: true
		}
	});
	return JSON.parse(res.getBody('utf8'));
}

exports.GetBusinessData = function (id) { 
	var res = sync('GET', businesses_id_url + id, {
		headers: { 
			Authorization: auth.AuthHeader
		}
	});
	return JSON.parse(res.getBody('utf8'));
}


var res = exports.SearchForBusinesses("16551 Dora Hamann Pkwy, Omaha NE, 68116", "1, 2, 3", "italian");
for (var i = 0; i < res.businesses.length; i++) {  
	console.log(res.businesses[i].name);
	console.log(res.businesses[i].rating);
}