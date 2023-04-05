candres.controller("homePersonales", function($scope, $routeParams, $rootScope, carga, page) {
   $scope.lang = $rootScope.lang;
   setTimeout(() => {
      carga.pause();
      $('.label,#descripcion>p,.adicionales').css('animation-play-state', 'running');
   }, 200);
});