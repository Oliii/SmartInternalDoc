Application.controller('AdministrationCtrl', ['$scope', 'Component', function ($scope, Component) {
	
	$scope.components = Component.query();

	$scope.editComponent = function(c){

	}

	$scope.deleteComponent = function(c) {
		console.log(c);
		Component.delete({componentId: c._id});
	}
}]);