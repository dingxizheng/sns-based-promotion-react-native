var {Resource, ResourceConfig} = require('./Resource');

Resource.addBeforeAction(function(request) {
	return request;
});

Resource.addBeforeAction(function(request) {
	if(request.options && request.options.body && typeof request.options.body !== 'string') {
		request.options.body = JSON.stringify(request.options.body)
	}
	return request;
});

Resource.addAfterAction(async function(request, response) {
	if (response.status !== 200 && response.status !== 201) {
		console.log(await response.json());
		throw response;
	}
	return response;
});

var User = new Resource("http://localhost:3000/v1/users");

// var user1 = new User('56b3ea503afabf5c42000000');

// user1.fetch().then(function (jsons) {
// 	// console.log(user1.get("id"));
	
// 	user1.set({ name: "dingxizheng"}).save().then(function(js) {
// 		console.log(js);
// 	});
// }).catch(function (e) {
// 	console.log(e);
// });

User.fetchAll().then(function(list) {
	return list[0].fetch()
})
.then(function(j) {
	console.log(j);
})
.catch(function(e) {
	console.log(e);
});