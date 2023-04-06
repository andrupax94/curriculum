function verificaLang(route, $rootScope) {

   /*Validar que no se encuentre en la pagina correspondiente a su idioma*/
   let pagActual = window.location.pathname;
   var ln = 'es';
   if (route.current.params.lang !== undefined) {
      ln = route.current.params.lang;
   } else {
      ln = navigator.language || navigator.userLanguage;
   }

   function verLn() {
      if (ln.indexOf('en') !== -1) {
         $rootScope.lang = 'en-EN';
      } else if (ln.indexOf('es') !== -1) {
         $rootScope.lang = 'es-ES';
      } else {
         route.current.params.lang = 'es-ES';
         $rootScope.lang = 'es-ES';
      }
   }
   verLn();
   const regex = /\/([a-z]{2}-[A-Z]{2})\/|\/((es)|(gb)|(en))\//ig;
   if (regex.test(pagActual)) {
      $('html').attr('lang', $rootScope.lang);
   } else {
      window.location.href = $rootScope.lang + '/personales';
   }
}
candres.config(function($routeProvider) {

   $routeProvider.when("/:lang/personales", {
      templateUrl: "views/home/personales/personales.html",
      controller: "homePersonales",
      resolve: {
         page: function(page, $route, $rootScope) {
            verificaLang($route, $rootScope);
            page.asigna('personales');
         }
      }
   });

   $routeProvider.when("/:lang/habilidades", {
      templateUrl: "views/home/habilidades/habilidades.html",
      controller: "homeHabilidades",
      resolve: {
         page: function(page, $route, $rootScope) {
            verificaLang($route, $rootScope);
            page.asigna('habilidades');
         }
      }
   });
   $routeProvider.when("/:lang/experiencia/", {
      templateUrl: "views/home/experiencia/experiencia.html",
      controller: "homeExperiencia",
      resolve: {
         page: function(page, $route, $rootScope) {
            verificaLang($route, $rootScope);
            page.asigna('experiencia');
         }
      }
   });
   $routeProvider.when("/:lang/formacion", {
      templateUrl: "views/home/formacion/formacion.html",
      controller: "homeFormacion",
      resolve: {
         page: function(page, $route, $rootScope) {
            verificaLang($route, $rootScope);
            page.asigna('formacion');
         }
      }
   }).otherwise({

      resolve: {
         page: function(page, $route, $rootScope) {
            verificaLang($route, $rootScope);

         }
      }
   });




});