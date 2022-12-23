@extends('basichtml')


@section('css1')
@include('basiccss')
<link rel="stylesheet" href="views/home/home.css">
@endsection('css1')
@section('js1')
@include('basicjs')
<script src="views/home/home.js"></script>
<script src="views/home/personales/personales.js"></script>
<script src="views/home/habilidades/habilidades.js"></script>
<script src="views/home/formacion/formacion.js"></script>
<script src="views/home/experiencia/experiencia.js"></script>


@endsection('js1')
@section('contend')


<main ng-controller="home" class="col-12" id="container" class="flexc">

<div id="container">
<div id="encabezado" class="col-12 row">
    <div id="encabezado__foto" class="col-3-5"></div>
    <div id="encabezado__titulos" class="col-8-5 column">
        <div id="encabezado__titulo" class="col-12">Andres Eduardo Palencia Rojas</div>
        <div id="encabezado__subTitulo" class="col-12">Ing. De Sistemas(Informatico)</div>
    </div>
</div>
    <div id="mid" class="col-12 row">
        <div class="col-3 column menu__container">
            <a href="/personales" ng-click="page='personales'" class="col-12 menu__buttom" ng-class="{'menu__buttom__activo': page==='personales'}"><span getsvg="image/personal.svg,#FFFFFF"></span><h5>Personales</h5></a>
            <a href="/habilidades" ng-click="page='habilidades'" class="col-12 menu__buttom" ng-class="{'menu__buttom__activo': page==='habilidades'}"><span getsvg="image/habilidades.svg,#FFFFFF"></span><h5>Habilidades</h5></a>
            <a href="/formacion" ng-click="page='formacion'" class="col-12 menu__buttom" ng-class="{'menu__buttom__activo': page==='formacion'}"><span getsvg="image/formacion.svg,#FFFFFF"></span><h5>Formacion Academica</h5></a>
            <a href="/experiencia" ng-click="page='experiencia'" class="col-12 menu__buttom" ng-class="{'menu__buttom__activo': page==='experiencia'}"><span getsvg="image/experiencia.svg,#FFFFFF"></span><h5>Experiencia Laboral</h5></a>
        </div>
        <div id="pestañaPrincipal" class="col-9 row">
        <div ng-view class="customS"></div>
        </div>
    </div>
    </div></main>

@endsection('content')
