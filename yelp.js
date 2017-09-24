'use strict';
const http = require('http');
const sync = require('sync-request');
const formurl_encode = require('form-urlencoded');
const auth = require('./private/auth.js');
const businesses_search_url = 'https://api.yelp.com/v3/businesses/search';
const businesses_id_url = 'https://api.yelp.com/v3/businesses/';


exports.SearchForBusinesses = function (location, price_range, keywords, term) { 
	var sorting = 'best_match';
	if (!term) { 
		term = "restaurants";
		sorting = 'rating';
	};
	var res = sync('GET', businesses_search_url, {
		headers: { 
			Authorization: auth.AuthHeader
		},
		qs: {
			'location': location,
			'term': term,
			categories: keywords,
			'price': price_range,
			sort_by: sorting,
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

