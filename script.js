// Función para inicializar el lienzo y permitir dibujar
function initCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    var painting = false;

    // Inicia el dibujo cuando se hace clic o se toca el lienzo
    function startPosition(e) {
        painting = true;
        draw(e);
    }

    // Detiene el dibujo cuando se deja de hacer clic o se levanta el dedo
    function endPosition() {
        painting = false;
        ctx.beginPath(); // Reinicia el trazo para no continuar de donde se dejó
    }

    // Dibuja en el lienzo mientras se mueve el ratón o el dedo
    function draw(e) {
        if (!painting) return;

        var posX, posY;
        if (e.type.startsWith('touch')) {
            posX = e.touches[0].clientX - canvas.offsetLeft;
            posY = e.touches[0].clientY - canvas.offsetTop;
        } else {
            posX = e.clientX - canvas.offsetLeft;
            posY = e.clientY - canvas.offsetTop;
        }

        ctx.lineWidth = 2;  // Grosor de la línea de la firma
        ctx.lineCap = "round"; // Redondea el final de las líneas
        ctx.strokeStyle = "#000"; // Color de la firma

        ctx.lineTo(posX, posY);  // Calcula la posición relativa
        ctx.stroke();  // Dibuja la línea
        ctx.beginPath(); // Reinicia el trazo
        ctx.moveTo(posX, posY); // Mantiene la posición del ratón o dedo
    }

    // Agrega los eventos de mouse y tactiles para dibujar
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", draw);
}

// Función para borrar el contenido del lienzo
function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia todo el contenido del lienzo
}

// Función para guardar la firma como imagen
function saveSignature(canvasId) {
    var canvas = document.getElementById(canvasId);
    var dataURL = canvas.toDataURL("image/png");  // Convierte el lienzo a una imagen PNG

    // Crear un enlace para descargar la imagen
    var link = document.createElement("a");
    link.href = dataURL;  // Enlace con la imagen generada
    link.download = canvasId + "-firma.png";  // Nombre del archivo
    link.click();  // Simula un clic para descargar la imagen
}

// Inicializa los dos lienzos (para las firmas del cliente y especialista)
initCanvas("firmaCliente");
initCanvas("firmaEspecialista");
