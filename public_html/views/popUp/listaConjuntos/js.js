candres.controller("listaConjuntos", function($scope, carga, popUp, $http) {
    carga.to($('#listaConjuntos'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_conjunto,ASC';
    $scope.take = 6;
    $scope.conjuntos = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_conjunto;
    $scope.filtro.nombre;
    $scope.filtro.nTono;
    $scope.filtro.tono;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;

    popUp.Wait().then(() => {
        $scope.buscaConjuntos();
        popUp.search = $scope.buscaConjuntos;
    });



    $scope.buscaConjuntos = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameConjuntos", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_conjunto: $scope.filtro.id_conjunto,
                Fid_producto: $scope.filtro.id_producto,
                Fnombre: $scope.filtro.nombre,
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
                    $scope.conjuntos = [];
                    temp.data.forEach(element => {
                        $scope.conjuntos.push(new Conjunto(element));
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
            carga.to($('#listaConjuntos'), 'mid', true);
            carga.play();
            $scope.buscaConjuntos();
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
        carga.to($('#listaConjuntos'), 'mid', true);
        carga.play();
        $scope.buscaConjuntos();
    };
    $scope.retornaConjuntos = function(id) {
        popUp.accept(id);
    }
    $scope.filtraConjuntos = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_conjunto';
        $scope.current_page = 1;
        $scope.order = 'id_conjunto,ASC';
        $scope.buscaConjuntos();
    }

});