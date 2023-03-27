candres.controller("homeFormacion", function($rootScope, $scope, carga, andres, page, $timeout) {
    $scope.formaciones = [];
    $scope.formaciones.push({
        bColor: '4691db',
        titulo: 'Ing. De Sistemas',
        headerColor: '3369aa',
        image: 'mariño',
        inst: 'I.U.P. Santiago Mariño',
    });
    $scope.formaciones.push({
        bColor: 'f29200',
        titulo: 'Adobe Illustrator Basic',
        headerColor: '995c00',
        image: 'drgraphic',
        inst: 'Dr. Graphic',
    });
    $scope.formaciones.push({
        bColor: '3cbce7',
        titulo: 'Azure AZ-900',
        headerColor: '0baae2',
        image: 'akacentermi',
        inst: 'Akacenter Tenerife/ CertiPort/ Microsoft',
    });
    $scope.formaciones.push({
        bColor: '882fa5',
        titulo: 'Bases De Datos',
        headerColor: '68217a',
        image: 'akacenter',
        inst: 'Akacenter Tenerife/ Certiport',
    });
    $scope.formaciones.push({
        bColor: '41CC00',
        titulo: 'Ingles B1',
        headerColor: '11A31B',
        image: 'akacenterox',
        inst: 'Oxford/Akacenter Tenerife',
    });

    $scope.atras = function(valor) {
        switch (valor) {
            case 0:
                andres.anima('#titulo', true);
                $timeout(() => {
                    $scope.titulo = false;
                }, 500);
                break;
            case '1':

                carga.pause();
                break;
            case '2':
                carga.pause();
                break;
            case '3':
                carga.pause();
                break;
            default:
                carga.pause();
                break;
        }
    }
    $scope.titulo = false;
    $scope.formacionClick = function(valor) {
        carga.to($('#homeFormacion'));
        carga.play();

        switch (valor) {
            case 0:
                $timeout(() => {
                    carga.pause();
                    $scope.titulo = valor;
                    andres.anima('#titulo');
                }, 500);
                break;
            case '1':
                carga.pause();
                break;
            case '2':
                carga.pause();
                break;
            case '3':
                carga.pause();
                break;
            default:
                carga.pause();
                break;
        }
    }
    setTimeout(() => {
        for (let i = 0; i <= $('.formaciones').length; i++) {
            $('.formaciones').eq(i).css('animation-delay', 0.3 * i + 's');

        }
        andres.anima('.formaciones');
        carga.pause();
    }, 200);
});