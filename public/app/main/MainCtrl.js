app.controller('mainCtrl', function($scope) {
   
   $scope.courses = [
    {name: 'C# for Sociopaths', featured: true, published: new Date('12/12/2015')},
    {name: 'C# for non-socipaths', featured: false, published: new Date('12/12/2015')}

   ];

});