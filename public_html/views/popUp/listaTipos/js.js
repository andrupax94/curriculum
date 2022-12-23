candres.controller("listaTipos", function($scope, carga, popUp, $http) {
    carga.to($('#listaTipos'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_tipo,ASC';
    $scope.take = 6;
    $scope.tipos = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_tipo;
    $scope.filtro.nombre;
    $scope.filtro.nTono;
    $scope.filtro.tono;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;
    popUp.Wait().then(() => {
        $scope.buscaTipos();
        popUp.search = $scope.buscaTipos;
    });
    $scope.buscaTipos = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameTipos", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_tipo: $scope.filtro.id_tipo,
                Ftipo: $scope.filtro.tipo,
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
                    $scope.tipos = [];
                    temp.data.forEach(element => {
                        $scope.tipos.push(new Tipo(element));
                    });
                },
                function(error) {
                    carga.error();
                    console.log(error);
                    carga.pause();

                });
    }
    $scope.cambiaPagina = function(page) {
        $scope.page = page;
        carga.to($('#listaTipos'), 'mid', true);
        carga.play();
        $scope.buscaTipos();
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
        carga.to($('#listaTipos'), 'mid', true);
        carga.play();
        $scope.buscaTipos();
    };
    $scope.retornaTipos = function(id) {
        popUp.accept(id);
    }
    $scope.filtraTipos = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_tipo';
        $scope.current_page = 1;
        $scope.order = 'id_tipo,ASC';
        $scope.buscaTipos();
    }

});