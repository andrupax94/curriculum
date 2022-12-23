candres.controller("homeFormacion", function($rootScope, $scope, carga, page) {
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
        image: 'akacenter',
        inst: 'Akacenter Tenerife/ CertiPort/ Microsoft',
    });
    $scope.formaciones.push({
        bColor: '882fa5',
        titulo: 'Bases De Datos',
        headerColor: '68217a',
        image: 'akacenter',
        inst: 'Akacenter Tenerife/ Certiport',
    });
    carga.pause();
});