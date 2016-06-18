/**
 * Created by svetlana on 18.06.2016.
 */
var router = angular.module('router', ['ngRoute']);

router.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UserController'
        })
        .when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'UsersController'
        })
        .when('/edit/:id', {
            templateUrl: 'partials/edit-user.html',
            controller: 'EditUserController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);