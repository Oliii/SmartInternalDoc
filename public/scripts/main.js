var Application = angular.module('SmartInternalDoc', []);

Application.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	  when('/', {templateUrl: 'views/ManageDoc.html',   controller: ManageDocCtrl}).
      when('/ManageDoc', {templateUrl: 'views/ManageDoc.html',   controller: 'ManageDocCtrl'}).
      when('/ComponentsLibrary', {templateUrl: 'views/ComponentsLibrary.html',   controller: 'ComponentsLibraryCtrl'}).
      when('/Graphics', {templateUrl: 'views/Graphics.html',   controller: 'GraphicsCtrl'}).
      when('/Administration', {templateUrl: 'views/Administration.html',   controller: 'AdministrationCtrl'}).
      otherwise({redirectTo: '/'});
}]);

function mainController($scope) {


}

mainController.$inject = ['$scope'];

function GraphicsCtrl($scope) {

}

function AdministrationCtrl($scope) {
	
}