Application.controller('ComponentsLibraryCtrl', function($scope, $http) {

	$scope.GetAll = function() {
		$http.get('/api/component').success(function(data) {
			console.log(data);
		})
		.error(function(err) {
			console.log(err);
		});
	}
});