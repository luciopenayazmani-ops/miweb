document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if(!usuario) window.location.href="index.html";

  const emailUsuario = usuario.email;
  const saludo = document.getElementById("saludo");
  const hora = document.getElementById("hora");
  const logout = document.getElementById("logout");
  const sonido = document.getElementById("sonidoCompletar");

  saludo.textContent = `Hola, ${usuario.nombre} 👋`;

  setInterval(() => {
    const ahora = new Date();
    hora.textContent = ahora.toLocaleString("es-MX", { weekday:"long", hour:"2-digit", minute:"2-digit", second:"2-digit" });
  }, 1000);

  logout.addEventListener("click", ()=>{
    if(confirm("¿Seguro que deseas cerrar sesión?")){
      localStorage.removeItem("usuario");
      window.location.href="index.html";
    }
  });

  // Tabs
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");
  tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
      tabs.forEach(t=>t.classList.remove("active"));
      contents.forEach(c=>c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // --- Tareas ---
  const inputTarea = document.getElementById("nuevaTarea");
  const btnAgregarTarea = document.getElementById("agregarTarea");
  const listaTareas = document.getElementById("listaTareas");
  let tareas = JSON.parse(localStorage.getItem("tareas_" + emailUsuario)) || [];

  const guardarTareas = () => localStorage.setItem("tareas_" + emailUsuario, JSON.stringify(tareas));

  const mostrarTareas = () => {
    listaTareas.innerHTML = "";
    tareas.forEach((t,i)=>{
      const li = document.createElement("li");
      li.textContent = t.texto + (t.fecha ? ` (${t.fecha})` : "");
      if(t.completada) li.classList.add("completada");

      li.addEventListener("click", ()=>{
        t.completada = !t.completada;
        guardarTareas();
        sonido.play();
        mostrarTareas();
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent="🗑️"; btnEliminar.classList.add("eliminar");
      btnEliminar.onclick = e=>{
        e.stopPropagation();
        if(confirm("¿Eliminar tarea?")){
          tareas.splice(i,1); guardarTareas(); mostrarTareas();
        }
      };

      li.appendChild(btnEliminar);
      listaTareas.appendChild(li);
    });
  };

  btnAgregarTarea.onclick = ()=>{
    const texto = inputTarea.value.trim();
    if(texto){
      const fecha = new Date().toLocaleDateString();
      tareas.push({ texto, fecha, completada:false });
      guardarTareas(); mostrarTareas();
      inputTarea.value="";
    }
  };
  mostrarTareas();

  // --- Notas ---
  const notaTexto = document.getElementById("notaTexto");
  const guardarNota = document.getElementById("guardarNota");
  const notasGuardadas = document.getElementById("notasGuardadas");
  let notas = JSON.parse(localStorage.getItem("notas_" + emailUsuario)) || [];

  const mostrarNotas = () => {
    notasGuardadas.innerHTML = "";
    notas.forEach((n,i)=>{
      const div = document.createElement("div");
      div.innerHTML = `<p>${n.texto}</p><small>${n.fecha}</small>`;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent="🗑️"; btnEliminar.classList.add("eliminar");
      btnEliminar.onclick = ()=>{
        if(confirm("¿Eliminar nota?")){
          notas.splice(i,1);
          localStorage.setItem("notas_" + emailUsuario, JSON.stringify(notas));
          mostrarNotas();
        }
      };
      div.appendChild(btnEliminar);
      notasGuardadas.appendChild(div);
    });
  };

  guardarNota.onclick = ()=>{
    const texto = notaTexto.value.trim();
    if(texto){
      const fecha = new Date().toLocaleString();
      notas.push({ texto, fecha });
      localStorage.setItem("notas_" + emailUsuario, JSON.stringify(notas));
      notaTexto.value=""; mostrarNotas();
    }
  };
  mostrarNotas();

  // --- Recordatorios ---
  const nuevoRecordatorio = document.getElementById("nuevoRecordatorio");
  const fechaRecordatorio = document.getElementById("fechaRecordatorio");
  const btnAgregarRecordatorio = document.getElementById("agregarRecordatorio");
  const listaRecordatorios = document.getElementById("listaRecordatorios");
  let recordatorios = JSON.parse(localStorage.getItem("recordatorios_" + emailUsuario)) || [];

  const mostrarRecordatorios = () => {
    listaRecordatorios.innerHTML="";
    recordatorios.forEach((r,i)=>{
      const li=document.createElement("li");
      li.textContent = `${r.texto} - ${r.fecha}`;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent="🗑️"; btnEliminar.classList.add("eliminar");
      btnEliminar.onclick = ()=>{
        if(confirm("¿Eliminar recordatorio?")){
          recordatorios.splice(i,1);
          localStorage.setItem("recordatorios_" + emailUsuario, JSON.stringify(recordatorios));
          mostrarRecordatorios();
        }
      };
      li.appendChild(btnEliminar);
      listaRecordatorios.appendChild(li);
    });
  };

  btnAgregarRecordatorio.onclick = ()=>{
    const texto = nuevoRecordatorio.value.trim();
    const fecha = fechaRecordatorio.value;
    if(texto && fecha){
      recordatorios.push({ texto, fecha });
      localStorage.setItem("recordatorios_" + emailUsuario, JSON.stringify(recordatorios));
      nuevoRecordatorio.value=""; fechaRecordatorio.value="";
      mostrarRecordatorios();
    }
  };
  mostrarRecordatorios();
});
