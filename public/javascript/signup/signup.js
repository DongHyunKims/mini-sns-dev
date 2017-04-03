var button = document.querySelector('.signup');
button.addEventListener('click', function(evt){
	console.log("signup button event");
	
	var form = document.querySelector('form');
	var email = form[0].value;
	var password = form[1].value;
	var nickname = form[2].value;
	var name = form[3].value;
	var url = "http://127.0.0.1:3000/signup/insertSignup";
	var data = {
		'email':email,
		'password':password,
		'nickname':nickname,
		'name':name
	};
	console.log(data);
	insertSignup(url, data);
		
})

function insertSignup(url, data){
	data = JSON.stringify(data);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type',"application/json");
	xhr.send(data);
	xhr.addEventListener('load', function(evt){
		console.log("xhr load event");
})
}