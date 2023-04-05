$(document).on({
   dragleave: function(e) { // Arrastra salir
      e.preventDefault();
   },
   drop: function(e) { // Arrastra y suelta
      e.preventDefault();
   },
   dragenter: function(e) { // Arrastra
      e.preventDefault();
   },
   dragover: function(e) { // Dragover
      e.preventDefault();
   }
});
var funcionesClases = [];

candres.factory("carga", function($window) {
   var carga = [];
   carga.switch = false;
   carga.element = [];

   carga.size;
   carga.timeout;
   carga.retryCount = 0;
   carga.tl1 = [];
   carga.tl2 = [];
   carga.tl3 = [];
   carga.retryFn = undefined;
   carga.retry = function(arg) {

      if (arg !== undefined) {
         if (typeof arg.callee === 'function')
            carga.retryFn = arg;
      } else if (typeof arg === 'function' || arg === undefined) {
         if (arg === undefined) {
            var arg = carga.element[carga.element.length - 1];
         }
         var i = parseInt(arg.find('.carga').eq(0).attr('cargan'));
         if (carga.retryFn !== undefined) {

            var children = carga.element[i].find('.cargaReintentar');
            var children2 = carga.element[i].find('.carga>div');
            children.eq(0).css('display', 'none');
            children2.eq(0).css('display', 'flex');

            setTimeout(function() {
               switch (carga.retryFn.length) {
                  case 1:
                     carga.retryFn.callee(carga.retryFn[0]);
                     break;
                  case 0:
                     carga.retryFn.callee();
                     break;
                  case 2:
                     carga.retryFn.callee(carga.retryFn[0], carga.retryFn[1]);
                     break;
                  default:
                     carga.error(carga.element[i]);
                     break;
               }

            }, 500);
         } else {
            var children = carga.element[i].find('.cargaReintentar');
            var children2 = carga.element[i].find('.carga>div');
            children.find('.cargaButton').addClass('disabled');
            children.eq(0).css('display', 'flex');
            children2.eq(0).css('display', 'none');

         }
      }
   };
   carga.error = function(element) {
      clearTimeout(carga.timeout);
      clearTimeout(carga.pauseTimeout);
      if (element === undefined) {
         if (carga.element.length < 1) {
            carga.to($('body'));
            element = $('body');
         } else
            element = carga.element[carga.element.length - 1].eq(0);
      }
      var i = parseInt(element.find('.carga').eq(0).attr('cargan'));
      carga.play(carga.element[i]);
      carga.timeout = setTimeout(function() {
         if (carga.retryCount < 1) {
            carga.retryCount++;
            carga.retry();
         } else {
            var children = carga.element[i].find('.cargaReintentar');
            var children2 = carga.element[i].find('.carga>div');
            children.eq(0).css('display', 'flex');
            children2.eq(0).css('display', 'none');
         }
      }, 5000);

   }
   carga.to = function(element, size, opacity) {
      if (movil === true && element[0].localName !== 'body' && element[0].localName !== 'main') {
         carga.element.push($('body'));
      }

      switch (size) {
         case 'big':
            var clase = "cargaBig";
            carga.size = 96;
            break;
         case 'mid':
            var clase = "cargaMid";
            carga.size = 66;
            break;
         case 'small':
            var clase = "cargaSmall";
            carga.size = 36;
            break;
         default:
            var clase = "cargaBig";
            carga.size = 96;
            break;
      }
      carga.element.push(element);
      var i = carga.element.length - 1;
      element.append('<div cargan="' + i + '" class="carga ' + clase + '">' +
         '<div>' +
         '<div>' +
         '<div></div>' +
         '</div>' +
         '</div>' +
         '<mid style="display:none" class="cargaReintentar flexc">' +
         '<h5 class="cargaH5">Se ha Producido Un Error</h5>' +
         '<button class="cargaButton">Reintentar</button>' +
         '<button class="cargaCancelar">Cancelar</button>' +
         '</mid>' +
         '</div>');

      carga.tl1[i] = gsap.timeline({
         repeat: -1,
         paused: true
      });
      carga.tl2[i] = gsap.timeline({
         repeat: -1,
         paused: true
      });
      carga.tl3[i] = gsap.timeline({
         repeat: -1,
         paused: true
      });
      element.children('*').css('visibility', 'visible');
      if (opacity !== true && opacity !== false && opacity !== undefined) {
         element.children('.carga').css('background-color', opacity);
      } else if (opacity === undefined) {
         element.children('.carga').css('background-color', element.css('background-color'));


      }
      setTimeout(() => {
         element.children('.carga').css('border-radius', element.css('border-radius'));
         if (opacity === true) {
            element.children('.carga').css('background-color', 'transparent');
         }
         var cargaButton = element.find('.cargaButton').eq(0);
         cargaButton.click(function(e) {
            e.stopPropagation();
            carga.retry();
         });
         var cargaCancelar = element.find('.cargaCancelar').eq(0);
         cargaCancelar.click(function(e) {
            carga.pause();
         });
      }, 200);
   }

   carga.play = function(element) {

      if (!carga.switch) {
         if (element === undefined) {
            var element = carga.element[carga.element.length - 1];
         }
         var i = parseInt(element.find('.carga').eq(0).attr('cargan'));
         element.find('.carga').show();
         setTimeout(function() {
            carga.switch = true;
            var children = carga.element[i].children('.carga').children('div');
            var children2 = carga.element[i].children('.carga').children('div').children('div');
            var children3 = carga.element[i].children('.carga').children('div').children('div').children('div');
            carga.tl1[i].to(children, {
               duration: 2,
               ease: "linear",
               rotate: 360
            });
            carga.tl2[i].to(children2, {
               duration: 1,
               ease: "linear",
               top: "-" + (carga.size - 30) + "px"
            }).to(children2, {
               duration: 1,
               ease: "linear",
               top: "-" + carga.size + "px"
            });
            carga.tl3[i].to(children3, {
               top: (carga.size - 30) + "px",
               ease: "linear",
               duration: 1

            }).to(children3, {
               top: carga.size + "px",
               ease: "linear",
               duration: 1
            });
            carga.tl1[0].play();
            carga.tl2[0].play();
            carga.tl3[0].play();
         }, 200);

      }
   }

   carga.pause = function(element) {
      clearTimeout(carga.timeout);
      clearTimeout(carga.pauseTimeout);
      carga.retryCount = 0;
      carga.switch = false;
      if (element === undefined) {
         var element = carga.element[carga.element.length - 1];
      }
      if (element !== undefined) {
         var i = parseInt(element.find('.carga').eq(0).attr('cargan'));
         carga.pauseTimeout = setTimeout(function() {
            carga.tl1[i].pause();
            carga.tl2[i].pause();
            carga.tl3[i].pause();
            $('header,main,footer').removeClass('sHidden');
            carga.element[i].children('.carga').remove();
            carga.element.splice(i, 1);
         }, 500);
      }
   }
   return carga;
});

