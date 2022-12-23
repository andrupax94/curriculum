//posible desuso
candres.directive('correo', function(andres) {

    function link(scope, element, attrs) {
        element.keydown(function(e) {
            var codigo = e.which;
            var aprobado = "si";
            if (codigo === 8) {
                b
                element.attr('correo', 'no');
            }
        });
        element.keypress(function(e) {
            var codigo = e.which;
            var aprobado = "si";

            codigo = String.fromCharCode(codigo);


            if (element.val().indexOf('@') === -1) {
                if ((codigo === '@' || codigo === '.') && element.val().length < 4) {
                    return false;
                }
            } else {
                if (element.val().indexOf('.') === -1) {
                    if (codigo === '@') {
                        aprobado = 'no';
                    }
                    var despuesa = element.val().split('@');
                    if (codigo === '.' && despuesa[1].length <= 3) {
                        aprobado = 'no';
                    } else if (codigo === '.') {
                        element.val(element.val() + '.com');
                        element.attr('correo', 'si');
                        return false;
                    }
                    if (element.val().indexOf('.com') !== -1) {
                        aprobado = 'no';
                    }
                    if (element.val().indexOf('.') !== -1) {
                        aprobado = 'no';
                    }

                } else {
                    var despuesa = element.val().split('.');
                    element.val(despuesa[0] + '.com');
                    element.attr('correo', 'si');
                    return false;
                }
            }
            if (aprobado === "no") {
                if (element.val().indexOf('.com') === -1) {
                    element.attr('correo', 'no');
                }
                return false;
            }


        });
        setTimeout(function() {
            element.keypress();
            element.keydown();
        }, 500);
    }
    return {
        link: link
    };
});
candres.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})


candres.directive('colorpk', function() {
    return function(scope, element, attrs) {
        var model = element.attr('rollermodel');
        element.ColorPicker({
            flat: false,
            onSubmit: function(hsb, hex, rgb, el) {
                $(el).ColorPickerHide();
                $(el).css('background-color', '#' + hex);
                scope[model] = '#' + hex;
                if (attrs.callback !== "") {
                    scope[attrs.callback]();
                }


                scope.$apply();
            },
            onBeforeShow: function() {

            }
        });



    };
});
candres.directive('getsvg', function(andres) {
    function link(scope, element, attrs) {

        andres.getsvg(element, attrs.getsvg);
    }
    return {
        link: link
    };
});
candres.directive('getsvg2', function(andres) {
    function link(scope, element, attrs) {

        andres.getsvg(element, attrs.getsvg2, 2);
    }
    return {
        link: link
    };
});

candres.directive('nospace', function(andres) {
    function link(scope, element, attrs) {
        $(element).keypress(function(e) {
            var evento_key = e.keyCode;
            if (evento_key == '32') //comparo tecla space

                return false;
        });
    }

    return {
        link: link
    };
});


