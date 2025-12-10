//Espera a que todo el html este cargado antes de iniciar l js
document.addEventListener("DOMContentLoaded", e => {

<<<<<<< HEAD
    avigator.geolocation.getCurrentPosition(
        pos => {
            console.log("Ubicación obtenida:", pos.coords);
        },
        err => {
            switch (err.code) {
                case 1: console.error("Permiso denegado"); break;
                case 2: console.error("Posición no disponible"); break;
                case 3: console.error("Timeout"); break;
            }
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );

    // =========================================================
    //  SECCIÓN: PÁGINA INDEX (pantalla de inicio)
    // =========================================================
    if (document.body.classList.contains("index")) {
=======
  /**
   * Calcula edad a partir de una fecha de nacimiento YYYY-MM-DD.
   */
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  }
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

  // =========================================================
  // SECCIÓN: PÁGINA INDEX (pantalla de inicio)
  // =========================================================
  if (document.body.classList.contains("index")) {
    // Botones de la página index
    let botonIniciarSesionIndex = document.getElementById("btn-iniciarsesion-index");
    let botonCrearCuentaIndex = document.getElementById("btn-crearcuenta-index");

    // Delegación de eventos: escucha clicks en todo el documento
    document.addEventListener("click", e => {
      // Si el usuario hace click en "Crear cuenta", redirige a registro
      if (e.target === botonCrearCuentaIndex) {
        window.location.href = "registro.html";
      }
      // Si hace click en "Iniciar sesión", redirige a login
      if (e.target === botonIniciarSesionIndex) {
        window.location.href = "login.html";
      }
    });
  }

  // =========================================================
  // SECCIÓN: PÁGINA REGISTRO
  // =========================================================
  if (document.body.classList.contains("registro")) {
    // Botón de envío del formulario de registro
    const botonRegistro = document.getElementById("boton-enviar-registro");

    // Al hacer click en el botón se valida el registro
    botonRegistro.addEventListener("click", e => {
      e.preventDefault();  // Evita que el formulario se envíe de forma tradicional
      validarRegistro();   // Llama a la función que valida y envía los datos
    });

<<<<<<< HEAD
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        return edad;
    }

    if (document.body.classList.contains("registro")) {
=======
    /**
     * Convierte la primera letra en mayúscula y el resto en minúscula.
     * Sirve para normalizar nombre y apellido.
     */
    function primeraLetraMayuscula(texto) {
      if (!texto) return "";
      const resultado = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
      return resultado;
    }

    /**
     * Valida los datos del formulario de registro y, si todo está bien,
     * construye un objeto usuario y lo envía al backend con fetch (POST).
     */
    async function validarRegistro() {
      // recoger los datos sin espacios
      const nombre = primeraLetraMayuscula(document.getElementById("nombre-registro").value.trim());
      const apellido = primeraLetraMayuscula(document.getElementById("apellido-registro").value.trim());
      const correo = document.getElementById("correo-registro").value.trim();
      const password = document.getElementById("password-registro").value.trim();
      const fechaNacimiento = document.getElementById("fecha-nacimiento-registro").value;
      const generoUsuario = document.getElementById("genero-registro").value;
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

      // validación de campos para evitar que estén vacios
      if (!nombre || !apellido || !correo || !password || !fechaNacimiento || !generoUsuario) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Calcula la edad a partir de la fecha de nacimiento
      const edadForm = calcularEdad(fechaNacimiento);

    
      // Validación de rango de edad permitido
      if (edadForm < 18 || edadForm > 120) {
        alert("La edad debe estar entre 18 y 120 años.");
        return;
      }

      // Fecha de registro actual en formato ISO
      const fechaRegistro = new Date().toISOString();

      // se recibe el json con todos los datos, incluso los que no necesitemos
      const usuario = {
        nickname: nombre,
        nombre,
        apellido,
        correo,
        password,
        edad: edadForm,
        ciudad: "Sin especificar",
        fechaNacimiento,
        generoUsuario,
        descripcion: "Hola, soy nuevo en la app.",
        fechaRegistro
      };

      try {
        console.log("📤 Enviando usuario:", usuario);
        
        // Llamada a la API REST para crear usuario
        const response = await fetch("http://localhost:8090/api/usuario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario)
        });

        // Si la respuesta no es OK, mostramos error detallado
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error del servidor:", response.status, errorText);
          alert(`Error al crear usuario:\nCódigo: ${response.status}\nDetalle: ${errorText}`);
          return;
        }

        // Convertir la respuesta a JSON (usuario creado con su id)
        const data = await response.json();
        console.log("✅ Usuario creado:", data);

        // Guardar datos importantes en localStorage para usarlos después
        localStorage.setItem("idUsuario", data.id);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
        localStorage.setItem("correo", data.correo);
        localStorage.setItem("password", data.password);
        localStorage.setItem("fechaNacimiento", data.fechaNacimiento);
        localStorage.setItem("generoUsuario", data.generoUsuario);

        // Redirigir al index
        window.location.href = "index.html";

      } catch (error) {
        console.error(" Error en el registro:", error);
        alert("Error de conexión: " + error.message);
      }
    }
  }

<<<<<<< HEAD
            const edadForm = calcularEdad(fechaNacimiento);

            if (edadForm < 18 || edadForm > 120) {
                alert("La edad debe estar entre 18 y 120 años.");
                return;
            }
=======
  // =========================================================
  // SECCIÓN: PÁGINA LOGIN
  // =========================================================
  if (document.body.classList.contains("login")) {
    // Botón de "Iniciar sesión" en la pantalla de login
    let botonEntrarPrincipal = document.getElementById("boton-entrar-principal");

    // Delegación de eventos para manejar el click
    document.addEventListener("click", e => {
      if (e.target === botonEntrarPrincipal) {
        e.preventDefault();
        validarLogin();  // Llamar a la función de validación de login
      }
    });
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

    /**
     * Valida las credenciales de login contra la API:
     * - busca el usuario por correo
     * - verifica la contraseña
     * - si es correcto, guarda datos en localStorage y navega a principal.html
     */
    async function validarLogin() {
      const correoLogin = document.getElementById("correo-login").value;
      const passwordLogin = document.getElementById("password-login").value;

      try {
        // Petición al backend para obtener usuario por correo
        const respuesta = await fetch(`http://localhost:8090/api/usuario/correo/${correoLogin}`);
        if (!respuesta.ok) {
          alert("Usuario no encontrado");
          return;
        }

        // Verifica si la respuesta tiene contenido antes del JSON
        const texto = await respuesta.text();
        if (!texto) {
          alert("Usuario no encontrado");
          return;
        }

        // Parsear el JSON manualmente
        const usuario = JSON.parse(texto);
        console.log(usuario);

        // Validar clave
        if (usuario.password === passwordLogin) {
          // Guardar datos básicos en localStorage
          localStorage.setItem("idUsuario", usuario.id);
          localStorage.setItem("nombre", usuario.nombre);
          localStorage.setItem("correo", usuario.correo);
          localStorage.setItem("fechaNacimiento", usuario.fechaNacimiento);

          // Redirigir a la pantalla principal de la app
          window.location.href = "principal.html";
        } else {
          alert("Contraseña incorrecta");
        }
      } catch (error) {
        console.error("Error en login:", error);
        alert("Error conectando al servidor");
      }
    }
  }

  // =========================================================
  // SECCIÓN: PÁGINA PRINCIPAL (swipe, matches, perfil, fotos, etc.)
  // =========================================================
  if (document.body.classList.contains("principal")) {
    // ===================
    // Variables globales
    // ===================
    const idUsuario = localStorage.getItem("idUsuario");  // id del usuario logueado
    const fotos = Array(9).fill(null);  // Array de 9 slots para fotos de perfil
    let usuarios = [];  // Lista de usuarios para las tarjetas
    let indexUsuarioActual = 0;  // Índice actual de usuario

    // Referencias a paneles y botones de navegación
    const panelHogar = document.querySelector(".hogar");
    const panelMatches = document.querySelector(".matches");
    const panelPerfil = document.querySelector(".perfil");
    const editarPerfil = document.querySelector(".contenedorEditarPerfil");
    const footerPrincipal = document.querySelector(".footerPrincipal");
    const headerPrincipal = document.querySelector(".headerPrincipal");

    const botonHogar = document.getElementById("boton-hogar");
    const botonMatches = document.getElementById("boton-matches");
    const botonPerfil = document.getElementById("boton-perfil");

    const imgHogar = botonHogar.querySelector("img");
    const imgMatches = botonMatches.querySelector("img");
    const imgPerfil = botonPerfil.querySelector("img");

    const btnVolverPerfil = document.getElementById("btn-volver-perfil");
    const contenedoresFotos = document.querySelectorAll(".contenedorSubirFoto");
    const contenedorSwipe = document.querySelector(".contenedorSwipe");
    const botonCerrarSesion = document.getElementById("boton-cerrar-sesion");

    // ===================
    // FUNCIONES
    // ===================

    /**
     * Muestra en el panel de perfil algo como: "Alex, 20."
     * usando datos guardados en localStorage.
     */
    function mostrarNombreEdad() {
      const nombre = localStorage.getItem("nombre");
      const fechaNacimiento = localStorage.getItem("fechaNacimiento");
      if (!nombre || !fechaNacimiento) return;
      const edad = calcularEdad(fechaNacimiento);
      document.getElementById("nombre-edad-perfil").textContent = `${nombre}, ${edad}.`;
    }

<<<<<<< HEAD
    // =========================================================
    //  SECCIÓN: PÁGINA LOGIN
    // =========================================================
    if (document.body.classList.contains("login")) {
        // Botón de "Iniciar sesión" en la pantalla de login
        let botonEntrarPrincipal = document.getElementById("boton-entrar-principal");
        // Delegación de eventos para manejar el click
        document.addEventListener("click", e => {
            if (e.target === botonEntrarPrincipal) {
                e.preventDefault();
                validarLogin();// Llamar a la función de validación de login
            }
        });

        /**
         * Valida las credenciales de login contra la API:
         *  - busca el usuario por correo
         *  - verifica la contraseña
         *  - si es correcto, guarda datos en localStorage y navega a principal.html
         */
        async function validarLogin() {
            const correoLogin = document.getElementById("correo-login").value;
            const passwordLogin = document.getElementById("password-login").value;

            try {
                // Petición al backend para obtener usuario por correo
                const respuesta = await fetch(`http://localhost:8090/api/usuario/correo/${encodeURIComponent(correoLogin)}`);

                if (!respuesta.ok) {
                    alert("Usuario no encontrado");
                    return;
                }

                // Verifica si la respuesta tiene contenido antes del JSON
                const texto = await respuesta.text();

                if (!texto) {
                    alert("Usuario no encontrado");
                    return;
                }

                // Parsear el JSON manualmente
                const usuario = JSON.parse(texto);
                console.log(usuario);

                // Validar clave
                if (usuario.password === passwordLogin) {
                    // Guardar datos básicos en localStorage
                    localStorage.setItem("idUsuario", usuario.id);
                    localStorage.setItem("nombre", usuario.nombre);
                    localStorage.setItem("correo", usuario.correo);
                    localStorage.setItem("fechaNacimiento", usuario.fechaNacimiento);
                    // Redirigir a la pantalla principal de la app
                    window.location.href = "principal.html";
                } else {
                    alert("Contraseña incorrecta");
                }

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error conectando al servidor");
            }
        }


=======
    /**
     * Muestra solo el panel indicado y oculta el resto.
     */
    function mostrarPanel(panel) {
      [panelHogar, panelMatches, panelPerfil, editarPerfil].forEach(p => p.classList.add("oculto"));
      panel.classList.remove("oculto");
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e
    }

    /**
     * Cambia los iconos del footer según el panel seleccionado.
     * Usa imágenes a color para el activo y grises para los demás.
     */
    function cambiarIconos(seleccion) {
      const estados = {
        hogar: ["imgs/iconotindercolor.png", "imgs/iconomatches.png", "imgs/iconoperfil.png"],
        matches: ["imgs/iconotinder.png", "imgs/iconomatchescolor.png", "imgs/iconoperfil.png"],
        perfil: ["imgs/iconotinder.png", "imgs/iconomatches.png", "imgs/iconoperfilcolor.png"]
      };
      [imgHogar, imgMatches, imgPerfil].forEach((img, i) => img.src = estados[seleccion][i]);
    }

    // =====================================================
    // MANEJO DE FOTOS DE PERFIL
    // =====================================================

    /**
     * Carga desde el backend las fotos del usuario actual
     * y las ubica en el grid de 9 posiciones.
     */
    async function cargarFotosUsuario(idUsuario) {
      try {
        const res = await fetch(`http://localhost:8090/api/foto/usuario/${idUsuario}`);
        const fotosBD = await res.json();
        fotos.fill(null);  // Reinicia el array local
        fotosBD.forEach(f => {
          const cont = contenedoresFotos[f.orden];  // Usa el campo "orden" para saber en qué slot va
          if (!cont) return;

          const preview = cont.querySelector(".preview");
          const icono = cont.querySelector(".icono-subir");
          const eliminar = cont.querySelector(".eliminar-foto");

<<<<<<< HEAD
        /**
         * Muestra en el panel de perfil algo como: "Alex, 20."
         * usando datos guardados en localStorage.
         */
        function mostrarNombreEdad() {
            const nombre = localStorage.getItem("nombre");
            const fechaNacimiento = localStorage.getItem("fechaNacimiento");
            if (!nombre || !fechaNacimiento) return;
            const edad = calcularEdad(fechaNacimiento);
            document.getElementById("nombre-edad-perfil").textContent = `${nombre}, ${edad}.`;
=======
          // URL de la imagen servida por el backend
          preview.src = "http://localhost:8090/api/foto/archivo/" + encodeURIComponent(f.url);
          preview.style.display = "block";
          icono.style.display = "none";
          eliminar.style.display = "block";
          cont.dataset.idFoto = f.id;  // Guarda el id de la foto en data-idFoto

          fotos[f.orden] = "EXISTE_EN_BD";  // Marca que en esa posición hay foto en BD
        });
      } catch (e) {
        console.error("Error cargando fotos:", e);
      }
    }

    /**
     * Dibuja el grid de fotos según el array "fotos":
     * - Si hay File: muestra preview local
     * - Si hay "EXISTE_EN_BD": deja la imagen actual del backend
     * - Si hay null: muestra ícono de subir y borde punteado
     */
    function renderGrid() {
      contenedoresFotos.forEach((c, index) => {
        const preview = c.querySelector(".preview");
        const icono = c.querySelector(".icono-subir");
        const eliminar = c.querySelector(".eliminar-foto");
        const foto = fotos[index];

        if (foto instanceof File) {
          preview.src = URL.createObjectURL(foto);
          preview.style.display = "block";
          icono.style.display = "none";
          eliminar.style.display = "block";
          c.style.border = "none";
        } else if (foto === "EXISTE_EN_BD") {
          // La foto existe en base de datos, ya se cargó antes
          preview.style.display = "block";
          icono.style.display = "none";
          eliminar.style.display = "block";
          c.style.border = "none";
        } else {
          // Slot vacío
          preview.src = "";
          preview.style.display = "none";
          icono.style.display = "block";
          eliminar.style.display = "none";
          c.style.border = "2px dashed gray";
        }
      });
    }

    /**
     * Carga la foto principal del botón circular de perfil
     * (usa la primera que encuentre para el usuario).
     */
    async function cargarFotoPerfil() {
      const idUsuario = localStorage.getItem("idUsuario");
      const imgBtnPerfil = document.querySelector("#btn-foto-perfil img");

      try {
        const res = await fetch(`http://localhost:8090/api/foto/usuario/${idUsuario}`);
        const fotos = await res.json();
        if (fotos.length > 0) {
          const urlFoto = fotos[0].url;
          imgBtnPerfil.src = `http://localhost:8090/api/foto/archivo/${encodeURIComponent(urlFoto)}`;
        } else {
          imgBtnPerfil.src = "";
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e
        }
      } catch (e) {
        console.error("Error cargando foto de perfil:", e);
      }
    }

    /**
     * Envía al backend todas las fotos nuevas seleccionadas (File)
     * usando FormData y un endpoint de tipo multipart/form-data.
     */
    async function enviarFotosAPI(usuarioId) {
      const formData = new FormData();
      fotos.forEach((file, index) => {
        if (file instanceof File) {
          formData.append("fotos", file);
          formData.append("orden", index);
        }
      });

      // Si no hay fotos nuevas, no llama al backend
      if ([...formData].length === 0) return;

      try {
        const response = await fetch(`http://localhost:8090/api/foto/subir/${usuarioId}`, {
          method: "POST",
          body: formData
        });
        const urls = await response.json();
        console.log("Fotos subidas:", urls);
      } catch (err) {
        console.error("Error subiendo fotos:", err);
      }
    }

    // =====================================================
    // TARJETAS DE USUARIOS PARA SWIPE
    // =====================================================

    /**
     * Pide al backend la lista de usuarios distintos al actual
     * y genera tarjetas (div.tarjeta) para cada uno.
     * También calcula la distancia entre usuarios usando la lat/lon.
     */
    async function cargarTarjetasUsuarios(idUsuarioActual) {
      try {
        const res = await fetch(`http://localhost:8090/api/usuarios/otros/${idUsuarioActual}`);
        usuarios = await res.json();

        // Limpia el contenedor de swipe
        contenedorSwipe.innerHTML = "";

        usuarios.forEach((user, index) => {
          // Crear la tarjeta para este usuario
          const card = crearTarjeta(user);

          // Asignar clases según la posición (top, next, back)
          if (index === 0) card.classList.add("card-top");
          else if (index === 1) {
            card.classList.add("card-next");
            card.style.transform = "scale(0.92) translateY(25px)";
          } else card.classList.add("card-back");

<<<<<<< HEAD
        // ---- Tarjetas ----
        async function cargarTarjetasUsuarios(idUsuario) {
            try {
                const res = await fetch(`http://localhost:8090/api/usuarios/otros/${idUsuario}`);
                usuarios = await res.json();

                const latLogueado = parseFloat(localStorage.getItem("latitud"));
                const lonLogueado = parseFloat(localStorage.getItem("longitud"));

                contenedorSwipe.innerHTML = "";

                usuarios.forEach((user, index) => {
                    // Calcular distancia si usuario logueado tiene ubicación
                    let distanciaTexto = "Distancia desconocida";
                    if (latLogueado && lonLogueado && user.latitud && user.longitud) {
                        const dist = calcularDistancia(latLogueado, lonLogueado, user.latitud, user.longitud);
                        distanciaTexto = `${dist.toFixed(1)} km`;
                    }

                    const card = crearTarjeta(user, distanciaTexto);

                    if (index === 0) card.classList.add("card-top");
                    else if (index === 1) {
                        card.classList.add("card-next");
                        card.style.transform = "scale(0.92) translateY(25px)";
                    } else card.classList.add("card-back");

                    contenedorSwipe.appendChild(card);
                });

                for (let i = 0; i < usuarios.length; i++) {
                    await llenarTarjetaUsuario(i);
                }
            } catch (e) {
                console.error(e);
            }
        }


        function actualizarUbicacionUsuario() {
            const idUsuario = localStorage.getItem("idUsuario");
            if (!idUsuario) return Promise.resolve();

            if (!navigator.geolocation) {
                console.error("Geolocalización no soportada");
                return Promise.resolve();
            }

            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(async pos => {
                    const latitud = pos.coords.latitude;
                    const longitud = pos.coords.longitude;

                    localStorage.setItem("latitud", latitud);
                    localStorage.setItem("longitud", longitud);

                    try {
                        const res = await fetch(`http://localhost:8090/api/usuarios/ubicacion/${idUsuario}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ latitud, longitud })
                        });

                        if (!res.ok) console.error("Error al actualizar ubicación");
                        resolve();
                    } catch (err) {
                        console.error("Error enviando ubicación:", err);
                        resolve();
                    }
                }, err => {
                    console.error("Error al obtener ubicación:", err);
                    resolve();
                });
            });
        }




        /**
         * Para una posición dada en el array "usuarios", pide sus fotos
         * al backend y las relaciona con la tarjeta correspondiente.
         */
        async function llenarTarjetaUsuario(pos) {
            if (pos >= usuarios.length) return;
            const user = usuarios[pos];

            let fotosUsuario = [];
            try {
                const res = await fetch(`http://localhost:8090/api/foto/usuario/${user.id}`);
                const arr = await res.json();
                fotosUsuario = arr.map(f => `http://localhost:8090/api/foto/archivo/${encodeURIComponent(f.url)}`);
            } catch (e) {
                console.error("Error cargando fotos de usuario:", e);
            }

            const tarjetas = contenedorSwipe.querySelectorAll(".tarjeta");
            if (pos >= tarjetas.length) return;
            const card = tarjetas[pos];

            // Guardar lista de URLs en data-fotos para manejar el carrusel
            card.dataset.fotos = JSON.stringify(fotosUsuario);
            const img = card.querySelector(".foto-activa");
            if (fotosUsuario.length > 0) img.src = fotosUsuario[0];

            // Actualizar los indicadores de puntos (carrusel)
            actualizarIndicadores(card);
        }



        // =====================================================
        //  EVENTOS DE GRID DE FOTOS: SUBIR Y ELIMINAR
        // =====================================================

        contenedoresFotos.forEach((c, index) => {
            const input = c.querySelector("input[type='file']");
            // Al seleccionar un archivo en un slot
            input.addEventListener("change", async e => {
                const file = e.target.files[0];
                if (!file) return;
                // Busca la primera posición libre en el array fotos
                const posicion = fotos.findIndex(f => f === null);
                if (posicion === -1) {
                    alert("Máximo 9 fotos");
                    input.value = "";
                    return;
                }
                // Se guarda el File en el array y se actualiza la vista
                fotos[posicion] = file;
                renderGrid();
                actualizarFotoPerfil();
                input.value = "";
                // Enviar al backend
                await enviarFotosAPI(idUsuario);
            });
            const eliminar = c.querySelector(".eliminar-foto");
            // Al hacer click en el ícono de eliminar
            eliminar.addEventListener("click", async e => {
                e.stopPropagation();
                const idFoto = c.dataset.idFoto;
                // Si la foto existe en BD, la borra también en el backend
                if (idFoto) await fetch(`http://localhost:8090/api/foto/${idFoto}`, { method: "DELETE" });
                fotos[index] = null;
                c.dataset.idFoto = "";
                renderGrid();
                actualizarFotoPerfil();
                await enviarFotosAPI(idUsuario);
            });
=======
          contenedorSwipe.appendChild(card);
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e
        });

        // Rellenar cada tarjeta con las fotos del usuario correspondiente
        for (let i = 0; i < usuarios.length; i++) {
          await llenarTarjetaUsuario(i);
        }
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Para una posición dada en el array "usuarios", pide sus fotos
     * al backend y las relaciona con la tarjeta correspondiente.
     */
    async function llenarTarjetaUsuario(pos) {
      if (pos >= usuarios.length) return;

      const user = usuarios[pos];
      let fotosUsuario = [];

      try {
        const res = await fetch(`http://localhost:8090/api/foto/usuario/${user.id}`);
        const arr = await res.json();
        fotosUsuario = arr.map(f => `http://localhost:8090/api/foto/archivo/${encodeURIComponent(f.url)}`);
      } catch (e) {
        console.error("Error cargando fotos de usuario:", e);
      }

      const tarjetas = contenedorSwipe.querySelectorAll(".tarjeta");
      if (pos >= tarjetas.length) return;

      const card = tarjetas[pos];

      // Guardar lista de URLs en data-fotos para manejar el carrusel
      card.dataset.fotos = JSON.stringify(fotosUsuario);
      const img = card.querySelector(".foto-activa");
      if (fotosUsuario.length > 0) img.src = fotosUsuario[0];

      // Actualizar los indicadores de puntos (carrusel)
      actualizarIndicadores(card);
    }

    // =====================================================
    // EVENTOS DE GRID DE FOTOS: SUBIR Y ELIMINAR
    // =====================================================

    contenedoresFotos.forEach((c, index) => {
      const input = c.querySelector("input[type='file']");

      // Al seleccionar un archivo en un slot
      input.addEventListener("change", async e => {
        const file = e.target.files[0];
        if (!file) return;

        // Busca la primera posición libre en el array fotos
        const posicion = fotos.findIndex(f => f === null);
        if (posicion === -1) {
          alert("Máximo 9 fotos");
          input.value = "";
          return;
        }

<<<<<<< HEAD
        // =====================================================
        //  EVENTOS GENERALES DE LA PANTALLA PRINCIPAL
        // =====================================================

        document.addEventListener("click", e => {
            // Navegación del footer
            if (e.target.closest("#boton-hogar")) { mostrarPanel(panelHogar); cambiarIconos("hogar"); }
            if (e.target.closest("#boton-matches")) { mostrarPanel(panelMatches); cambiarIconos("matches"); }
            if (e.target.closest("#boton-perfil")) { mostrarPanel(panelPerfil); cambiarIconos("perfil"); }
            // Botón "Editar perfil"
            if (e.target.closest("#btn-editar-perfil")) { mostrarPanel(editarPerfil); footerPrincipal.classList.add("oculto"); headerPrincipal.classList.add("oculto"); }
            if (e.target.closest("#btn-volver-perfil")) { mostrarPanel(panelPerfil); editarPerfil.classList.add("oculto"); footerPrincipal.classList.remove("oculto"); headerPrincipal.classList.remove("oculto"); }
            // Botón "Volver" desde la edición de perfil
            // Botón like / dislike (mueven la tarjeta hacia un lado)
            if (e.target.closest("#btn-like")) moverTarjeta(1);
            if (e.target.closest("#btn-dislike")) moverTarjeta(-1);
            // Click en el área de tarjetas (para cambiar de foto dentro del carrusel)
            if (e.target.closest(".contenedorSwipe")) {
                const card = e.target.closest(".tarjeta");
                if (!card) return;

                const fotos = JSON.parse(card.dataset.fotos || "[]");
                if (fotos.length === 0) return;

                let index = parseInt(card.dataset.indexFoto || 0);
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // posición X relativa a la tarjeta

                if (x < rect.width / 2) {
                    // izquierda
                    index = (index - 1 + fotos.length) % fotos.length;
                } else {
                    // derecha
                    index = (index + 1) % fotos.length;
                }

                card.dataset.indexFoto = index;
                card.querySelector(".foto-activa").src = fotos[index];
                actualizarIndicadores(card);
            }
            // Botón "Cerrar sesión"
            if (e.target === botonCerrarSesion) {
                localStorage.removeItem("idUsuario");
                localStorage.removeItem("nombre");
                localStorage.removeItem("correo");
                localStorage.removeItem("fechaNacimiento");
                window.location.href = "index.html";
            }

        });

        // =====================================================
        //  INICIALIZACIÓN DE LA PANTALLA PRINCIPAL
        // =====================================================

        mostrarNombreEdad();
        cargarFotosUsuario(idUsuario);
        cargarFotoPerfil();
        actualizarFotoPerfil();
        // Primero actualizar la ubicación
        // Primero actualizar la ubicación, luego cargar tarjetas
        actualizarUbicacionUsuario().then(() => {
            cargarTarjetasUsuarios(idUsuario);
        });

=======
        // Se guarda el File en el array y se actualiza la vista
        fotos[posicion] = file;
        renderGrid();
        actualizarFotoPerfil();
        input.value = "";
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

        // Enviar al backend
        await enviarFotosAPI(idUsuario);
      });

      const eliminar = c.querySelector(".eliminar-foto");

      // Al hacer click en el ícono de eliminar
      eliminar.addEventListener("click", async e => {
        e.stopPropagation();
        const idFoto = c.dataset.idFoto;

        // Si la foto existe en BD, la borra también en el backend
        if (idFoto) await fetch(`http://localhost:8090/api/foto/${idFoto}`, { method: "DELETE" });

<<<<<<< HEAD
        /**
         * Crea un elemento div.tarjeta con la información básica del usuario
         * (nombre, ciudad, distancia, fecha de unión).
         */
        function crearTarjeta(user, distanciaTexto) {
            const div = document.createElement("div");
            div.className = "tarjeta";
            div.dataset.indexFoto = 0;
            div.dataset.idUsuario = user.id;
            const fechaUnion = user.fechaRegistro
                ? formatearFechaUnion(user.fechaRegistro)
                : "Fecha no disponible";
=======
        fotos[index] = null;
        c.dataset.idFoto = "";
        renderGrid();
        actualizarFotoPerfil();
        await enviarFotosAPI(idUsuario);
      });
    });
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

    /**
     * Actualiza la imagen redonda de perfil con la primera foto disponible
     * (ya sea una File local o una foto existente en BD).
     */
    async function actualizarFotoPerfil() {
      const btnFoto = document.querySelector("#btn-foto-perfil img");

      // Buscar primera foto válida en el array
      const primera = fotos.find(f => f instanceof File || f === "EXISTE_EN_BD");
      if (!primera) {
        btnFoto.src = "";
        return;
      }

      // Si es un File, se usa URL local
      if (primera instanceof File) {
        btnFoto.src = URL.createObjectURL(primera);
      } else if (primera === "EXISTE_EN_BD") {
        // Si la foto es de BD, se pide al backend la primera foto
        try {
          const res = await fetch(`http://localhost:8090/api/foto/usuario/${idUsuario}`);
          const arr = await res.json();
          if (arr.length > 0) btnFoto.src = `http://localhost:8090/api/foto/archivo/${encodeURIComponent(arr[0].url)}`;
        } catch (e) {
          console.error("Error cargando foto de perfil:", e);
          btnFoto.src = "";
        }
      }
    }

    // =====================================================
    // EVENTOS GENERALES DE LA PANTALLA PRINCIPAL
    // =====================================================

    document.addEventListener("click", e => {
      // Navegación del footer
      if (e.target.closest("#boton-hogar")) {
        mostrarPanel(panelHogar);
        cambiarIconos("hogar");
      }
      if (e.target.closest("#boton-matches")) {
        mostrarPanel(panelMatches);
        cambiarIconos("matches");
      }
      if (e.target.closest("#boton-perfil")) {
        mostrarPanel(panelPerfil);
        cambiarIconos("perfil");
      }

      // Botón "Editar perfil"
      if (e.target.closest("#btn-editar-perfil")) {
        mostrarPanel(editarPerfil);
        footerPrincipal.classList.add("oculto");
        headerPrincipal.classList.add("oculto");
      }

      // Botón "Volver" desde la edición de perfil
      if (e.target.closest("#btn-volver")) {
        mostrarPanel(panelPerfil);
        editarPerfil.classList.add("oculto");
        footerPrincipal.classList.remove("oculto");
        headerPrincipal.classList.remove("oculto");
      }

      // Botón like / dislike (mueven la tarjeta hacia un lado)
      if (e.target.closest("#btn-like")) moverTarjeta(1);
      if (e.target.closest("#btn-dislike")) moverTarjeta(-1);

      // Click en el área de tarjetas (para cambiar de foto dentro del carrusel)
      if (e.target.closest(".contenedorSwipe")) {
        const card = e.target.closest(".tarjeta");
        if (!card) return;

        const fotos = JSON.parse(card.dataset.fotos || "[]");
        if (fotos.length === 0) return;

        let index = parseInt(card.dataset.indexFoto || 0);
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // posición X relativa a la tarjeta

        if (x < rect.width / 2) {
          // izquierda
          index = (index - 1 + fotos.length) % fotos.length;
        } else {
          // derecha
          index = (index + 1) % fotos.length;
        }

        card.dataset.indexFoto = index;
        card.querySelector(".foto-activa").src = fotos[index];
        actualizarIndicadores(card);
      }

      // Botón "Cerrar sesión"
      if (e.target === botonCerrarSesion) {
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("fechaNacimiento");
        window.location.href = "index.html";
      }
    });

    // =====================================================
    // INICIALIZACIÓN DE LA PANTALLA PRINCIPAL
    // =====================================================

    mostrarNombreEdad();
    cargarFotosUsuario(idUsuario);
    cargarFotoPerfil();
    actualizarFotoPerfil();
    cargarTarjetasUsuarios(idUsuario);

    // =====================================================
    // LÓGICA DE ARRASTRE (SWIPE) DE TARJETAS
    // =====================================================

    const UMBRAL = 150;  // Distancia en X a partir de la cual se considera un swipe
    const limiteY = 25;  // Movimiento máximo vertical permitido

    let arrastrando = false;
    let inicioX = 0, inicioY = 0;
    let deltaInicialX = null;
    let movXGlobal = 0;

    // Eventos para ratón y táctil
    contenedorSwipe.addEventListener("mousedown", iniciarArrastre);
    contenedorSwipe.addEventListener("touchstart", iniciarArrastre, { passive: true });

    /**
     * Crea un elemento div.tarjeta con la información básica del usuario
     * (nombre, ciudad, distancia, fecha de unión).
     */
    function crearTarjeta(user) {
      const div = document.createElement("div");
      div.className = "tarjeta";
      div.dataset.indexFoto = 0;
      div.dataset.idUsuario = user.id;

      const fechaUnion = user.fechaRegistro ? formatearFechaUnion(user.fechaRegistro) : "Fecha no disponible";

      div.innerHTML = `
        <div class="carrusel-tarjeta">
          <div class="indicadores-fotos"></div>
          <img class="foto-activa" />
        </div>
        <div id="datos-tarjeta">
<<<<<<< HEAD
            <h2>${user.nombre}, ${calcularEdad(user.fechaNacimiento)}.</h2>
            <p>Vive en ${user.ciudad}.</p>
            <p>${distanciaTexto}</p>
            <p>${fechaUnion}</p>
=======
          <h2>${user.nombre}, ${calcularEdad(user.fechaNacimiento)}</h2>
          <p>Vive en ${user.ciudad}.</p>
          <p>${fechaUnion}</p>
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e
        </div>
      `;

      return div;
    }

    /**
     * Formatea la fecha de registro en un texto legible.
     * Ej: "Se unió el 5 de marzo del 2024."
     */
    function formatearFechaUnion(fecha) {
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const f = new Date(fecha);
      const dia = f.getDate();
      const mes = meses[f.getMonth()];
      const año = f.getFullYear();
      return `Se unió el ${dia} de ${mes} del ${año}.`;
    }

    /**
     * Dibuja los puntos de indicador para el carrusel de fotos
     * y marca cuál es la foto activa.
     */
    function actualizarIndicadores(card) {
      const fotos = JSON.parse(card.dataset.fotos || "[]");
      const index = parseInt(card.dataset.indexFoto || 0);
      const cont = card.querySelector(".indicadores-fotos");

      cont.innerHTML = fotos.map((_, i) => 
        `<span class="punto ${i === index ? "activo" : ""}"></span>`
      ).join("");
    }

    /**
     * Normaliza el evento de ratón/táctil, devolviendo el punto con clientX/Y.
     */
    function obtenerPunto(e) {
      if (e.touches && e.touches.length > 0) return e.touches[0];
      return e;
    }

    /**
     * Comienza el arrastre de la tarjeta superior (card-top).
     * Solo se inicia si el usuario hace click dentro de la tarjeta.
     */
    function iniciarArrastre(e) {
      const cardTop = document.querySelector(".card-top");
      if (!cardTop) return;

      const p = obtenerPunto(e);
      const rect = cardTop.getBoundingClientRect();

      // Verifica que el click haya sido dentro de la tarjeta
      if (!(p.clientX >= rect.left && p.clientX <= rect.right && p.clientY >= rect.top && p.clientY <= rect.bottom)) return;

      arrastrando = true;
      inicioX = p.clientX;
      inicioY = p.clientY;
      deltaInicialX = null;
      movXGlobal = 0;

      cardTop.style.transition = "none";

      // Se escuchan movimientos y fin de arrastre a nivel documento
      document.addEventListener("mousemove", alMover);
      document.addEventListener("touchmove", alMover, { passive: false });
      document.addEventListener("mouseup", finMover);
      document.addEventListener("touchend", finMover);
    }

    /**
     * Maneja el movimiento mientras se arrastra la tarjeta.
     * Aplica una especie de resistencia para que el movimiento sea suave.
     */
    function alMover(e) {
      if (!arrastrando) return;

      const p = obtenerPunto(e);
      const cardTop = document.querySelector(".card-top");
      if (!cardTop) return;

      // En móvil, si el movimiento es más horizontal que vertical, se evita el scroll
      if (e.type.includes("touch")) {
        const dy = Math.abs(p.clientY - inicioY);
        const dx = Math.abs(p.clientX - inicioX);
        if (dx > dy) e.preventDefault();
      }

      let cambioX = p.clientX - inicioX;
      let cambioY = p.clientY - inicioY;

      if (deltaInicialX === null) {
        deltaInicialX = cambioX;
        cambioX -= deltaInicialX;
      } else {
        cambioX -= deltaInicialX;
      }

      // Resistencia exponencial para que cueste más mover mucho
      const resistencia = 1 - Math.exp(-Math.abs(cambioX) / 150);
      const movX = cambioX * resistencia;
      const movY = Math.max(Math.min(cambioY * 0.15, limiteY), -limiteY);

      movXGlobal = movX;

      const rotacion = movX / -20;

      // Transformación principal de la tarjeta
      cardTop.style.transform = `translate(${movX}px, ${movY}px) rotate(${rotacion}deg)`;

      // Tarjeta siguiente se va acercando conforme se arrastra la superior
      const next = document.querySelector(".card-next");
      if (next) {
        const progreso = Math.min(Math.abs(movX) / UMBRAL, 1);
        const scale = 0.92 + 0.08 * progreso;
        const ty = 25 - 25 * progreso;
        next.style.transform = `scale(${scale}) translateY(${ty}px)`;
      }
    }

    /**
     * Se llama cuando el usuario suelta el mouse o el dedo.
     * Decide si la tarjeta vuelve al centro o se va hacia un lado (like/dislike).
     */
    function finMover() {
      if (!arrastrando) return;

      arrastrando = false;

      const cardTop = document.querySelector(".card-top");
      if (!cardTop) return;

      cardTop.style.transition = "transform .45s cubic-bezier(.22,.9,.39,1)";

      let direccion = 0;
      if (movXGlobal > UMBRAL) direccion = 1;
      if (movXGlobal < -UMBRAL) direccion = -1;

      if (direccion !== 0) {
        // La tarjeta se va hacia la derecha (like) o izquierda (dislike)
        cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;

        setTimeout(() => {
          cardTop.remove();
          promoverTarjetas();
        }, 420);
      } else {
        // Vuelve al centro si no pasó el umbral
        cardTop.style.transform = "translate(0px, 0px) rotate(0deg)";

        const next = document.querySelector(".card-next");
        if (next) {
          next.style.transition = "transform .3s ease";
          next.style.transform = "scale(0.92) translateY(25px)";
        }
      }

<<<<<<< HEAD

        /**
         * Formatea la fecha de registro en un texto legible:
         * "Se unió el 5 de marzo del 2024."
         */
        function formatearFechaUnion(fecha) {
            const meses = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];
=======
      // Limpia listeners globales
      document.removeEventListener("mousemove", alMover);
      document.removeEventListener("touchmove", alMover);
      document.removeEventListener("mouseup", finMover);
      document.removeEventListener("touchend", finMover);
    }
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e

    /**
     * Promueve las tarjetas:
     * - card-next pasa a ser card-top
     * - card-back pasa a ser card-next
     */
    function promoverTarjetas() {
      const next = document.querySelector(".card-next");
      const back = document.querySelector(".card-back");

      if (next) {
        next.classList.remove("card-next");
        next.classList.add("card-top");
        next.style.transition = "transform .35s ease";

        // Truco con requestAnimationFrame para asegurar animación
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            next.style.transform = "translate(0px,0px) rotate(0deg)";
          });
        });

        setTimeout(() => {
          next.style.transition = "";
          next.style.transform = "";
        }, 360);
      }

      if (back) {
        back.classList.remove("card-back");
        back.classList.add("card-next");
        back.style.transform = "scale(0.92) translateY(25px)";
      }
    }

    /**
     * Mueve la tarjeta top directamente hacia un lado,
     * se usa cuando el usuario pulsa los botones like/dislike.
     */
    function moverTarjeta(direccion) {
      const cardTop = document.querySelector(".card-top");
      if (!cardTop) return;

      cardTop.style.transition = "transform .45s cubic-bezier(.22,.9,.39,1)";
      cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;

      setTimeout(() => {
        cardTop.remove();
        promoverTarjetas();
      }, 420);

<<<<<<< HEAD
        /**
         * Se llama cuando el usuario suelta el mouse o el dedo.
         * Decide si la tarjeta vuelve al centro o se va hacia un lado (like/dislike).
         */
        function finMover() {
            if (!arrastrando) return;
            arrastrando = false;
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;
            cardTop.style.transition = "transform .45s cubic-bezier(.22,.9,.39,1)";
            let direccion = 0;
            if (movXGlobal > UMBRAL) direccion = 1;
            if (movXGlobal < -UMBRAL) direccion = -1;
            if (direccion !== 0) {
                // La tarjeta se va hacia la derecha (like) o izquierda (dislike)
                cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;
                setTimeout(() => {
                    cardTop.remove();// Se elimina la tarjeta
                    promoverTarjetas();// La siguiente se convierte en card-top
                }, 420);
            } else {
                // Vuelve al centro si no pasó el umbral
                cardTop.style.transform = "translate(0px, 0px) rotate(0deg)";
                const next = document.querySelector(".card-next");
                if (next) { next.style.transition = "transform .3s ease"; next.style.transform = "scale(0.92) translateY(25px)"; }
            }
            // Limpia listeners globales
            document.removeEventListener("mousemove", alMover);
            document.removeEventListener("touchmove", alMover);
            document.removeEventListener("mouseup", finMover);
            document.removeEventListener("touchend", finMover);
        }

        /**
         * Promueve las tarjetas:
         *  - card-next pasa a ser card-top
         *  - card-back pasa a ser card-next
         */
        function promoverTarjetas() {
            const next = document.querySelector(".card-next");
            const back = document.querySelector(".card-back");
            if (next) {
                next.classList.remove("card-next");
                next.classList.add("card-top");
                next.style.transition = "transform .35s ease";
                // Truco con requestAnimationFrame para asegurar animación
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        next.style.transform = "translate(0px,0px) rotate(0deg)";
                        setTimeout(() => { next.style.transition = ""; next.style.transform = ""; }, 360);
                    });
                });
            }
            if (back) {
                back.classList.remove("card-back");
                back.classList.add("card-next");
                back.style.transform = "scale(0.92) translateY(25px)";
            }
        }

        /**
         * Mueve la tarjeta top directamente hacia un lado,
         * se usa cuando el usuario pulsa los botones like/dislike.
         */
        function moverTarjeta(direccion) {
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;
            cardTop.style.transition = "transform .45s cubic-bezier(.22,.9,.39,1)";
            cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;
            setTimeout(() => { cardTop.remove(); promoverTarjetas(); }, 420);
            const next = document.querySelector(".card-next");
            if (next) { next.style.transition = "transform .3s ease"; next.style.transform = "scale(0.92) translateY(25px)"; }
        }
    };
});
=======
      const next = document.querySelector(".card-next");
      if (next) {
        next.style.transition = "transform .3s ease";
        next.style.transform = "scale(0.92) translateY(25px)";
      }
    }
  }
});
>>>>>>> 08e1c1f83aa1f05e37eb09a38702a12ca36a354e
