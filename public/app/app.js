var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: "/partials/main/main",
            controller: 'mainCtrl'
        })
        .when('/admin/users', {
            templateUrl: "/partials/admin/user-list",
            controller: 'mvUserListCtrl',
            resolve:{
                auth: function(mvIdentity, $q) {
                    if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') > -1){
                        return true;
                    } else{
                        return $q.reject('not authorized');
                    }
                }
            }
        });

});

angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized'){
            $location.path('/');
        }
    });
});

