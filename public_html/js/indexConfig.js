candres.config(function($routeProvider, $locationProvider) {

    /*$routeProvider.when("/",{
		
		templateUrl:"html/inicio.html",
		controller:"inicio",
		resolve: {
            session: function(usuario){
                return usuario.comprobarsession();
        	}
		/
	});*/
    $locationProvider.html5Mode(true);
});