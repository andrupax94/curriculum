candres.controller("home", function($scope, carga, andres, $http, page) {
    // Initialising the canvas

    $scope.page;
    page.dime().then(function() {
        $scope.page = page.name;
    });
    carga.pause();
});