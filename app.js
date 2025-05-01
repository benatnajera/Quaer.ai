// Cambiar de secciones (Inicio, Planes, Contacto, etc.)
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    sections.forEach((section) => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    document.getElementById(targetId).classList.add("active");
  });
});

// Inicial: mostrar sección Home
document.getElementById("home").classList.add("active");

// Chat funcionalidad
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const contadorChats = document.getElementById("contadorChats");

// Configuración del plan gratuito
const esGratis = true; // TRUE = plan gratuito
let limiteMensajesTotales = esGratis ? 10 : Infinity;
let mensajesUsados = 0;

// Enviar mensaje
function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // Verificar si alcanzó el límite de mensajes
  if (mensajesUsados >= limiteMensajesTotales) {
    alert(
      "Has alcanzado el límite de mensajes gratis. Actualiza tu plan para seguir usando el chat."
    );
    return;
  }

  mensajesUsados++;
  actualizarContador();

  // Crear mensaje del usuario
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.innerText = message;
  chat.appendChild(userMessage);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  // Simular respuesta IA
  setTimeout(() => {
    const aiMessage = document.createElement("div");
    aiMessage.className = "message ai";

    // Si el mensaje menciona 'pdf', genera PDF automáticamente
    if (message.toLowerCase().includes("pdf")) {
      aiMessage.innerText = "Generando tu PDF...";
      exportarRespuestaPDF("Contenido solicitado:\n\n" + message);
    } else {
      aiMessage.innerText =
        "Respuesta de IA: " + message.split("").reverse().join("");
    }

    chat.appendChild(aiMessage);
    chat.scrollTop = chat.scrollHeight;
  }, 800);
}

// Actualizar contador de mensajes
function actualizarContador() {
  const mensajesRestantes = limiteMensajesTotales - mensajesUsados;
  contadorChats.textContent = `Te quedan ${mensajesRestantes} mensajes gratuitos.`;

  if (mensajesRestantes <= 3) {
    contadorChats.classList.add("alerta");
  } else {
    contadorChats.classList.remove("alerta");
  }
}

// Exportar respuesta a PDF
function exportarRespuestaPDF(texto) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date();
  const fechaFormato = fecha.toLocaleDateString("es-ES").replace(/\//g, "-");

  doc.setFont("Helvetica");
  doc.setFontSize(12);
  doc.text(texto, 10, 10);

  doc.save(`peticion_usuario_${fechaFormato}.pdf`);
}

// Detectar Enter para enviar mensaje
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Detectar click en botón
sendButton.addEventListener("click", sendMessage);

// Redirigir de Iniciar Sesión a Registro y viceversa
document.querySelectorAll(".register-link a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    sections.forEach((section) => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    document.getElementById(targetId).classList.add("active");
  });
});

// Función para seleccionar planes
const isLoggedIn = false; // Cambia a true si el usuario ya está autenticado

function suscribirse(plan, precio) {
  localStorage.setItem("planSeleccionado", plan);
  localStorage.setItem("precioPlan", precio);

  alert(`Debes iniciar sesión o registrarte para continuar con el ${plan}`);

  if (!isLoggedIn) {
    if (precio === 0) {
      window.location.href = "#registro";
    } else {
      window.location.href = "#login";
    }
  } else {
    alert(`Redirigiendo al pago del ${plan}...`);
    // Aquí puedes añadir lógica de pago real
  }
}