//desconocimiento parcial de uso
candres.directive('autocompletado', function(andres) {
    function link(scope, element, attrs) {
        setTimeout(function() {
            $(element[0]).trigger('focusout');

        }, 200);
        var aux = attrs.autocompletado.split(',');
        if (aux.length === 1) {
            andres.autocomplete(element, scope[attrs.autocompletado], scope, attrs.ngModel);
        } else {
            andres.autocomplete(element, scope[aux[0]], scope, attrs.ngModel, aux[1]);
        }
        $(element[0]).keyup(function(e) {
            cadena = /\w+\(\d$/;
            if (cadena.test($(element[0]).val())) {
                $(element[0]).val($(element[0]).val().split('(')[0]);
            }
        });
    }
    return {
        link: link
    };
});
candres.directive('validar', function(andres) {
    var contador = 0;

    function link(scope, element, attrs) {

        if ($(element[0]).attr('type') === 'checkbox' || $(element)[0].tagName === 'SELECT') {
            setTimeout(function() {
                $(element[0]).attr('primeraVez', 'true');
                $(element[0]).trigger('keyup');

            }, 500);
        } else {
            setTimeout(function() {
                $(element[0]).trigger('change');

            }, 500);
        }


        if (scope.validar !== undefined) {
            auxWhile = false;
            var changeAux = false;
            keyup();

            $(element[0]).attr('validarerror', contador);
            $(element[0]).parent().append('<div activo="false" validarerror="' + contador + '" class="validarError"><div class="triangulo"></div><div class="validarErrorMsn"></div></div>');
            $('.validarError[validarerror=' + contador + ']').eq(0).mousedown(function(e) {
                var validarerror = $(e.currentTarget);
                validarerror.css('opacity', '0');
                setTimeout(function() {
                    validarerror.css('visibility', 'hidden');
                }, 200);
                element = $('input[validarerror=' + validarerror.attr('validarerror') + ']').eq(0);

            });
            contador++;

        }
        $(element[0]).change(function(e) {
            e.stopPropagation();
            if ($(element[0]).attr('type') === 'checkbox' || $(element)[0].tagName === 'SELECT') {
                keyup();
            }
        });
        $(element[0]).keyup(function(e) {
            e.stopPropagation();
            keyup();
        });

        $(element[0]).focus(function(e) {
            e.stopPropagation();
            var validarerror = $('.validarError[validarerror=' + $(element[0]).attr('validarerror') + ']');
            validarerror.eq(0).css('opacity', '0');
            setTimeout(function() {
                validarerror.css('visibility', 'hidden');
            }, 200);

            $(element[0]).removeClass('validarErrorInput');
            $(element[0]).parent().find('h5').removeClass('validarErrorInputh5');

            keyup();
        });
        $(element[0]).focusout(function(e) {

            e.stopPropagation();
            $('.validarError').attr('activo', 'false');
            $('.validarError').css('visibility', 'hidden');
            $('.validarError').css('opacity', '0');
            $('.validarError').css('top', 0 + 'px');
            $('.validarError').css('left', 0 + 'px');
            var validarerror = $('.validarError[validarerror=' + $(element[0]).attr('validarerror') + ']');
            setTimeout(function() {
                if ((!andres.validar($(element), attrs)[0]) && ($(element[0]).val() !== "") && ($(element[0]).attr('hidden') !== 'hidden')) {
                    $(element[0]).addClass('validarErrorInput');
                    if ($(element[0]).attr('displayE') !== 'false') {
                        if (validarerror.length > 0) {
                            let coordsEL = element[0].getBoundingClientRect();
                            let coordsPa = validarerror[0].getBoundingClientRect();
                            let top = (coordsEL.top - coordsPa.top) + coordsEL.height + 20;
                            let left = (coordsEL.left - coordsPa.left) + 20;
                            validarerror.css('top', top + 'px');
                            validarerror.css('left', left + 'px');
                        }
                        if (element.attr('class').indexOf('validarErrorInput') !== -1) {

                            validarerror.css('visibility', 'visible');
                            validarerror.eq(0).css('opacity', '1');
                            $(element[0]).parent().find('h5').addClass('validarErrorInputh5');
                        }
                    }
                } else {
                    $(element[0]).removeClass('validarErrorInput');
                    if ($(element[0]).attr('displayE') !== 'false') {
                        validarerror.css('visibility', 'hidden');
                        validarerror.eq(0).css('opacity', '0');
                        $(element[0]).parent().find('h5').removeClass('validarErrorInputh5');

                        $(element[0]).attr('validar', 'true');
                    }
                }
                keyup();
            }, 200);

        });

        function keyup() {
            scope.validar[0] = true;

            var aux = andres.validar($(element), attrs, scope);
            $(element[0]).attr('validar', aux[0]);

            if ($(element[0]).attr('displayE') !== 'false') {
                var validarerror = $('.validarError[validarerror=' + $(element[0]).attr('validarerror') + ']');

                if (aux[0] === false) {
                    var listaErrorHtml = "";
                    aux[1].forEach(element => {
                        listaErrorHtml = listaErrorHtml + '<li title="' + element + '">' + element + '</li>';
                    });


                    if ($(element[0]).attr('primeraVez') !== 'true') {

                        validarerror.eq(0).find('.validarErrorMsn').html('<h5>Revise Los Siguientes Errores:</h5><ol>' + listaErrorHtml + '</ol>');

                        validarerror.eq(0).attr('activo', 'true');

                    } else if ($(element[0]).attr('type') === 'checkbox') {
                        $(element[0]).attr('primeraVez', 'false');
                    }
                } else {
                    validarerror.eq(0).css('opacity', '0');
                    setTimeout(function() {
                        validarerror.css('visibility', 'hidden');
                    }, 500);
                    validarerror.eq(0).attr('activo', 'false');
                    $(element[0]).parent().find('h5').removeClass('validarErrorInputh5');

                }
            }
            for (var i = 0; i < $('[validar]').length; i++) {

                if ($('[validar]').eq(i).attr('validar') === 'false') {
                    scope.validar[0] = false;
                }
            }
            scope.$evalAsync(scope.validar);
        };


    }
    return {
        link: link
    };
});

//desconocimiento parcial de uso
candres.directive('ask', function(andres) {

    function link(scope, element, attrs) {
        element.addClass('ask flexc');
        attrs.ask = (attrs.ask == undefined) ? "" : attrs.ask;
        element.append('<div class="askMsn"><div class="triangulo"></div>' + attrs.ask + '</div>');
        element.mouseenter(function(e) {
            e.stopPropagation();
            $(element).children('div').css('opacity', '1');
        });
        element.mouseleave(function(e) {
            e.stopPropagation();
            $(element).children('div').css('opacity', '0');
        });
    }
    return {
        link: link
    };
});
candres.directive('placeholdertop', function(andres, $timeout) {

    function link(scope, element, attrs) {
        var element = $(element[0]);
        var height;
        var width;
        $timeout(function() {
                element.addClass('placeholderTopI');
                height = element.css('height');
                element.parent().children('*');
                attrs.ngModel = (attrs.ngModel == undefined ? "" : attrs.ngModel);
                attrs.ngChange = (attrs.ngChange == undefined ? "" : attrs.ngChange);
                var bg = element.css('background-color');
                var attr = element.attr('id');
                if (attr === undefined) {

                    attr = andres.generaRandomString(8);
                    while ($('#' + attr + '').length > 0) {
                        attr = andres.generaRandomString(8);
                    }
                    element.attr('id', attr);

                }
                var hermano = $(element[0]).next();
                var html = '<div id="' + attr + '_parent" class="placeholderTopC"><div class="placeholderTopD"><h5>' + attrs.placeholdertop + '</h5></div></div>';
                if (hermano.length >= 1)
                    hermano.before(html);
                else
                    element.parent().append(html);
                var nuevoDiv = $('#' + attr + '_parent');
                nuevoDiv.children('div').css('height', nuevoDiv.css('height'));

                nuevoDiv.css('top', element.css('top'));
                nuevoDiv.css('left', element.css('left'));
                nuevoDiv.css('rigth', element.css('rigth'));
                nuevoDiv.css('bottom', element.css('bottom'));
                nuevoDiv.css('position', element.css('position'));
                bg.indexOf('rgba(0, 0, 0, 0)', 0) != -1 ? bg = 'white' : element.css('background-color');
                element.appendTo(nuevoDiv);
                nuevoDiv.children('div').children('h5').css('font-family', element.css('font-family'));
                nuevoDiv.children('div').children('h5').css('font-size', element.css('font-size'));
                nuevoDiv.children('div').children('h5').css('background', bg);
                if (element.val() != "") {
                    andres.focusPlaceholderTop(undefined, nuevoDiv);
                }


                nuevoDiv.children('input').focus(function(e) {
                    andres.focusPlaceholderTop(e, nuevoDiv);
                });
                nuevoDiv.children('input').focusout(function(e) {
                    andres.focusoutPlaceholderTop(e, nuevoDiv);
                });

            },
            1000);
    }
    return {
        link: link
    };
});
//desconocimiento parcial de uso
candres.directive("fileread", ["andres", function(andres) {
    return {
        scope: {
            fileread: "="
        },
        link: function(scope, element, attributes) {

            if (scope.fileread !== undefined && scope.fileread !== "") {
                var i = new Image();
                i.onload = function() {

                    $('#imagen').attr('dimenciones', i.height + ',' + i.width);
                };
                i.src = scope.fileread;
            }

            element.bind("change", function(changeEvent) {
                var reader = new FileReader();
                var aux = changeEvent.target.files[0].name.split('.');
                var size = changeEvent.target.files[0].size;
                var extencion = aux[aux.length - 1];
                var validaraux = element;
                var aprobado = true;
                reader.onload = function(loadEvent) {

                    if (validaraux.attr('imagen-width') || validaraux.attr('imagen-height') || validaraux.attr('imagen-size')) {
                        var i = new Image();
                        i.onload = function() {

                            var image = [];
                            image.height = i.height;
                            image.width = i.width;
                            if (validaraux.attr('imagen-width')) {
                                var imagewidth = validaraux.attr('imagen-width').split(',');
                                if (image.width < imagewidth[0] || image.width > imagewidth[1]) {
                                    //todoFactory.mensaje('El Ancho De Imagen No Cumple','warning');
                                    element.attr('aprobado', 'no');
                                    aprobado = false;
                                }
                            }
                            if (validaraux.attr('imagen-height')) {
                                var imageheight = validaraux.attr('imagen-height').split(',');
                                if (image.height < imageheight[0] || image.height > imageheight[1]) {
                                    //todoFactory.mensaje('El alto De Imagen No Cumple','warning');
                                    element.attr('aprobado', 'no');
                                    aprobado = false;
                                }
                            }
                            if (validaraux.attr('imagen-size')) {
                                var imagesize = validaraux.attr('imagen-size');

                                if (parseInt(size) > parseInt(imagesize)) {
                                    //todoFactory.mensaje('El Tamaño De La Imagen No Cumple','warning');
                                    element.attr('aprobado', 'no');
                                    aprobado = false;
                                }
                            }
                            if (aprobado === true) {

                                scope.$apply(function() {
                                    scope.fileread = loadEvent.target.result;
                                    element.attr('aprobado', 'si');
                                });
                            }


                        };
                        i.src = loadEvent.target.result;
                    } else {


                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                            element.attr('aprobado', 'si');
                        });
                    }
                }



                if (validaraux.attr('imagen-extencion')) {
                    var extensiones = validaraux.attr('imagen-extencion').split(',');
                    var extencionescontador = 0;
                    for (var x = 0; x < extensiones.length; x++) {
                        if (extencion !== extensiones[x]) {
                            extencionescontador++;
                        }
                    }
                    if (extencionescontador === extensiones.length) {
                        //todoFactory.mensaje('Extencion No Permitida','warning');
                        element.attr('aprobado', 'no');
                    } else {
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    }
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }


            });
        }
    }
}]);
candres.directive('validark', function() {


    function link(scope, element, attrs) {

        element.keypress(function(e) {

            var tipovalidacion = attrs.validark;
            var codigo = e.which;
            codigo = String.fromCharCode(codigo);
            var permitidos = "";
            var aprobado = "no";
            switch (tipovalidacion) {
                case 'numerico':
                    permitidos = "1234567890";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    break;
                case 'alfa':
                    permitidos = "qwertyuiopasdfghjklñzxcvbnm QWERTYUIOPASDFGHJKLÑZXCVBNM";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    if (codigo[0] === "") {
                        aprobado = "no";
                    }
                    break;
                case 'alfaparentesis':
                    permitidos = "qwertyuiopasdfghjklñzxcvbnm QWERTYUIOPASDFGHJKLÑZXCVBNM()";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    if (codigo[0] === "") {
                        aprobado = "no";
                    }
                    break;
                case 'alfanumericoparentesis':
                    permitidos = "qwertyuiopasdfghjklñzxcvbnm QWERTYUIOPASDFGHJKLÑZXCVBNM1234567890()";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    if (codigo[0] === "") {
                        aprobado = "no";
                    }
                    break;

                case 'alfanumerico':
                    permitidos = "qwertyuiopasdfghjklñzxcvbnm QWERTYUIOPASDFGHJKLÑZXCVBNM1234567890@.";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    if (codigo[0] === "") {
                        aprobado = "no";
                    }
                    break;
                case 'alfanumericosimbolos':
                    permitidos = "qwertyuiopasdfghjklzxcñvbnm QWERTYUIOPASDFGHÑJKLZXC@VBNM1234567890!#&/%()'=-_¡¿|°.,";
                    for (var i = 0; i < permitidos.length; i++) {
                        if (codigo === permitidos[i]) {
                            aprobado = "si";
                        }
                    }
                    if (codigo[0] === "") {
                        aprobado = "no";
                    }
                    break;
                case 'decimal':
                    aprobado = "si";

                    if (e.which !== 46) {
                        if (e.which !== 8)
                            if (isNaN(codigo)) {
                                aprobado = "no";
                            }
                    } else {
                        if ($(this).val().indexOf('.') !== -1 || $(this).val().length < 1) {
                            aprobado = "no";
                        }
                    }
                    break;
                case 'medida':
                    aprobado = "si";
                    var iox = $(this).val().split('x');
                    var leg = $(this).val().length;
                    var medida = $(this).attr('medida');
                    if (e.which !== 120) {
                        if (e.which !== 8)
                            if (isNaN(codigo)) {
                                aprobado = "no";
                            }

                    } else {


                        iox.forEach(element => {
                            if (element === '' || iox.length >= parseInt(medida)) {
                                aprobado = "no";
                            }
                        });


                    }
                    break;
                case '':
                    aprobado = "si";
                    break;
            }
            if ($(this).attr('maxlength') !== undefined) {
                if ($(this).val().length + 1 > $(this).attr('maxlength')) {
                    aprobado = 'no';
                }
            }
            if ($(this).attr('max') !== undefined) {
                console.log($(this).val() + codigo);
                if (parseInt($(this).val() + codigo) > $(this).attr('max')) {
                    aprobado = 'no';
                }
            }
            if ($(this).val().length < 1 && codigo === " ") {
                aprobado = 'no';

            }
            if (aprobado === "no") {
                return false;
            }



        });
    }
    return {
        link: link
    };
});