//Desconocimiento de uso
candres.factory("MLS", function($q) {
   var MLS = [];
   MLS[0] = 0;
   var defered2 = $q.defer();
   var promise2 = defered2.promise;
   MLS.wait = function() {
      return promise2;
   }
   MLS.set = function(val) {
      MLS[0] = val;
      defered2.resolve(true);
      return promise2;
   }
   return MLS;
});
candres.factory("mensajes", function() {
   var mensajes = [];
   mensajes.mensaje = [];
   mensajes.add = function(tipo, text) {
      switch (tipo) {
         case 'info':
            tipo = 'mensajeInfo';
            break;
         case 'warning':
            tipo = 'mensajeWarning';
            break;
         case 'error':
            tipo = 'mensajeError';
            break;
         case 'ok':
            tipo = 'mensajeOk';
            break;
      }
      mensajes.mensaje.push({ 'tipo': tipo, 'text': text, 'index': mensajes.mensaje.length });

      var index = mensajes.mensaje.length;


      async function animag(index) {
         var i = index - 1;
         setTimeout(function() {
               var elem = $('#mensajes>div[index="' + i + '"]')[0];
               var elem2 = $('#mensajes>div[index="' + i + '"]>div>div:first-child')[0];
               console.log(i);
               gsap.to(elem, {
                  duration: 0.5,
                  left: 0,
                  onComplete: function() {
                     gsap.to(elem2, {
                        duration: 0.5,
                        left: 0,
                        delay: 0.5,
                        onComplete: function() {
                           setTimeout(function() {
                              gsap.to(elem2, {
                                 duration: 0.5,
                                 left: 300,

                                 onComplete: function() {
                                    gsap.to(elem, {
                                       duration: 0.5,
                                       left: 300,
                                       delay: 0.5,
                                       onComplete: function() {
                                          mensajes.mensaje.splice(0, 1);

                                       }
                                    });
                                 }
                              })
                           }, 6000);
                        }
                     });
                  }
               })
            },
            200);
      }
      animag(index);
   }
   return mensajes;
});
candres.factory("popUp", function($q, $timeout) {
   var popUp = [];
   popUp.search = function() {
      console.log('Sin Funcion');
   }
   var defered;
   var promise;
   popUp.maximizado = false;
   var defered2 = $q.defer();
   var promise2 = defered2.promise;
   popUp.originalWidth;
   popUp.originalHeight;
   popUp.expandePopUp = function() {
      if (!popUp.maximizado) {
         $('#popUpView>div').fadeOut(200, () => {
            popUp.originalWidth = $('#popUpView').css('max-width');
            $('#popUpView').css('max-width', '98vw');
            popUp.originalHeight = $('#popUpView').css('min-height');
            $('#popUpView').css('min-height', '96vh');
            setTimeout(() => {
               $('#popUpView>div').fadeIn(200);
            }, 200);
         });

      } else {
         $('#popUpView>div').fadeOut(200, () => {
            $('#popUpView').css('max-width', popUp.originalWidth + 'px');
            $('#popUpView').css('min-height', popUp.originalHeight + 'px');
            setTimeout(() => {
               $('#popUpView>div').fadeIn(200);
            }, 200);
         });
      }
      popUp.maximizado = !popUp.maximizado;
   }
   popUp.prepare = function(template) {
      popUp.maximizado = false;
      defered = $q.defer();
      promise = defered.promise;
      defered2.resolve(true);
      $('#popUpContainer').fadeIn(200);
      $('#popUpContainer').css('display', 'flex');
      popUp.template = template;
   }
   popUp.Wait = function() {
      return promise2;
   }
   popUp.resetWait = function() {
      defered2 = $q.defer();
      promise2 = defered2.promise;
   }
   popUp.noCerrar = false;
   popUp.to = function(template, noCerrar) {
      popUp.prepare(template);
      if (noCerrar === true)
         popUp.noCerrar = true;
   }
   popUp.listaProducto = function(noCerrar) {
      popUp.prepare('views/popUp/listaProducto/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;


      return promise;
   }
   popUp.carrito = function(noCerrar) {
      popUp.prepare('views/popUp/carrito/carrito.html');
      if (noCerrar === true)
         popUp.noCerrar = true;


      return promise;
   }

   popUp.listaColores = function(noCerrar) {

      popUp.prepare('views/popUp/listaColores/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;
      else if (noCerrar === 'inv') {

         $timeout(() => {
            var nTono = $('[ng-model="filtro.nTono"]');
            nTono.val('1');
            var nTono = angular.element('[ng-model="filtro.nTono"]');
            nTono.triggerHandler('change');
            nTono.triggerHandler('keyup');
         }, 500);
      }

      return promise;
   }
   popUp.listaConjuntos = function(noCerrar) {

      popUp.prepare('views/popUp/listaConjuntos/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;
   }
   popUp.listaTipos = function(noCerrar) {

      popUp.prepare('views/popUp/listaTipos/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;


   }
   popUp.listaDisenos = function(noCerrar) {

      popUp.prepare('views/popUp/listaDisenos/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;


   }
   popUp.listaModelos = function(noCerrar) {

      popUp.prepare('views/popUp/listaModelos/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;


   }
   popUp.listaMateriales = function(noCerrar) {

      popUp.prepare('views/popUp/listaMateriales/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;


   }
   popUp.inicioSesion = function(noCerrar) {

      popUp.prepare('views/popUp/inicioSesion/html.html');
      if (noCerrar === true)
         popUp.noCerrar = true;

      return promise;


   }
   popUp.accept = function(producto) {
      defered.resolve(producto);
      defered2 = $q.defer();
      promise2 = defered2.promise;
      if (popUp.noCerrar !== true) {
         popUp.template = undefined;
         $('#popUpContainer').fadeOut(200);
      }

      return promise;
   }
   popUp.cierraPopUp = function() {
      $('#popUpContainer').fadeOut(200);
      defered.reject('Se Cerro La Ventana');
      popUp.template = undefined;
      defered2 = $q.defer();
      promise2 = defered2.promise;
      return promise;
   }
   popUp.template = undefined;
   return popUp;
});


candres.factory("variables", function($http, $q) {
   var variables = [];
   var defered = $q.defer();
   var promise = defered.promise;
   variables.espera = function() {
      return promise;
   }
   $http.post(DURL + "api/dameVariables", {

      })
      .then(function(response) {
            temp = response.data;
            variables[0] = temp;
            defered.resolve(temp);
         },
         function(error) {

            console.log(error);
         });

   return variables;
});
candres.factory("validarService", function() {
   var validar = [false];
   return validar;
});
candres.factory("page", function($q) {
   var page = [];
   page.defered = $q.defer();
   page.promise = page.defered.promise;
   page.name = "";
   page.dime = function() {
      return page.promise;
   }
   page.asigna = function(valor) {
      page.name = valor;
      page.defered.resolve(valor);
   }
   return page;
});



candres.factory("modales", function() {
   var modales = [];
   modales.activo = false;

   modales.callback = function() {
      console.log('Sin Callback');
   }
   modales.callback2 = function() {
      console.log('Sin Callback');
   }
   modales.cerrar = function() {
      $('#modal').fadeOut(200, function() {
         modales.activo = false;
         modales.callback2();
         modales.pregunta.activo = false;
      });
   }
   modales.pregunta = [];
   modales.pregunta.activo = false;

   modales.abrirPregunta = function(h3, info, callback, callback2) {
      modales.pregunta.h3 = h3;
      modales.pregunta.info = info;
      modales.callback = callback;
      if (callback2 !== undefined) {
         modales.callback2 = callback2;
      }
      modales.activo = true;
      modales.pregunta.activo = true;
      $('#modal').fadeIn(200);
   }
   modales.pregunta.aceptar = function() {
      modales.cerrar();
      modales.callback();
   }

   modales.pregunta.h3 = 'Desea Continuar?';
   modales.pregunta.info = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum haum.';
   return modales;
});
candres.factory('andres', function($rootScope, $http, $q, $filter, $window) {
   var funciones = {};
   funciones.validarF5 = function() {
      setTimeout(function() {
         $('[validar]').trigger('focus');
         $('[validar]').trigger('focusout');
      }, 1000);

   }
   funciones.anima = function(valor, reverse = false) {
      let valores = valor.split(',');
      let valores2 = [];
      if (valores.length === 0) {
         valores[0] = valor;
      }
      valores.forEach(lol => {
         for (var i = 0; i < $(lol).length; i++) {

            valores2.push($(lol).eq(i));

         }
      });
      for (var i = 0; i < valores2.length; i++) {

         var element = valores2[i];
         var animations = element.attr('animation');
         if (animations !== undefined) {
            var aux = element.attr('animation').split(',');
         } else {
            var aux = [];
            aux[0] = element.css('animation-name');
         }
         element.css('animation-play-state', 'paused');
         if (reverse !== false) {
            element.css('animation-name', aux[1]);
         } else {
            element.css('animation-name', aux[0]);
         }
         element.css('animation-play-state', 'running');
      };
   }
   funciones.randomChar = function(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
      var result = '';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }


   funciones.generaRandomString = (num, tipoValor = "alfanumerico") => {
      if (tipoValor === "alfa")
         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      else if (tipoValor === "numerico")
         var characters = '0123456789';
      else if (tipoValor === "alfanumerico")
         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1 = '';
      var charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
         result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result1;
   }
   funciones.getRandomArbitrary = function(min, max) {
      return Math.random() * (max - min) + min;
   }
   funciones.comparaArrays = function(arr1, arr2) {
      if ($filter('arrayToString')(arr1) === $filter('arrayToString')(arr2))
         return true;
      else
         return false;
   }
   funciones.convertTZ = function(date) {
         var dt = new Date(date);
         return (dt.toLocaleString());
      }
      //descocimiento parcial de uso
   funciones.autocompletado = function(element, attrs, funcion) {
      var width = element.css('width');
      var elementy = element.offset().top;
      var elementx = element.offset().left;
      var padding = element.css('padding');
      var margin = element.css('margin');
      var contenido = "";
      var height = element.css('height');
      var lista = attrs;
      if (lista.length > 0) {
         for (var i = 0; i < lista.length; i++) {
            height = height + 48;
            if (i === lista.length - 1) {
               contenido = contenido + '<h5 autocompletado_valores="' + lista[i] + '">' + lista[i][0] + '</h5>';
            } else {
               contenido = contenido + '<h5 autocompletado_valores="' + lista[i] + '">' + lista[i][0] + '</h5><hr>';
            }
         }

         $('main').append('<columnflex id="' + element.attr("id") + '" class="autocompletado" style="top:' + (elementy + parseInt(height)) + 'px;left:' + elementx + 'px;margin:' + margin + ';width:' + width + ';padding:' + padding + '">' + contenido + '</columnflex>');
      }
   };
   funciones.getOffset = function(el) {
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
         _x += el.offsetLeft - el.scrollLeft;
         _y += el.offsetTop - el.scrollTop;
         el = el.offsetParent;
      }
      return { top: _y, left: _x };
   }

   funciones.stringToArray = function(valor, separator = ',') {
      var aux = undefined;

      if (valor !== undefined && typeof valor === 'string') {
         aux = valor.split(separator);
         if (aux !== undefined) {
            if (typeof aux === 'string') {
               aux = [aux];
            }
         }
      } else {
         aux = valor;
      }
      return aux;

   };
   funciones.arrayToString = function(valor, column = false) {

      var aux = "";

      if (typeof valor === 'array' || typeof valor === 'object') {
         valor.forEach((element, i) => {
            if (i + 1 === valor.length) {
               if (column === false)
                  aux = aux + element;
               if (column !== false)
                  aux = aux + element[column];
            } else {
               if (column === false)
                  aux = aux + element + ',';
               if (column !== false)
                  aux = aux + element[column] + ',';
            }
         });
      }
      return aux;

   };


   funciones.getsvg = function(element, attrs, version) {

      var svg = attrs;
      if (version === undefined) {
         version = 1;
      }
      if (svg !== "") {
         if (svg.indexOf(',') !== -1) {
            svg = svg.split(',');
         } else {
            var aux = svg;
            svg = [];
            svg[0] = aux;
            svg[1] = 'no';
         }
         if (svg[0].indexOf('/-.-/') !== -1) {
            var final = svg[0].split('/-.-/')[0];
         } else {
            var final = svg[0];
         }
         if (version === 1) {
            $.get(final, function(htmlexterno) {
               var base64c = htmlexterno.split('/');

               if (base64c[0] === 'data:image') {
                  element.css('background-size', 'contain');
                  element.css('background-repeat', 'no-repeat');
                  element.css('background-image', 'url("' + htmlexterno + '")');
               } else {

                  element.prepend(htmlexterno);
                  element.children('svg').attr('width', $(element).css('width'));
                  element.children('svg').attr('height', $(element).css('height'));
                  var fuck = $(element).height();
                  if (svg[1] !== 'no') {
                     $(element).find('path').css("fill", svg[1]);
                     $(element).find('polygon').css("fill", svg[1]);
                  }
               }
            }, "html").done(function() {

            });
         } else if (version === 2) {
            element.append('<img class="getsvg2">');
            element = element.find('.getsvg2');
            element.css('-webkit-mask-image', 'url(' + final + ')');
            element.css('-webkit-mask-repeat', 'no-repeat');
            element.css('-webkit-mask-size', '90%');
            element.css('-webkit-mask-position', 'center');
            element.css('mask-position', 'center');
            element.css('background-color', svg[1]);

            element.css('mask-image', 'url(' + final + ')');
            element.css('mask-repeat', 'no-repeat');
            element.css('mask-size', '90%');

         }
      }
   };


   //desconocimiento de uso
   funciones.cargaImagenUrl = function(url) {
      var imageObj = new Image();
      imageObj.onerror = function(e) {
         console.log(e);
      }
      var defered = $q.defer();
      var promise = defered.promise;

      imageObj.onload = async function(e) {

         var canvas = document.createElement("canvas");
         canvas.width = e.target.width;
         canvas.height = e.target.height;
         var ctx = canvas.getContext("2d");
         ctx.drawImage(e.target, 0, 0);
         var dataURL = canvas.toDataURL("image/png");
         defered.resolve(dataURL);

      }
      url = url.replace('#', '%23');
      imageObj.src = url;

      return promise;
   }
   funciones.randomColor = function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
   }

   funciones.focusPlaceholderTop = function(e, element) {
      if (e != undefined) {
         e.stopPropagation();
      }
      var aux = (parseInt(element.css('font-size')) - 2 + 'px');
      var hijodiv = element.children('div').last();
      var hijoh5 = element.children('div').children('h5');
      hijoh5.css('font-size', aux);
      hijodiv.css('height', hijoh5.height() + 'px');
      hijodiv.css('top', '-' + (hijoh5.height() / 2) + 'px');

   };
   funciones.focusoutPlaceholderTop = function(e, element) {
      e.stopPropagation();
      if (element.children('input').val() == "") {
         var aux = (parseInt(element.css('font-size')) + 'px');
         var hijodiv = element.children('div').last();
         var hijoh5 = element.children('div').children('h5');
         hijoh5.css('font-size', aux);
         hijodiv.css('height', element.height() + 'px');
         hijodiv.css('top', '0px');
      }
   };
   funciones.rgb2hex = function(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return "#" + funciones.hex(rgb[1]) + funciones.hex(rgb[2]) + funciones.hex(rgb[3]);
   };
   funciones.error = function(element) {

      var input = element.find('input').eq(0);
      input.trigger('focusout');
      if (input.attr('validar') === 'false') {

         setTimeout(function() {
            input.addClass('validarErrorInput');
            element.find('h5').addClass('validarErrorInputh5');
            var error = input.parent().find('.validarError').eq(0);
            error.css('visibility', 'visible');
            error.css('opacity', '1');
         }, 500);
      }
   };
   //desconocimiento de uso
   funciones.hex = function(x) {
      var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
   };

   funciones.aleatorio = function(a, b) {
      return Math.round(Math.random() * (b - a) + parseInt(a));
   }
   funciones.autocomplete = function autocomplete(inp, arr = [], scope, ngmodel, column = false) {
      inp = inp[0];
      var aux = [];
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function(e) {
         var a, b, i, val = this.value;
         /*close any already open lists of autocompleted values*/
         closeAllLists();
         if (!val) { return false; }
         currentFocus = -1;
         /*create a DIV element that will contain the items (values):*/
         a = document.createElement("DIV");
         a.setAttribute("id", this.id + "autocomplete-list");
         a.setAttribute("class", "autocomplete-items");
         /*append the DIV element as a child of the autocomplete container:*/
         this.parentNode.appendChild(a);

         if (column !== false && aux.length === 0) {
            arr.forEach(element => {
               aux.push(element[column]);
            });
            arr = aux;
         }
         /*for each item in the array...*/
         for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
               /*create a DIV element for each matching element:*/
               b = document.createElement("DIV");
               /*make the matching letters bold:*/
               b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
               b.innerHTML += arr[i].substr(val.length);
               /*insert a input field that will hold the current array item's value:*/
               b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
               /*execute a function when someone clicks on the item value (DIV element):*/
               b.addEventListener("click", function(e) {
                  /*insert the value for the autocomplete text field:*/

                  inp.value = this.getElementsByTagName("input")[0].value;
                  if (scope != undefined) {
                     scope[ngmodel] = this.getElementsByTagName("input")[0].value;
                  }
                  $(inp).change();

                  /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
                  closeAllLists();
               });
               a.appendChild(b);
            }
         }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function(e) {
         var x = document.getElementById(this.id + "autocomplete-list");
         if (x) x = x.getElementsByTagName("div");
         if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
         } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
         } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
               /*and simulate a click on the "active" item:*/
               if (x) x[currentFocus].click();
            }
         }
      });

      function addActive(x) {
         /*a function to classify an item as "active":*/
         if (!x) return false;
         /*start by removing the "active" class on all items:*/
         removeActive(x);
         if (currentFocus >= x.length) currentFocus = 0;
         if (currentFocus < 0) currentFocus = (x.length - 1);
         /*add class "autocomplete-active":*/
         x[currentFocus].classList.add("autocomplete-active");
      }

      function removeActive(x) {
         /*a function to remove the "active" class from all autocomplete items:*/
         for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
         }
      }

      function closeAllLists(elmnt) {
         /*close all autocomplete lists in the document,
         except the one passed as an argument:*/
         var x = document.getElementsByClassName("autocomplete-items");
         for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
               x[i].parentNode.removeChild(x[i]);
            }
         }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function(e) {
         closeAllLists(e.target);
      });
   }
   funciones.validar = function(e, attrs, scope, valorAlterinativo) {
      if (typeof(attrs) === 'string' || typeof(attrs) === 'number') {
         valorAlterinativo = attrs;
         attrs = undefined;
      }
      var tagName;
      var validaraux;
      try {
         tagName = e[0].tagName;
         validaraux = e;
      } catch (e) {
         tagName = $('#' + attrs.id + '')[0].tagName;
         validaraux = $('#' + attrs.id + '');
      }
      if (valorAlterinativo === undefined && tagName !== 'SELECT') {
         if (scope !== undefined) {
            if (attrs.ngModel !== undefined) {
               var aux = scope;
               var repes = attrs.ngModel.split('.');
               repes.forEach(element => {
                  if (element.indexOf('[') === -1)
                     aux = aux[element];
                  else {
                     element = element.split('[');
                     aux = aux[element[0]][0];
                  }
               });
               if (aux !== undefined) {
                  if (e[0].value[e[0].value.length - 1] !== " ") {
                     e[0].value = aux;
                  }
               }
            }
         }
      }
      var temporalboton = "";
      var aprobado = true;
      var aprobadotodo = true;
      var permitidosalfa = 'qwertyuiopasdfghjklzxcvbñnm QÑWERTYUIOPASDFGHJKLZXCVBNM';
      var permitidosalfaparentesis = 'qwertyuiopasdfghjklzxcvbñnm QÑWERTYUIOPASDFGHJKLZXCVBNM()';
      var permitidosalfanumerico = 'qwertyuiopasdfghjklzxcvñbnm QWERTYUIOPÑASDFGHJKLZXCVBNM1234567890';
      var permitidosalfanumericoparentesis = 'qwertyuiopasdfghjklzxcvñbnm QWERTYUIOPÑASDFGHJKLZXCVBNM1234567890()';
      var permitidosalfanumericosimbolos = 'qwertyuiopasdfghjklzxñcvbnm QWERÑTYUIOPASDFGHJKLZXCVBNM1234567890!#&/()=-_¡¿|°';
      var permitidosnumeros = '1234567890';
      var permitidossimbolos = "!#$%&/()=?¡+-.,¿|°";
      var permitidosmayusculas = "QWERTYUIOPASDFGHJKLZXCVBNM";
      var permitidosminusculas = "qwertyuiopasdfghjklzxcvbnm";

      if (valorAlterinativo !== undefined) {
         validaraux[0].value = valorAlterinativo;
      }
      var error_m = [];

      if (attrs != undefined) {
         if (attrs.opcional == undefined) {
            if (validaraux.val() === "") {
               aprobado = false;
            }
         }
      } else {
         if (validaraux.val().length < 1) {
            aprobado = false;
            error_m.push('El Campo No Puede Estar Vacio');
         }
      }
      switch (validaraux[0].tagName) {
         case 'INPUT':
            switch (validaraux.attr('type')) {
               case 'date':
                  var f = new Date();
                  f = convertirafecha(f);
                  var b = convertirafecha(validaraux.val());

                  if (isValidDate(validaraux.val()) !== true || f < b || (f - 1000000) > b) {
                     validaraux.addClass('campo_e');
                     aprobadotodo = false;
                  } else {
                     data[validaraux.attr('id')] = b;
                     validaraux.removeClass('campo_e');
                  }
                  break;
               case 'password':
                  if (validaraux.attr('pass-rules') !== undefined) {
                     var mayusculas = false;
                     var minusculas = false;
                     var simbolos = false;
                     var numeros = false;

                     if (validaraux.val()[0] === "") {
                        aprobado = false;
                     }

                     if (validaraux.val().length < 8 || validaraux.val().length > 16) {
                        aprobado = false;
                        error_m.push('La Contraseña debe Estar comprendida Entre 8 Y 16 Caracteres ');
                     }

                     for (var x = 0; x < validaraux.val().length; x++) {
                        if (permitidosmayusculas.indexOf(validaraux.val()[x]) !== -1) {
                           mayusculas = true;
                        }
                        if (permitidosminusculas.indexOf(validaraux.val()[x]) !== -1) {
                           minusculas = true;
                        }
                        if (permitidossimbolos.indexOf(validaraux.val()[x]) !== -1) {
                           simbolos = true;
                        }
                        if (permitidosnumeros.indexOf(validaraux.val()[x]) !== -1) {
                           numeros = true;
                        }
                     }
                     if (minusculas === false || mayusculas === false || simbolos === false || numeros === false) {
                        aprobado = false;
                        error_m.push('La Contraseña No Cumple Con Los Requisitos Debe Contener Al Menos (1 letra mayuscula,1 minuscula,1 simbolo y 1 numero) ');
                     }
                  }
                  if (validaraux.attr('pass-verifica')) {
                     if ($('#' + validaraux.attr('pass-verifica') + '').val() != validaraux.val()) {
                        aprobado = false;
                        error_m.push('Las Contraseñas no son iguales ');
                     }
                  }
                  break;
               case 'number':
                  if (validaraux.attr('min')) {
                     var tipovalor = parseInt(validaraux.attr('min'));
                     if (parseInt(validaraux.val()) < tipovalor) {
                        aprobado = false;
                        error_m.push('El Campo esta por debajo del limite:' + tipovalor);
                     }
                  }
                  if (validaraux.attr('max')) {
                     var tipovalor = parseInt(validaraux.attr('max'));
                     if (parseInt(validaraux.val()) > tipovalor) {
                        aprobado = false;
                        error_m.push('El Campo esta por encima del maximo:' + tipovalor);
                     }
                  }
                  break;
               case 'hidden':
                  if (validaraux.val() === "") {
                     aprobado = false;
                  }
                  break;
               case 'text':
                  if (validaraux.attr('fecha') !== undefined) {
                     var aprobarfecha = true;
                     var fechasplit = validaraux.val().split('-');
                     if (fechasplit.length === 3) {
                        if (fechasplit[0].length !== 4 || isNaN(fechasplit[0]) || fechasplit[1].length !== 2 || isNaN(fechasplit[1]) || fechasplit[2].length !== 2 || isNaN(fechasplit[2])) {
                           aprobarfecha = false;
                        }
                     } else {
                        aprobarfecha = false;
                     }
                     if (aprobarfecha === false) {
                        error_m.push('Este Campo Debe De Ser Una Fecha De Con La Siguiente Estructura: (AAAA-MM-DD)');
                        aprobado = false;
                     }
                  }
                  if (validaraux.attr('cedula') === 'no') {
                     error_m.push('Este Campo Debe De Ser Una Cedula De Identidad Con La Siguiente Estructura: (V-12345678)');
                     aprobado = false;
                  }
                  if (validaraux.attr('validark') === 'medida') {
                     if (parseInt(validaraux.attr('medida')) > 0 && validaraux.val() !== 'Sin Especificar') {
                        var valor = validaraux.val().split('x');
                        if (valor.length !== parseInt(validaraux.attr('medida')) || valor[valor.length - 1] === '') {
                           error_m.push('Este Campo Debe De Ser Una Medida Con ' + validaraux.attr('medida') + ' Dimenciones');
                           aprobado = false;
                        }
                     }

                  }
                  if (validaraux.attr('correo') === 'no') {
                     error_m.push('Este Campo Debe De Ser Un Correo Electronico Con La Siguiente Estructura: (correo@midominio.com)');
                     aprobado = false;
                  }
                  if (validaraux.attr('min') !== undefined) {
                     var tipovalor = parseInt(validaraux.attr('min'));
                     var aux = validaraux.val();
                     if (parseInt(aux) < tipovalor) {
                        aprobado = false;
                        error_m.push('El Campo esta por debajo del limite:' + tipovalor);
                     }
                  }
                  if (validaraux.attr('max') !== undefined) {
                     var tipovalor = parseInt(validaraux.attr('max'));
                     if (parseInt(validaraux.val()) > tipovalor) {
                        aprobado = false;
                        error_m.push('El Campo esta por encima del maximo:' + tipovalor);
                     }
                  }
                  if (validaraux.attr('min-length') !== undefined) {
                     var tipovalor = validaraux.attr('min-length');
                     if (validaraux.val().length < tipovalor) {
                        error_m.push('La Longitud Minima Es De:' + validaraux.attr('min-length'));
                        aprobado = false;
                     }
                  }
                  var aux = validaraux.attr('palabras-clave-unica');
                  if (validaraux.attr('palabras-clave-unica') !== undefined) {
                     var palabrasclave = validaraux.attr('palabras-clave-unica').split(',');
                     var palabrasclavecontador = 0;
                     palabrasclave = palabrasclave.filter((item, index) => {
                        return palabrasclave.indexOf(item) === index;
                     })
                     for (var x = 0; x < palabrasclave.length; x++) {
                        if (validaraux.val() === palabrasclave[x]) {
                           palabrasclavecontador++;
                        }
                     }
                     if (palabrasclavecontador !== 1) {
                        error_m.push('El Campo Debe Contener Uno De Los Materiales Existentes En LA Base De Datos');
                        aprobado = false;
                     }
                  }
                  if (validaraux.attr('palabras-clave-unica-no')) {
                     var palabrasclave = validaraux.attr('palabras-clave-unica-no').split(',');
                     var palabrasclavecontador = 0;
                     palabrasclave = palabrasclave.filter((item, index) => {
                        return palabrasclave.indexOf(item) === index;
                     })
                     for (var x = 0; x < palabrasclave.length; x++) {
                        if (validaraux.val() === palabrasclave[x]) {
                           palabrasclavecontador++;
                        }
                     }
                     if (palabrasclavecontador > 0) {
                        error_m.push('El Campo No Debe Contener Uno De Los Siguientes Elementos(' + validaraux.attr("palabras-clave-unica-no") + ')');
                        aprobado = false;
                     }
                  }
                  if (validaraux.attr('palabras-clave-varios')) {
                     var palabrasclave = validaraux.attr('palabras-clave-varios').split(',');
                     var palabrasclavecontador = 0;
                     var sumandoindex = -1;

                     for (var x = 0; x < palabrasclave.length - 1; x++) {
                        if (validaraux.val().indexOf(palabrasclave[x]) !== -1) {
                           if (palabrasclave[palabrasclave.length - 1] === "orden") {
                              if (validaraux.val().indexOf(palabrasclave[x]) > sumandoindex) {
                                 sumandoindex = validaraux.val().indexOf(palabrasclave[x]);
                              } else {
                                 aprobado = false;
                              }
                           }
                           palabrasclavecontador++;
                        }
                     }
                     if (palabrasclavecontador !== palabrasclave.length - 1) {
                        error_m.push('El Campo Debe Contener Los Siguientes Elementos(' + validaraux.attr("palabras-clave-varios") + ')');
                        aprobado = false;
                     }
                  }
                  if (validaraux.attr('validar-correo')) {
                     var tester = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                     if (!tester.test(validaraux.val())) {
                        error_m.push('Debe Ingresar Un Correo Electronico Valido');
                        aprobado = false;
                     }
                  }
                  if (validaraux.attr('tipo-valor')) {
                     var tipovalor = validaraux.attr('tipo-valor');
                     switch (tipovalor) {
                        case 'correo':
                           //fdg
                           var tester = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                           if (!tester.test(validaraux.val())) {
                              error_m.push('Debe Ingresar Un Correo Electronico Valido');
                              aprobado = false;
                           }
                           break;
                        case 'nombreUsuario':
                           var tester = /^[A-z]{1}[A-z1-9_-]+$/g;
                           if (!tester.test(validaraux.val())) {
                              error_m.push('Debe Ingresar Un Usuario Valido Sin Empezar por un numero y sin simbolos especiales');
                              aprobado = false;
                           }
                           break;
                        case 'alfa':
                           if (validaraux.val()[0] === " ") {
                              error_m.push('Debe Ingresar Solo Letras');
                              aprobado = false;
                           }
                           for (var x = 0; x < validaraux.val().length; x++) {
                              if (permitidosalfa.indexOf(validaraux.val()[x]) === -1) {
                                 error_m.push('Debe Ingresar Solo Letras');
                                 aprobado = false;
                              }
                           }
                           break;
                        case 'alfaparentesis':
                           if (validaraux.val()[0] === " ") {
                              error_m.push('Debe Ingresar Solo Letras y parentesis');
                              aprobado = false;
                           }
                           for (var x = 0; x < validaraux.val().length; x++) {
                              if (permitidosalfaparentesis.indexOf(validaraux.val()[x]) === -1) {
                                 error_m.push('Debe Ingresar Solo Letras y parentesis');
                                 aprobado = false;
                              }
                           }
                           break;
                        case 'alfanumericoparentesis':
                           if (validaraux.val()[0] === " ") {
                              error_m.push('Debe Ingresar Solo Letras.numeros y parentesis');
                              aprobado = false;
                           }
                           for (var x = 0; x < validaraux.val().length; x++) {
                              if (permitidosalfanumericoparentesis.indexOf(validaraux.val()[x]) === -1) {
                                 error_m.push('Debe Ingresar Solo Letras,numeros y parentesis');
                                 aprobado = false;
                              }
                           }
                           break;
                        case 'alfanumerico':
                           if (validaraux.val()[0] === " ") {
                              error_m.push('Solo Se Pueden Ingresar Letras O Numeros');
                              aprobado = false;
                           }
                           for (var x = 0; x < validaraux.val().length; x++) {
                              if (permitidosalfanumerico.indexOf(validaraux.val()[x]) === -1) {
                                 error_m.push('Solo Se Pueden Ingresar Letras O Numeros');
                                 aprobado = false;
                              }
                           }
                           break;
                        case 'numerico':
                           if (isNaN(validaraux.val())) {
                              error_m.push('Debe Ingresar Valores Numericos');
                              aprobado = false;
                           }
                           break;
                     }
                  }

                  break;
               case 'checkbox':
                  if ($(validaraux[0]).attr('on') === '') {
                     if (!validaraux.prop('checked')) {

                        error_m.push('El Siguiente Campo Debe Seleccionarse');
                        aprobado = false;
                     }
                  }
                  break;
            }
            break;
         case 'SELECT':
            if (validaraux.val() === "") {
               error_m.push('Seleccione Una Opcion');
               aprobado = false;
            }
            break;
         case 'TEXTAREA':
            if (validaraux.attr('min-length')) {
               var tipovalor = validaraux.attr('min-length');
               if (validaraux.val().length < tipovalor) {
                  error_m.push('La Longitud Minima Es De:' + validaraux.attr('min-length'));
                  aprobado = false;
               }
            }
            if (validaraux.attr('permitir-vacio') !== 'si' && validaraux.val() === "") {
               error_m.push('El Elemento No Puede Estar Vacio');
               aprobado = false;
            }

            break;
         case 'DIV':

            switch (validaraux.attr('type')) {
               case 'capcha':
                  if ($("#g-recaptcha-response").val() === "") {
                     error_m.push('Complete El La Comprobacion');
                     aprobado = false;
                  }
                  break;
            }
            break;
      }
      var hidden = validaraux.attr('hidden');
      if (validaraux.attr('hidden') === 'hidden') {
         error_m = [];
      }
      return [aprobado, error_m];

   };
   return funciones;
});