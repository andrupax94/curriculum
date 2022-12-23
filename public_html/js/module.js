var candres = angular.module("candres", ["ngRoute"], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
var movil = false;
//movil=true;
var web = false;
var DURL;
/*if (window.location.toString().indexOf('tiendayleym.com') !== -1) {
    web = true;
    DURL = 'https://tiendayleym.com/';
} else if (window.location.toString().indexOf('tiendayleym.azurewebsites.net') !== -1) {
    web = true;
    DURL = 'https://tiendayleym.azurewebsites.net/';
}*/
if (movil === false && web === false) {
    var ANGULARHTML5 = '';
    DURL = '';
} else {

    if (web === true) {
        var ANGULARHTML5 = '';
    } else {
        DURL;
        var ANGULARHTML5 = '#!';
        var es_edge = navigator.userAgent.toLowerCase().indexOf('edg') > -1;
        if (es_edge)
            DURL = 'http://tiendayleym.test/';
        else
            DURL = 'https://tiendayleym.test/';

    }
}

candres.config(function($locationProvider) {
    if (movil === false) {
        $locationProvider.html5Mode(true);
    }
});