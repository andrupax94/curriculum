candres.controller("head", function($scope, andres) {
   funcionesClases.stringToArray = andres.stringToArray;
   funcionesClases.convertTZ = andres.convertTZ;
});
//###############################################################//

candres.controller("htmlControl", function($scope, $rootScope) {

});
candres.controller("body", function($scope, $route, $timeout, $rootScope, carga, modales, popUp, andres, mensajes) {
   $timeout(() => {
      $scope.lang = $rootScope.lang;
   }, 500);
   $scope.animaFlagS = false;
   $scope.cambiaLang = function(e, lang) {
      element = $(e.currentTarget).attr('class').indexOf('firstFlag');
      if (element === -1) {
         var URLactual = window.location.pathname;
         const regex = /\/([a-z]{2}-[A-Z]{2})\/|\/((es)|(gb)|(en))\//ig;
         URLactual = URLactual.replace(regex, '/' + lang + '/');
         window.location.href = URLactual;
      }
   }
   $scope.animaFlag = function() {
      if ($scope.animaFlagS === false) {
         var flagHeight = parseInt($('.lang__flag').css('height')) + 1;
         var flagNumber = $('.flag').length;
         var hTotal = flagHeight * flagNumber;
         $scope.animaFlagS = flagHeight;
         $('.lang__flag').css('height', hTotal);
      } else {
         $('.lang__flag').css('height', $scope.animaFlagS);
         $scope.animaFlagS = false;
      }
   }
   $scope.modales = modales;
   $scope.popUp = popUp;
   $scope.mensajes = mensajes;
   $scope.cancelPropagation = function(e) {
      e.stopPropagation();
   }
   $scope.auto = true;
   carga.to($('body'), 'big');
   var canvas,
      ctx;
   // Setting up the letters
   var letters;
   var fontSize,
      columns, rows
   var drops;
   var opacities;
   var fonts;
   var xS;
   var yS;
   var left;
   var top;
   var contador;
   var contadorC;
   var swT;
   var sw;
   var text;
   var timeO;

   $scope.switchCanvas = false;
   $scope.switchCanvasC = function() {
      $scope.switchCanvas = !$scope.switchCanvas;
      if ($scope.switchCanvas) {
         canvasInit();
         draw();
      } else {
         for (var a = 0; a < rows; a++) {
            for (var i = 0; i < columns; i++) {
               clearInterval(timeO[a][i]);
            }
         }
      }
   }
   canvasInit();
   //$scope.switchCanvasC();


   function canvasInit() {
      canvas = document.querySelector('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth + 100;
      canvas.height = window.innerHeight + 200;
      letters = '10';
      letters = letters.split('');
      fontSize = 100,
         columns = (canvas.width / fontSize) + 1,
         rows = (canvas.height / fontSize) + 1;

      // Setting up the drops
      drops = [];
      opacities = [];
      fonts = [];
      xS = [];
      yS = [];
      left = [];
      top = [];
      contador = 0;
      contadorC = 0;
      contadorT = 0;
      swT = [];
      sw = [];
      text = [];
      timeO = [];
      for (var x = 0; x < rows; x++) {
         drops[x] = [];
         opacities[x] = [];
         fonts[x] = [];
         sw[x] = [];
         swT[x] = [];
         left[x] = [];
         top[x] = [];
         text[x] = [];
         timeO[x] = [];
         xS[x] = [];
         yS[x] = [];
         for (var i = 0; i < columns; i++) {
            drops[x][i] = 1;
            opacities[x][i] = 0;
            sw[x][i] = 1;
            left[x][i] = 0;
            top[x][i] = 0;
            text[x][i] = '';
            swT[x][i] = true;
            timeO[x][i] = 0;
            fonts[x][i] = andres.getRandomArbitrary(8, 40);
            xS[x][i] = andres.getRandomArbitrary(-25, 25) + (fontSize);
            yS[x][i] = andres.getRandomArbitrary(-25, 25) + (fontSize * x);
         }

      }
   }



   function show(z, w) {
      contadorT++;

      if (opacities[w][z] <= 0 && sw[w][z] === 1) {
         contador++;
         contadorC++;
      }
      if (opacities[w][z] > 0 && opacities[w][z] <= 1) {
         ctx.save();
         ctx.font = fonts[w][z] + "px consolas";
         ctx.globalAlpha = opacities[w][z];
         ctx.clearRect(left[w][z] - (fontSize / 4), top[w][z] - (fontSize / 2), fontSize / 2, fontSize / 2);
         ctx.fillText(text[w][z], left[w][z], top[w][z]);
         ctx.restore();
      }

      if (opacities[w][z] >= 1 && sw[w][z] === 1) {
         sw[w][z] = 0;
      }
      if (sw[w][z] === 1) {
         opacities[w][z] += 0.1;

      } else if (sw[w][z] === 0) {
         opacities[w][z] -= 0.1;
      }
      if (opacities[w][z] <= 0 && sw[w][z] === 0) {
         ctx.clearRect(left[w][z] - (fontSize / 4), top[w][z] - (fontSize / 2), fontSize / 2, fontSize / 2);
         sw[w][z] = 1;
         contador--;
         opacities[w][z] = 0;
         fonts[w][z] = andres.getRandomArbitrary(8, 40);
         xS[w][z] = andres.getRandomArbitrary(-25, 25) + (fontSize);
         yS[w][z] = andres.getRandomArbitrary(-25, 25) + (fontSize * w);
         left[w][z] = z * fontSize + (xS[w][z]);
         top[w][z] = drops[w][z] * fontSize + (yS[w][z]);
      }

      opacities[w][z] = Math.round(opacities[w][z] * 100) / 100;
   }

   function draw() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255)';

      for (var a = 0; a < rows; a++) {
         for (var i = 0; i < columns; i++) {
            drops[a][i]++;
            text[a][i] = letters[Math.floor(Math.random() * letters.length)];
            left[a][i] = i * fontSize + (xS[a][i]);
            top[a][i] = drops[a][i] * fontSize + (yS[a][i]);
            timeO[a][i] = setInterval(show, andres.getRandomArbitrary(50, 200), i, a);
            if (drops[a][i] * fontSize > canvas.height && Math.random() > .95) {
               drops[a][i] = 0;
            }
         }
      }
   }

   setTimeout(() => {
      if ($scope.switchCanvas === false) {
         $scope.switchCanvasC();
         $scope.$evalAsync($scope.switchCanvas);

         setTimeout(() => {
            if ($scope.auto === true) {
               $scope.switchCanvasC();
               $scope.$evalAsync($scope.switchCanvas);
            }
         }, 3000);
      }
   }, 2000);

   var time = setTimeout(() => {

   }, 500);
   $(window).resize(function(e) {
      e.stopPropagation();
      //aqui el codigo que se ejecutara cuando se redimencione la ventana
      $scope.auto = false;

      if ($scope.switchCanvas === true) {
         clearTimeout(time);
         time = setTimeout((e) => {
            e.stopPropagation();
            $scope.switchCanvasC();
            $scope.$evalAsync($scope.switchCanvas);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
         }, 500, e);
      } else {
         ctx.clearRect(0, 0, canvas.width, canvas.height);

      }
   })
   carga.play();

});
//ENCABEZADO//
candres.controller("hController", function() {

});

//###############################################################//


//PIEDEPAGINA//
candres.controller("fController", function($scope, $rootScope) {

});


class Log {

   constructor(log) {


      this.id = (log === undefined ? "" : log.id);
      this.created_at = (log === undefined ? "0/0/0" : log.created_at);
      this.updated_at = (log === undefined ? "0/0/0" : log.updated_at);
      this.error = (log === undefined) ? "" : log.error;
      this.linea = (log === undefined) ? "" : log.linea;
      this.archivo = (log === undefined) ? "" : log.archivo;
      this.new = (log == undefined ? true : false);

   }
}

//###############################################################//