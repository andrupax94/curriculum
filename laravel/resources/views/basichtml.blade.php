<?php
use Barryvdh\Debugbar\Facades\Debugbar;
Debugbar::enable();
?>
<!doctype html>
<html ng-app="candres" ng-controller="htmlControl" lang="es-ES">

<head ng-controller="head">
    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="x-ua-compatible" content="ie-edge">

    <!--<link rel="icon" type="image/png" href="image/mifavicon.png" />!-->
    <title>Curriculum Andres</title>

    @yield('css1')


</head>

<body ng-controller="body" class="customS">
    <div id="background"></div>
    <div class="canvasAndLang">
        <div class="lang__container" ng-click='animaFlag()'>
            <div class="lang__flag">
                <div class="flag" ng-click='cambiaLang($event,"es")' ng-class="{'firstFlag':lang==='es-ES'}"
                    style='background-image:url("/image/spainFlag.svg")'></div>
                <div class="flag" ng-click='cambiaLang($event,"en")' ng-class="{'firstFlag':lang==='en-EN'}"
                    style='background-image:url("/image/UKFlag.svg")'></div>
            </div>
            <div class="lang__flecha" getsvg='image/flechaSinCola.svg'></div>
        </div>
        <div class="switch__canvas" ng-click="switchCanvasC();auto=false" ng-class="{'switchc__a': switchCanvas===true}"
            class="switch">
            <div class="switch__circle" ng-class="{'switch__a': switchCanvas===true}"></div>
        </div>
    </div>
    <canvas id=canvas></canvas>
    <header class="sHidden" ng-include="'header.html'" ng-controller="hController">

    </header>

    @yield('contend')


    <footer class="sHidden" ng-include="'footer.html'" ng-controller="fController">

    </footer>

    <div ng-include="'popUps.html'">

    </div>
</body>
@yield('js1')

</html>
