// Configuración de la Fecha Meta (27 de Abril de 2026)
const fechaMeta = new Date(2026, 3, 27, 0, 0, 0).getTime(); // 3 es Abril

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
    if (!contenedorCorazon.classList.contains('oculto')) {
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('sorpresa').classList.remove('oculto');
        
        // Usamos las variables que definiste abajo (vid1 y vid2)
        vid1.style.display = 'block';
        vid2.style.display = 'none';
        vid1.play();
    }
};

const vid1 = document.getElementById('video1');
const vid2 = document.getElementById('video2');

// Cuando el primer video termine...
vid1.onended = function() {
    vid1.style.display = 'none'; // Ocultamos el primero
    vid2.style.display = 'block'; // Mostramos el segundo
    vid2.play(); // ¡Le damos play automáticamente!
};

// Cuando el segundo video termine...
vid2.onended = function() {
    // Cambiamos la orientación de la galería a vertical para que quepan ambos
    document.querySelector('.galeria').style.flexDirection = 'column';
    
    vid1.style.display = 'block';
    vid2.style.display = 'block';
    
    // Opcional: que vuelvan a empezar o se queden quietos
    console.log("¡Ambos videos terminaron!");
};

// Funciones de los botones de video que ya tenías
function pausarReanudar() {
    // Si el video 1 se está viendo, lo pausamos a él
    if (vid1.style.display !== 'none') {
        if (vid1.paused) vid1.play(); else vid1.pause();
    } 
    // Si no, pausamos al video 2
    else {
        if (vid2.paused) vid2.play(); else vid2.pause();
    }
}
function volverAlInicio() {
    // 1. Pausamos y reseteamos el tiempo de ambos videos
    vid1.pause(); 
    vid1.currentTime = 0; 
    vid2.pause(); 
    vid2.currentTime = 0;

    // 2. IMPORTANTE: Resetear la visibilidad (Primero se ve, segundo se oculta)
    vid1.style.display = 'block';
    vid2.style.display = 'none';

    // 3. Quitar el modo "uno arriba del otro" si es que ya terminó la transición
    const galeria = document.querySelector('.galeria');
    if(galeria) {
        galeria.style.flexDirection = 'row'; // O el valor que tengas por defecto
    }

    // 4. Cambiar las pantallas
    document.getElementById('sorpresa').classList.add('oculto');
    // Usamos 'block' o el que uses para que se vea el inicio
    document.getElementById('inicio').style.display = 'block'; 
}