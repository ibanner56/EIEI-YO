"use strict";
(function() {
    var app = angular.module('eieio', ['ui.bootstrap']);

    app.controller('ChatCtrl', ['$http', '$scope', '$timeout', '$uibModal', function($http, $scope, $timeout, $uibModal) {
	window.scope = $scope;
	$scope.user = {};
	$scope.user.Name = "";
	$scope.user.Email = "";
	$scope.user.Messages = [];

	$scope.sendee = {}
	$scope.sendee.Name = "";
	$scope.sendee.Email = "";

	$scope.rhymeline = [{name: "Isaac", quote: "Jack be quick."}, {name: "Varun", quote: "Jack be nimble."}];
	
	$timeout(function(){
	    $http({
	        method: 'GET',
	        url: '/getquotes/'
	    }).then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
	    }, function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status
	    });
	    $scope.rhymeline = [{name: "Isaac", quote: "Jack be quick."}, {name: "Varun", quote: "Jack be nimble."}];
	},5000);

	$scope.eieiu = function(){
	    $scope.quotes = {};
	    $scope.quotes.rhymepos = "Now I know my ABCs.";
	    $scope.quotes.rhymeneg = "I lost my poor meatball when somebody sneezed.";
	    
	    var modalInstance = $uibModal.open({
      		animation: true,
      		templateUrl: 'sendquote.html',
      		controller: 'SendCtrl',
      		size: 'lg',
      		resolve: {
        	    quotes: function () {
          		return $scope.quotes;
        	    }
      	    	}
    	    });

    	    modalInstance.result.then(function (selectedItem) { 
		$scope.selected = selectedItem;
		$http({
  		    method: 'GET',
  		    url: '/someUrl'
		}).then(function successCallback(response) {
    		    // this callback will be called asynchronously
    		    // when the response is available
  		}, function errorCallback(response) {
    		    // called asynchronously if an error occurs
    		    // or server returns response with an error status.
  		});
		console.log(selectedItem);
    	    });	
	}

	$scope.messages = function(){
	    var modalInstance = $uibModal.open({
		animation: true,
		templateUrl: 'messages.html',
		controller: 'MessagesCtrl',
		size: 'lg',
		resolve: {
		    messages: function () {
		    	return $scope.user.messages;
		    }
		}
	    });
	}
    }]);

    app.controller('SendCtrl', function($scope, $uibModalInstance, quotes) {
	$scope.quotes = quotes;
	$scope.happy = function() {
	    $uibModalInstance.close(quotes.rhymepos);
	}
	$scope.sad = function() {
	    $uibModalInstance.close(quotes.rhymeneg);
	}
    });

    app.controller('MessagesCtrl', function($scope, $uibModalInstance, messages) {
	$scope.messages = messages;
    });

})();
