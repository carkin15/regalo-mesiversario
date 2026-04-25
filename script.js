// Configuración de la Fecha Meta (25 de Abril de 2026)
const fechaMeta = new Date(2026, 3, 2, 0, 0, 0).getTime(); // 3 es Abril

const canvas = document.getElementById('heart');
const puerta = document.getElementById('contenedor-puerta');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const contenedorCorazon = document.getElementById('contenedor-corazon');
const subMensaje = document.getElementById('sub-mensaje');

// 1. Lógica del Contador en tiempo real
function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaMeta - ahora;

    if (distancia <= 0) {
        // Tiempo terminado, mostrar todo en 00
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        document.getElementById("segundos").innerText = "00";
        return true; // Ya llegó la fecha
    }

    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = d.toString().padStart(2, '0');
    document.getElementById("horas").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = m.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = s.toString().padStart(2, '0');
    return false;
}

// Ejecutar el reloj cada segundo
setInterval(actualizarReloj, 1000);

// 2. Clic interactivo en el Candado
puerta.onclick = function() {
    const disponible = actualizarReloj();

    if (disponible) {
        // Ya es el 27: ANIMACIÓN DE ABRIR
        puerta.classList.add('abrir-candado');
        subMensaje.innerHTML = "¡Nuestro secreto se está abriendo!";
        
        setTimeout(() => {
            pantallaBloqueo.classList.add('oculto');
            contenedorCorazon.classList.remove('oculto');
            iniciarCorazon(); // Lanza tu corazón tecnológico (4000 partículas)
        }, 1500);
    } else {
        // Aún falta: ANIMACIÓN DE SACUDIR Y MENSAJE
        puerta.classList.add('sacudir');
        
        // Quitar la clase después de la animación para que se pueda volver a sacudir
        setTimeout(() => {
            puerta.classList.remove('sacudir');
        }, 500);
        
        // Efecto de sonido (opcional, si tienes un archivo de sonido)
        // new Audio('sonido-bloqueo.mp3').play();
        
        alert("¡Aún no es el momento! Ten paciencia amor. ❤️");
    }
};

// --- TU CÓDIGO DEL CORAZÓN QUE TE GUSTÓ (4000 partículas) ---
function iniciarCorazon() {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    let rotation = 0;

    for (let i = 0; i < 3000; i++) { // He ajustado a 3000 para que no se caliente tanto
        const t = Math.random() * Math.PI * 2;
        const thickness = Math.random() * 1.1 + 0.1;
        particles.push({ t, thickness, size: Math.random() * 1.5 + 0.5 });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotation += 0.01;
        particles.forEach(p => {
            const x = 16 * Math.pow(Math.sin(p.t), 3) * p.thickness;
            const y = -(13 * Math.cos(p.t) - 5 * Math.cos(2 * p.t) - 2 * Math.cos(3 * p.t) - Math.cos(4 * p.t)) * p.thickness;
            const z = x * Math.sin(rotation);
            const perspective = 300 / (300 + z);
            const px = (x * Math.cos(rotation)) * 9 * perspective + canvas.width / 2;
            const py = y * 9 * perspective + canvas.height / 2;
            
            // Efecto centelleante
            ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#ff0033';
            ctx.beginPath();
            ctx.arc(px, py, p.size * perspective, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// Lógica de Videos que ya tenías
canvas.onclick = function() {
    if (!canvas.classList.contains('oculto')) {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('sorpresa').classList.remove('oculto');
        video1.play();
    }
};

const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
video1.onended = () => video2.play();

// Funciones de los botones de video que ya tenías
function pausarReanudar() {
    if (!video1.paused && !video1.ended) { video1.pause(); } else if (video1.paused && !video1.ended) { video1.play(); }
    if (!video2.paused && !video2.ended) { video2.pause(); } else if (video2.paused && video1.ended) { video2.play(); }
}
function volverAlInicio() {
    video1.pause(); video1.currentTime = 0; video2.pause(); video2.currentTime = 0;
    document.getElementById('sorpresa').classList.add('oculto');
    document.getElementById('inicio').style.display = 'flex';
    document.getElementById('inicio').style.overflow = 'hidden';
}