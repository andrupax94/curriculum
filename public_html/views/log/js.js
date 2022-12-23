candres.controller("log", function($scope, MLS, carga, $http, validarService, mFHTML) {

    $scope.validar = validarService;
    MLS.set(1);
    $scope.infoError = "";
    carga.pause();
    $scope.page = 1;
    $scope.order = 'id,ASC';
    $scope.take = 6;
    $scope.logs = [];
    $scope.last_page;
    $scope.orderBy = [];
    $scope.orderBy.selected;
    $scope.orderBy.aD;
    $scope.filtro = [];
    $scope.filtro.id;
    $scope.filtro.error;
    $scope.filtro.linea;
    $scope.filtro.archivo;
    $scope.filtro.created_at;
    $scope.filtro.updated_at;
    $scope.tipoErrorPHP = true;
    $scope.tipoErrorJavascript = true;
    $scope.erroresTiempo = "todos";
    $scope.fechaIni = "";
    $scope.fechaFinal = "";

    $scope.buscaLogs = function() {
        carga.retry(arguments);
        $http.post(DURL + "api/dameLogs", {
                page: $scope.page,
                order: $scope.order,
                take: 6,
                Fid: $scope.filtro.id,
                Ferror: $scope.filtro.error,
                Flinea: $scope.filtro.linea,
                Farchivo: $scope.filtro.archivo,
                Fcreated_at: $scope.filtro.created_at,
                Fupdated_at: $scope.filtro.updated_at,
                SFtipoErrorPHP: $scope.tipoErrorPHP,
                SFtipoErrorJavascript: $scope.tipoErrorJavascript,
                SFerroresTiempo: $scope.erroresTiempo,
                SFfechaIni: $scope.fechaIni,
                SFfechaFinal: $scope.fechaFinal,
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
                    $scope.logs = [];
                    temp.data.forEach(element => {
                        $scope.logs.push(new Log(element));
                    });
                    carga.pause();
                },
                function(error) {
                    carga.error();
                    console.log(error);
                    carga.pause();

                });
    }

    $scope.buscaLogs();
    $scope.buscaLog = function(id) {

        carga.to($('#vistaPrevia'), 'small', true);
        carga.play();
        for (i = 1; i < arguments.length; i++) {
            result += arguments[i] + separator;
        }
        carga.retry(arguments);
        $http.post(DURL + "api/dameLog", {
                id: id
            })
            .then(function(response) {
                    carga.pause();
                    $scope.infoError = response.data;
                },
                function(error) {

                    carga.error();
                });

    }

    $scope.cambiaPagina = function(page) {
        $scope.page = page;
        carga.to($('#listaLog'), 'mid', true);
        carga.play();
        $scope.buscaLogs();
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
        carga.to($('#listaLog'), 'mid', true);
        carga.play();
        $scope.buscaLogs();
    };
    $scope.retornaLog = function(id) {

    }
    $scope.filtraLog = function() {
        $scope.orderBy.aD = 'ASC';
        $scope.orderBy.selected = 'id';
        $scope.current_page = 1;
        $scope.order = 'id,ASC';
        $scope.buscaLogs();
    }
});