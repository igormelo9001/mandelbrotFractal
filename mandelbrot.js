var canvas = document.getElementById('mandelbrotCanvas');
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var maxIter = 1000;

var zoom = 1;
var centerX = -0.5;
var centerY = 0;

canvas.addEventListener('click', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    var zoomFactor = 2; // Fator de zoom desejado

    // Calcula o novo zoom
    zoom *= zoomFactor;

    // Calcula o deslocamento para manter o ponto clicado fixo após o zoom
    var newCenterX = map(x, 0, width, -2.5 / zoom + centerX, 2.5 / zoom + centerX);
    var newCenterY = map(y, 0, height, -2.5 / zoom + centerY, 2.5 / zoom + centerY);

    // Atualiza o centro do fractal
    centerX = newCenterX;
    centerY = newCenterY;

    drawFractal();
});

function drawFractal() {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, -2.5 / zoom + centerX, 2.5 / zoom + centerX);
            var b = map(y, 0, height, -2.5 / zoom + centerY, 2.5 / zoom + centerY);
            var ca = a;
            var cb = b;

            var n = 0;

            while (n < maxIter) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if (a * a + b * b > 16) {
                    break;
                }

                n++;
            }

            var brightness = map(n, 0, maxIter, 0, 1);
            brightness = map(Math.sqrt(brightness), 0, 1, 0, 255);

            var pixel = (x + y * width) * 4;

            context.fillStyle = 'rgb(' + brightness + ', ' + brightness + ', ' + brightness + ')';
            context.fillRect(x, y, 1, 1);
        }
    }
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

drawFractal();
