candres.controller("homeExperiencia", function($rootScope, $scope, carga, andres, page) {
    $scope.experiencia = [];
    $scope.experiencia.push({
        puesto: 'Tecnico De Informatica',
        empresa: 'Creaciones Yleym C.A. Santa Cruz De Aragua,Venezuela',
        funciones: ['Configuracion De Red LAN', 'Soporte Tecnico General.', 'Configuracion De Hosting Y Dominio Local en Windows Server'],
        periodo: '5/2012-9/2015',
    });
    $scope.experiencia.push({
        puesto: 'Tecnico De Sistemas',
        empresa: 'Ascardin C.A(Maracay,Venezuela)',
        funciones: ['Desarrollo De Aplicacion PHP Local Para el control de historias medicas',
            'Soporte Tecnico General'
        ],
        periodo: '10/2017-2/2018',
    });
    $scope.experiencia.push({
        puesto: 'Servicio Tecnico Autonomo',
        empresa: 'Autonomo',
        funciones: ['Formateo,Instalacion y Configuracion de sistemas operativos Windows', 'Diagnostico y solucion a problemas en equipos informaticos'],
        periodo: 'Ahora',
    });
    setTimeout(() => {
        for (let i = 0; i <= $('.experiencia').length; i++) {
            $('.experiencia').eq(i).css('animation-delay', (0.3 * (i)) + 's');
            $('.periodo').eq(i).css('animation-delay', (0.3 * (i)) + 0.5 + 's');

        }
        andres.anima('.experiencia,.periodo');
        carga.pause();
    }, 200);
});