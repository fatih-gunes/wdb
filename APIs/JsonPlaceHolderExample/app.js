const request = require('request');

request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body) {
	//eval(require('locus'))
	if(!error && response.statusCode == 200) {
		const parsedData = JSON.parse(body);
		console.log(parsedData.name + " lives in " + parsedData.address.city);
	}
});

// another way with promise library
const rp = require('request-promise');

rp("https://jsonplaceholder.typicode.com/users/1")
.then((body) => {
	const parsedData = JSON.parse(body);
	console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
})
.catch((err) => {
	console.log("Error!", err);
});


