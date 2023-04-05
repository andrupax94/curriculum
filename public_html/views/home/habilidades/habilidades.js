candres.controller("homeHabilidades", function($scope, carga, andres, $http, $timeout) {
   $scope.habilidades = [];

   if (window.innerWidth >= 576 && window.innerWidth < 768) {
      $scope.take = 8;
   } else {
      $scope.take = 6;
   }
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'HTML',
      iconColor: '005877',
      icon: 'html',
      scuare: '014470',
      progress: '65'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'PHP',
      iconColor: '7175aa',
      icon: 'php',
      scuare: '515577',
      progress: '70'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'Javascript',
      iconColor: 'f4d331',
      icon: 'javascript',
      scuare: 'e2c42d',
      progress: '75'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'JQuery',
      iconColor: '0863a3',
      icon: 'jquery',
      scuare: '064f7c',
      progress: '75'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'CSS',
      iconColor: '379ad6',
      icon: 'css',
      scuare: '3081aa',
      progress: '70'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'BootStrap',
      iconColor: '563d7c',
      icon: 'bootstrap',
      scuare: '443366',
      progress: '25'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'AngularJS',
      iconColor: 'e2c42d',
      icon: 'angularjs',
      scuare: 'de3641',
      progress: '60'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'TypeScript',
      iconColor: '004b82',
      icon: 'typescript',
      scuare: '0078cf',
      progress: '45'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'AngularTS',
      iconColor: 'de3641',
      icon: 'angularjs',
      scuare: 'af2b38',
      progress: '35'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'Laravel',
      iconColor: 'f04b2e',
      icon: 'laravel',
      scuare: 'c43a27',
      progress: '50'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'MySQL',
      iconColor: '006f88',
      icon: 'mysql',
      scuare: 'd17818',
      progress: '35'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'C#',
      iconColor: '68217a',
      icon: 'csharp',
      scuare: '541d66',
      progress: '20'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'Azure',
      iconColor: '3cbce7',
      icon: 'azure',
      scuare: '36a3c1',
      progress: '20'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'NetWorking',
      iconColor: '35aa5c',
      icon: 'networking',
      scuare: '328e4e',
      progress: '50'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'Ingles',
      iconColor: 'c41825',
      icon: 'ingles',
      scuare: '104789',
      progress: '30'
   });
   $scope.habilidades.push({
      iconFill: 'ffffff',
      name: 'S.O. Windows',
      iconColor: '0baae2',
      icon: 'windows',
      scuare: '0d97bc',
      progress: '75'
   });

   $scope.habilidades.push({
      iconFill: 'f29200',
      name: 'Adobe Illustrator',
      iconColor: '300000',
      icon: 'ilustrator',
      scuare: 'f29200',
      progress: '40'
   });

   $scope.habilidadPage = 1;
   $scope.habilidadChange = function(numero) {
      $scope.habilidadPage = numero;
      $timeout(() => {
         andres.anima('.label,.habilidad__icono,.animation,.habilidad__scuare__progress');
      }, 100);
   }

   carga.pause();
   $scope.habilidadChange(1);

   function numeracionInit() {
      $scope.numeracion = [];
      var numeracionL = $scope.habilidades.length / $scope.take;
      for (var i = 0; i <= numeracionL; i++) {
         if (i === numeracionL) {
            if ((numeracionL * $scope.take) - $scope.habilidades.length !== 0)
               $scope.numeracion.push(i + 1);

         } else {
            $scope.numeracion.push(i + 1);
         }
      }
   }
   numeracionInit();
   var time = setTimeout(() => {

   }, 500);
   $(window).resize(function(e) {
      e.stopPropagation();
      //aqui el codigo que se ejecutara cuando se redimencione la ventana
      $scope.auto = false;

      if (window.innerWidth >= 576 && window.innerWidth < 768) {
         $scope.take = 8;
      } else {
         $scope.take = 6;
      }
      clearTimeout(time);
      time = setTimeout((e) => {

         e.stopPropagation();
         numeracionInit();
         $scope.$evalAsync($scope.take);
         $scope.$evalAsync($scope.habilidadPage);
         $('.numeracion__numero').eq(0).trigger('click');
      }, 200, e);
   })
});