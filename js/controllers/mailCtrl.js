'use strict';

app.controller('mailCtrl', function($scope, mailService){
	$scope.errorLogin = false;
	
	$scope.sendMail = function(user){
		console.log(user)
		mailService.sendMail(user, $scope);
		document.getElementById('formGroupExampleInput').value=''; 
		document.getElementById('formGroupExampleInput2').value=''; 
		document.getElementById('formGroupExampleInput3').value=''; 
		document.getElementById('formGroupExampleInput4').value=''; 
		document.getElementById('exampleFormControlTextarea1').value=''; 
	}

	$scope.clearMsg = function(){
		$scope.errorLogin = false;
	}
});