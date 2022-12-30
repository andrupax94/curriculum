candres.controller("homePersonales", function($scope, carga, page) {

    setTimeout(() => {
        carga.pause();
        $('.label,#descripcion>p,.adicionales').css('animation-play-state', 'running');
    }, 200);
});