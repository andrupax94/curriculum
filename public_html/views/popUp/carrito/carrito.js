candres.controller("carrito", function($scope, carga, popUp, carrito, $http) {
    carga.to($('#carrito'), 'mid', true);
    carga.play();
    carga.pause();
    $scope.carrito = carrito[0];



});