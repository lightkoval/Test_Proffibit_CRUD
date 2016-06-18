/**
 * Created by svetlana on 17.06.2016.
 */
'use strict';

var app = angular.module('app', ['ngRoute', 'router']);

app.controller('UserController', ['$scope', '$http','$location', function ($scope, $http, $location) {
    $scope.submit = function submit(user) {
        $http.post('/api/user', user).then(function success(response) {
            $scope.user = response.data;
            $location.path('/');
        });
    };

}]);

app.controller('UsersController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/users').then(function success(response) {
        $scope.users = response.data;
    })
}]);

app.controller('EditUserController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    $http.get('/api/users/' + $routeParams.id).then(function success(response) {
        $scope.user = response.data;
    });

    $scope.editUser = function editUser(user) {
        $http.put('/api/users', user).then(function success(response) {
            $location.path('/users')
        })
    };

    $scope.deleteUser = function deleteUser(user) {
        $http.delete('/api/users/' + user.id).then(function success(response) {
            $location.path('/users');
        })
    }


}]);