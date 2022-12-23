candres.controller("listaModelo", function($scope, carga, popUp, $http) {
    carga.to($('#listaModelo'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_modelo,ASC';
    $scope.take = 6;
    $scope.modelos = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_modelo;
    $scope.filtro.nombre;
    $scope.filtro.tipo;
    $scope.filtro.linea;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;

    popUp.Wait().then(() => {
        $scope.buscaModelos();
        popUp.search = $scope.buscaModelos;
    });
    $scope.buscaModelos = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameModelos", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_modelo: $scope.filtro.id_modelo,
                Fnombre: $scope.filtro.nombre,
                Fcreated_at: $scope.filtro.created_at,
                Fupdated_at: $scope.filtro.updated_at,
                Ftipo: $scope.filtro.tipo,
                Flinea: $scope.filtro.linea,
            })
            .then(function(response) {
                    carga.pause();

                    temp = response.data;
                    $scope.last_page = temp.last_page;
                    $aux = [];
                    for (var i = 1; i <= $scope.last_page; i++) {
                        $aux.push(i);
                    }
                    $scope.last_page = $aux;
                    $scope.current_page = temp.current_page;
                    $scope.modelos = [];
                    temp.data.forEach(element => {
                        $scope.modelos.push(new Modelo(element));
                    });
                },
                function(error) {
                    carga.error();
                    console.log(error);
                    carga.pause();

                });
    }
    $scope.cambiaPagina = function(page) {
        if (page <= $scope.last_page.length && page > 0) {
            $scope.page = page;
            carga.to($('#listaModelo'), 'mid', true);
            carga.play();
            $scope.buscaModelos();
        }
    };
    $scope.orderByChange = function(order) {
        if (order === $scope.orderBy.selected) {
            if ($scope.orderBy.aD === 'DESC') {
                $scope.orderBy.aD = 'ASC';
            } else {
                $scope.orderBy.aD = 'DESC';
            }
        } else {
            $scope.orderBy.aD = 'ASC';
        }
        $scope.orderBy.selected = order;
        $scope.order = $scope.orderBy.selected + ',' + $scope.orderBy.aD;
        carga.to($('#listaModelo'), 'mid', true);
        carga.play();
        $scope.buscaModelos();
    };
    $scope.retornaModelos = function(id) {
        popUp.accept(id);
    }
    $scope.filtraModelos = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_modelo';
        $scope.current_page = 1;
        $scope.order = 'id_modelo,ASC';
        $scope.buscaModelos();
    }

});