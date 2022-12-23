candres.controller("listaColores", function($scope, carga, popUp, $http) {
    carga.to($('#listaColores'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_color,ASC';
    $scope.take = 6;
    $scope.colores = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_color;
    $scope.filtro.nombre;
    $scope.filtro.nTono;
    $scope.filtro.tono;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;

    popUp.Wait().then(() => {
        $scope.buscaColores();
        popUp.search = $scope.buscaColores;
    });



    $scope.buscaColores = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameColores", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_color: $scope.filtro.id_color,
                Fnombre: $scope.filtro.nombre,
                FnTono: $scope.filtro.nTono,
                Ftono: $scope.filtro.tono,
                Fcreated_at: $scope.filtro.created_at,
                Fupdated_at: $scope.filtro.updated_at
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
                    $scope.colores = [];
                    temp.data.forEach(element => {
                        $scope.colores.push(new Color(element));
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
            carga.to($('#listaColores'), 'mid', true);
            carga.play();
            $scope.buscaColores();
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
        carga.to($('#listaColores'), 'mid', true);
        carga.play();
        $scope.buscaColores();
    };
    $scope.retornaColores = function(id) {
        popUp.accept(id);
    }
    $scope.filtraColores = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_color';
        $scope.current_page = 1;
        $scope.order = 'id_color,ASC';
        $scope.buscaColores();
    }

});