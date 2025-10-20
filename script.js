document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const mensajeError = document.getElementById("mensajeError");

  // Lista de usuarios
  const usuarios = [
    { nombre: "Admin", email: "admin@gmail.com", contraseña: "123456" },
    { nombre: "Yazmani", email: "yazmanilucio07@gmail.com", contraseña: "yazmani07" },
    { nombre: "Aiker", email: "aiker@gmail.com", contraseña: "aiker123" },
    { nombre: "Miguel", email: "miguel@gmail.com", contraseña: "miguel123" }
  ];

  // Si ya hay usuario en sesión, redirige
  if(localStorage.getItem("usuario")) window.location.href = "bienvenida.html";

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      mensajeError.textContent = "⚠️ Por favor, ingresa un email válido.";
      return;
    }

    const usuarioValido = usuarios.find(u => u.email === email && u.contraseña === password);

    if(usuarioValido){
      localStorage.setItem("usuario", JSON.stringify(usuarioValido));
      setTimeout(()=> window.location.href = "bienvenida.html", 300);
    } else {
      mensajeError.textContent = "❌ Correo o contraseña incorrectos.";
    }
  });
});
