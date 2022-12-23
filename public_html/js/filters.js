candres.filter('revertirfecha', function(andres) {

    return (function(valor) {
        if (valor !== undefined) {
            var aux = andres.convertTZ(valor);
            aux = aux.split(' ');
            var fecha = aux[0].split('/');
            fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2];
            return (fecha);
        }
    });
});
candres.filter('revertirfecha', function(andres) {

    return (function(valor) {
        if (valor !== undefined) {

        }
    });
});
candres.filter('quitarT', function(andres) {

    return (function(valor) {
        if (valor.indexOf('t') !== -1) {
            var aux = valor.split('t')[1];
            return (aux);
        } else {
            return (valor);
        }
    });
});
candres.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
});
candres.filter('stringToArray', function(andres) {
    return function(valor) {
        if (typeof(valor) === 'string') {
            return andres.stringToArray(valor);
        } else {
            return "";
        }
    };
});
candres.filter('arrayToString', function(andres) {
    return function(valor) {
        if (valor !== undefined) {
            if (valor.length === 1)
                return andres.arrayToString(valor);
            else {
                if (typeof valor[0] === 'object')
                    return andres.arrayToString(valor[0], valor[1]);
                else {
                    return andres.arrayToString(valor);
                }
            }
        } else {
            return false;
        }
    }
});

candres.filter('rellenarconceros', function() {
    return function(valor) {

        var length = valor.toString().length;
        var numerodeceros = 10 - length;
        var ceros = "";
        for (var i = 0; i < numerodeceros; i++) {
            ceros = ceros + '0';
        }

        return ceros + valor;
    };
});
candres.filter('fechaconmesstring', function() {

    return (function(valor) {
        if (valor !== undefined) {
            valor = valor.split(" ")[0];
            valor = valor.split('-');
            switch (valor[1]) {
                case '1':
                    valor[1] = 'Enero';
                    break;
                case '2':
                    valor[1] = 'Febrero';
                    break;
                case '3':
                    valor[1] = 'Marzo';
                    break;
                case '4':
                    valor[1] = 'Abril';
                    break;
                case '5':
                    valor[1] = 'Mayo';
                    break;
                case '6':
                    valor[1] = 'Junio';
                    break;
                case '7':
                    valor[1] = 'Julio';
                    break;
                case '8':
                    valor[1] = 'Agosto';
                    break;
                case '9':
                    valor[1] = 'Septiembre';
                    break;
                case '10':
                    valor[1] = 'Obtubre';
                    break;
                case '11':
                    valor[1] = 'Noviembre';
                    break;
                case '12':
                    valor[1] = 'Diciembre';
                    break;
                default:

                    break;
            }
            var fecha = valor[1] + ' ' + valor[2] + ', Del ' + valor[0];
            return (fecha);
        }
    });
});
candres.filter('minMax', function() {
    return (function(valor) {
        if (valor[0] < valor[1]) {
            return valor[1];
        } else if ((valor[0] > valor[2])) {
            return valor[2];
        } else {
            return valor[0];
        }
    });
});


candres.filter('quitarCorchete', function() {
    return (function(valor) {
        var aux = valor.toString().replace("[", "");
        return aux;
    });


});
candres.filter('quitarNumeral', function() {
    return (function(valor) {
        var aux = valor.toString().replace("#", "");
        return aux;
    });
});
candres.filter('parseInt', function() {
    return (function(valor) {
        return parseInt(valor);
    });

});
candres.filter('rgbToHex', function() {
    return (function(rgb) {
        function componentToHex(c) {
            c = parseInt(c);
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        rgb = rgb.replace(/[rgba() ]/g, "").split(',');
        return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
    });

});


candres.filter('precio', function() {
    return (function(valor) {

        var cedulaconpuntos = "";
        valor = valor.toString();

        valor = valor.split('.');

        if (valor[1] === undefined) {
            valor = valor[0];
            var decimales = ",00";
        } else {

            if (valor[1].length < 2) {
                var decimales = ',' + valor[1][0] + '0';
            } else {
                var decimales = ',' + valor[1][0] + valor[1][1];
            }
            valor = valor[0];
        }
        var x = valor.length;

        while (x >= 0) {

            if (x === 1) {
                cedulaconpuntos = valor[0] + cedulaconpuntos;
            }
            if (x === 2) {
                cedulaconpuntos = valor[0] + valor[1] + cedulaconpuntos;
            }
            if (x === 3) {
                cedulaconpuntos = valor[0] + valor[1] + valor[2] + cedulaconpuntos;
            }


            if (x > 3) {

                cedulaconpuntos = '.' + valor[x - 3] + valor[x - 2] + valor[x - 1] + cedulaconpuntos;


            }
            x--;
            x--;
            x--;

        }

        return (cedulaconpuntos + decimales);
    });
});