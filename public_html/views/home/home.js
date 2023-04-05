candres.controller("home", function($scope, $location, $rootScope, carga, andres, $http, page) {
   // Initialising the canvas

   $scope.page;
   $scope.cambiaPage = function(pageName) {
      if ($scope.page !== pageName) {
         $scope.page = pageName;
         carga.to($('#pestañaPrincipal'), 'mid');
         carga.play();
         $location.path('/' + $rootScope.lang + '/' + pageName);
      }
   }
   page.dime().then(function() {
      $scope.page = page.name;
   });

   carga.pause();
});