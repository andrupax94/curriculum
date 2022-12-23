candres.controller("inicioSesion", function($scope, $window, $timeout, carga, validarService, andres, carga, popUp, $http) {
    $scope.usuario;
    $scope.contrasena;
    carga.to($('#popUpView'));
    carga.play();
    $timeout(function() {
        carga.pause();
    }, 1000);
    $scope.validar = validarService;
    $scope.crearCuenta = function() {
        $window.location.href = ANGULARHTML5 + '/crearCuenta';
    }
    $scope.iniciaSesion = function() {
        carga.play();
        carga.retry(arguments);
        $http.post("inicioSesion_logIn", {
                usuario: $scope.usuario,
                contrasena: $scope.contrasena
            })
            .then(function(response) {
                    temp = response.data;
                    setTimeout(function() {
                        carga.pause();
                    }, 1000)
                },
                function(error) {
                    carga.error();
                    console.log(error);
                });
    }


});