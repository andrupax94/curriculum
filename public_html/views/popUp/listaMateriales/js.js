candres.controller("listaMateriales", function($scope, carga, popUp, $http) {
    carga.to($('#listaMateriales'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_material,ASC';
    $scope.take = 6;
    $scope.materiales = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_material;
    $scope.filtro.nombre;
    $scope.filtro.estructura;
    $scope.filtro.composicion;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;
    popUp.Wait().then(() => {
        $scope.buscaMateriales();
        popUp.search = $scope.buscaMateriales;
    });
    $scope.buscaMateriales = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameMateriales", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_material: $scope.filtro.id_material,
                Fnombre: $scope.filtro.nombre,
                Festructura: $scope.filtro.estructura,
                Fcomposicion: $scope.filtro.composicion,
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
                    $scope.materiales = [];
                    temp.data.forEach(element => {
                        $scope.materiales.push(new Material(element));
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
            carga.to($('#listaMateriales'), 'mid', true);
            carga.play();
            $scope.buscaMateriales();
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
        carga.to($('#listaMateriales'), 'mid', true);
        carga.play();
        $scope.buscaMateriales();
    };
    $scope.retornaMateriales = function(id) {
        popUp.accept(id);
    }
    $scope.filtraMateriales = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_material';
        $scope.current_page = 1;
        $scope.order = 'id_material,ASC';
        $scope.buscaMateriales();
    }

});