candres.controller("listaDisenos", function($scope, carga, popUp, $http) {
    carga.to($('#listaDisenos'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_diseno,ASC';
    $scope.take = 6;
    $scope.disenos = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_diseno;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;
    $scope.filtro.nombre;
    $scope.filtro.estampado;
    $scope.filtro.bordado;
    $scope.filtro.timbrado;
    $scope.filtro.tallas;
    $scope.filtro.aplicacion;
    $scope.filtro.parche;
    $scope.filtro.sublimado;
    $scope.filtro.etiquetas;
    $scope.filtro.imgRef;
    popUp.Wait().then(() => {
        $scope.buscadisenos();
        popUp.search = $scope.buscadisenos;
    });
    $scope.buscadisenos = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameDisenos", {
                page: $scope.page,
                order: $scope.order,
                lista: "si",
                take: 6,
                Fid_diseno: $scope.filtro.id_diseno,
                Fcreated_at: $scope.filtro.created_at,
                Fupdated_at: $scope.filtro.updated_at,
                Fnombre: $scope.filtro.nombre,
                Fnombre: $scope.filtro.tallas,
                Festampado: $scope.filtro.estampado,
                Fbordado: $scope.filtro.bordado,
                Ftimbrado: $scope.filtro.timbrado,
                Faplicacion: $scope.filtro.aplicacion,
                Fparche: $scope.filtro.parche,
                Fsublimado: $scope.filtro.sublimado,
                Fetiquetas: $scope.filtro.etiquetas,
                FimgRef: $scope.filtro.imgRef,
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
                    $scope.disenos = [];
                    temp.data.forEach(element => {
                        $scope.disenos.push(new Diseno(element));
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
            carga.to($('#listaDisenos'), 'mid', true);
            carga.play();
            $scope.buscadisenos();
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
        carga.to($('#listaDisenos'), 'mid', true);
        carga.play();
        $scope.buscadisenos();
    };
    $scope.retornadisenos = function(id) {
        popUp.accept(id);
    }
    $scope.filtradisenos = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_diseno';
        $scope.current_page = 1;
        $scope.order = 'id_diseno,ASC';
        $scope.buscadisenos();
    }

});