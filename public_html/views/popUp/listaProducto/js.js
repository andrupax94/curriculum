candres.controller("listaProducto", function($scope, carga, popUp, $http) {
    carga.to($('#listaProducto'), 'mid', true);
    carga.play();
    $scope.page = 1;
    $scope.order = 'id_producto,ASC';
    $scope.take = 6;
    $scope.productos = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id_producto = "";
    $scope.filtro.codigo = "";
    $scope.filtro.nombre = "";
    $scope.filtro.genero = "";

    $scope.filtro.tallas = "";
    $scope.filtro.categoria = "";
    $scope.filtro.modelo = "";
    $scope.filtro.diseno = "";
    $scope.filtro.material = "";
    $scope.filtro.updated_at = "";
    popUp.Wait().then(() => {
        $scope.buscaProductos();
        popUp.search = $scope.buscaProductos;
    });
    $scope.buscaProductos = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameProductos", {
                page: $scope.page,
                order: $scope.order,
                take: 6,
                Fid_producto: $scope.filtro.id_producto,
                Fcodigo: $scope.filtro.codigo,
                Fnombre: $scope.filtro.nombre,
                Fgenero: $scope.filtro.genero,

                Ftallas: $scope.filtro.tallas,
                Fcategoria: $scope.filtro.categoria,
                Fmodelo: $scope.filtro.modelo,
                Fdiseno: $scope.filtro.diseno,
                Fmaterial: $scope.filtro.material,
                Fupdated_at: $scope.filtro.updated_at
            })
            .then(function(response) {
                    temp = response.data;
                    $scope.last_page = temp.last_page;
                    $aux = [];
                    for (var i = 1; i <= $scope.last_page; i++) {
                        $aux.push(i);
                    }
                    $scope.last_page = $aux;
                    $scope.current_page = temp.current_page;
                    $scope.productos = [];
                    temp.data.forEach(element => {
                        $scope.productos.push(new Producto(element));
                    });
                    carga.pause();
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
            carga.to($('#listaProducto'), 'mid', true);
            carga.play();
            $scope.buscaProductos();
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
        carga.to($('#listaProducto'), 'mid', true);
        carga.play();
        $scope.buscaProductos();
    };
    $scope.retornaProducto = function(id) {
        popUp.accept(id);
    }
    $scope.filtraProducto = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id_producto';
        $scope.current_page = 1;
        $scope.order = 'id_producto,ASC';
        $scope.buscaProductos();
    }

});