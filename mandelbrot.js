var canvas = document.getElementById('mandelbrotCanvas');
var context = canvas.getContext('2d');

// Define a largura e a altura do canvas para preencher a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var width = canvas.width;
var height = canvas.height;

var maxIter = 1000;

var zoom = 1;
var centerX = -0.743643135;
var centerY = 0.131825963;

// Ajuste da velocidade do zoom para uma expansão mais rápida
var zoomSpeed = 0.2; // Aumentado para 0.2

// Zoom atual e próximo para a interpolação suave
var currentZoom = zoom;
var nextZoom = zoom;

// Paleta de cores
var colors = [
    [66, 30, 15],
    [25, 7, 26],
    [9, 1, 47],
    [4, 4, 73],
    [0, 7, 100],
    [12, 44, 138],
    [24, 82, 177],
    [57, 125, 209],
    [134, 181, 229],
    [211, 236, 248],
    [241, 233, 191],
    [248, 201, 95],
    [255, 170, 0],
    [204, 128, 0],
    [153, 87, 0],
    [106, 52, 3]
];

// Inicia o temporizador para o zoom automático
setInterval(function() {
    // Ajusta o próximo zoom
    nextZoom *= (1 + zoomSpeed);

    // Interpolação linear entre o zoom atual e o próximo
    zoom = lerp(currentZoom, nextZoom, 0.1); // O valor 0.1 controla a suavidade do movimento

    // Atualiza o zoom atual
    currentZoom = zoom;

    drawFractal();
}, 100);

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

            var brightness;
            if (n === maxIter) {
                brightness = 0;
            } else {
                brightness = map(n, 0, maxIter, 0, colors.length - 1);
            }

            var color1 = colors[Math.floor(brightness)];
            var color2 = colors[Math.floor(brightness) + 1];

            var interpolation = brightness - Math.floor(brightness);

            var r = Math.round(lerp(color1[0], color2[0], interpolation));
            var g = Math.round(lerp(color1[1], color2[1], interpolation));
            var b = Math.round(lerp(color1[2], color2[2], interpolation));

            context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
            context.fillRect(x, y, 1, 1);
        }
    }
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Função de interpolação linear
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

drawFractal();
