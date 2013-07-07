
// Create service Component to make REST calls
Application.factory('Component', function($resource){
  return $resource('/api/components/:componentId', {componentId:'@id'});
});


Application.controller('ComponentsLibraryCtrl', ['$scope', 'Component', '$http', function($scope, Component, $http) {

	$scope.components = Component.query();

	$scope.createComponent = function() {
		var formData = false;
		if (window.FormData)
        	formData = new FormData($("#newComponentForm"));  
        else
        	alert('dans le cul lulu');

        console.log(formData);
        formData.append("component", $scope.newComponent);
        $http.post('/api/components', formData).success(function(success) {
        	alert(success);
        }).error(function(err) {
        	alert(err);
        })

		//var newComponent = new Component($scope.newComponent);
		//newComponent.$save();
		//$('#newComponentForm').modal('hide')
	}
}]);