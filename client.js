"use strict";

var soap = require('soap');
var readline = require('readline');
var url = 'http://localhost:3000/login?wsdl';

soap.createClient(url, function(error, client) {
	if(error){
		throw error;
	}

	// var readAccountData = readline.createInterface({
	// 	input: process.stdin,
	// 	output: process.stdout
	// });
	// var stdin = process.openStdin();

	// stdin.addListener("data", function(d) {
	//     // note:  d is an object, and when converted to a string it will
	//     // end with a linefeed.  so we (rather crudely) account for that  
	//     // with toString() and then trim() 
	//     console.log("you entered: [" + 
	//         d.toString().trim() + "]");
	//   });

	var email;
	var password;

	console.log(email);
	console.log(password);

	var rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('guess> ');
	rl.prompt();
	rl.on('line', function(line) {
		if(email == 'undefined')
			// console.log("Enter email: ");
			email = line;
		else if(password == 'undefined')
			// console.log("Enter password: ");
			password = line;
		else {
			var data = {
				email: email,
				password: password
			}

			client.describe().LoginService.loginPort;
			client.login(data, function(error, response){
				if(error) throw error;

				console.log(response);
			})
			process.exit(0);
		}

	    rl.prompt();
	}).on('close',function(){
	    process.exit(0);
	});

	// readAccountData.question("Please enter your email: ", function(answer) {
	// 	email = answer;
	// 	readAccountData.close();
	// });
	// readAccountData.question("Please enter your password: ", function(answer) {
	// 	password = answer;
	// 	readAccountData.close();
	// });

	
})