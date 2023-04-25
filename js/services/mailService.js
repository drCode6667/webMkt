'use strict';

app.factory('mailService', function($http, $location){
	return{
		sendMail: function(user, $scope){
			var validate = $http.post('php/sendMail.php', user);
			validate.then(function(response){
				console.log("Soy response",response)
			});
		}
	}
});