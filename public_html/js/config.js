candres.config(function($routeProvider) {

    $routeProvider.when("/personales", {
        templateUrl: "views/home/personales/personales.html",
        controller: "homePersonales",
        resolve: {
            page: function(page) {
                page.asigna('personales');
            }
        }
    });
    $routeProvider.when("/", {
        templateUrl: "views/home/personales/personales.html",
        controller: "homePersonales",
        resolve: {
            page: function(page) {
                page.asigna('personales');
            }
        }
    });
    $routeProvider.when("/habilidades", {
        templateUrl: "views/home/habilidades/habilidades.html",
        controller: "homeHabilidades",
        resolve: {
            page: function(page) {
                page.asigna('habilidades');
            }
        }
    });
    $routeProvider.when("/experiencia", {
        templateUrl: "views/home/experiencia/experiencia.html",
        controller: "homeExperiencia",
        resolve: {
            page: function(page) {
                page.asigna('experiencia');
            }
        }
    });
    $routeProvider.when("/formacion", {
        templateUrl: "views/home/formacion/formacion.html",
        controller: "homeFormacion",
        resolve: {
            page: function(page) {
                page.asigna('formacion');
            }
        }
    });




});