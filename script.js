document.addEventListener("DOMContentLoaded", e => {

    if (document.body.classList.contains("index")) {


        let botonIniciarSesionIndex = document.getElementById("btn-iniciarsesion-index");
        let botonCrearCuentaIndex = document.getElementById("btn-crearcuenta-index");

        document.addEventListener("click", e => {

            if (e.target === botonCrearCuentaIndex) {
                window.location.href = "registro.html";
            }

            if (e.target === botonIniciarSesionIndex) {
                window.location.href = "login.html";
            }
        });
    };

    if (document.body.classList.contains("registro")) {

        const botonRegistro = document.getElementById("boton-enviar-registro");

        botonRegistro.addEventListener("click", e => {
            e.preventDefault();
            validarRegistro();
        });

        function primeraLetraMayuscula(texto) {
            if (!texto) return "";
            console.log("Texto antes:", texto);
            const resultado = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
            console.log("Texto después:", resultado);
            return resultado;
        }

        async function validarRegistro() {

            // recoger los datos sin espacios
            const nombre = primeraLetraMayuscula(document.getElementById("nombre-registro").value.trim());
            const apellido = primeraLetraMayuscula(document.getElementById("apellido-registro").value.trim());
            const correo = document.getElementById("correo-registro").value.trim();
            const password = document.getElementById("password-registro").value.trim();
            const fechaNacimiento = document.getElementById("edad-registro").value;
            const generoUsuario = document.getElementById("genero-registro").value;

            // validación de campos para evitar que estén vacios
            if (!nombre || !apellido || !correo || !password) {
                alert("Por favor completa todos los campos.");
                return;
            }

            // se recibe el json con todos los datos, incluso los que no necesitemos
            const usuario = {
                nombre,
                apellido,
                correo,
                password,
                fechaNacimiento,
                generoUsuario,
            };

            console.log("Enviando:", usuario);

            try {
                const response = await fetch("http://localhost:8080/api/usuario", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuario)
                });

                if (!response.ok) {
                    alert("Error al crear usuario");
                    return;
                }

                const data = await response.json();
                localStorage.setItem("idUsuario", data.id);
                localStorage.setItem("nombre", data.nombre);
                localStorage.setItem("apellido", data.apellido);
                localStorage.setItem("correo", data.correo);
                localStorage.setItem("password", data.password);
                localStorage.setItem("fechaNacimiento", data.fechaNacimiento);
                localStorage.setItem("generoUsuario", data.generoUsuario);
                window.location.href = "index.html";

            } catch (error) {
                console.error("Error en el registro:", error);
            }
        }
    }


    if (document.body.classList.contains("login")) {
        let botonEntrarPrincipal = document.getElementById("boton-entrar-principal");
        document.addEventListener("click", e => {
            if (e.target === botonEntrarPrincipal) {
                e.preventDefault();
                validarLogin();
            }
        });

        async function validarLogin() {
            const correoLogin = document.getElementById("correo-login").value;
            const passwordLogin = document.getElementById("password-login").value;

            try {
                const respuesta = await fetch(`http://localhost:8080/api/usuario/correo/${correoLogin}`);

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

                const usuario = JSON.parse(texto);
                console.log(usuario);

                // Validar clave
                if (usuario.password === passwordLogin) {
                    localStorage.setItem("idUsuario", usuario.id);
                    localStorage.setItem("nombre", usuario.nombre);
                    localStorage.setItem("correo", usuario.correo);
                    localStorage.setItem("fechaNacimiento", usuario.fechaNacimiento);
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

    if (document.body.classList.contains("principal")) {

        // ===================
        // Variables globales
        // ===================
        const idUsuario = localStorage.getItem("idUsuario");
        const fotos = Array(9).fill(null);
        let usuarios = [];
        let indexUsuarioActual = 0;

        // Paneles y botones
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
        const btnVolver = document.getElementById("btn-volver");
        const contenedoresFotos = document.querySelectorAll(".contenedorSubirFoto");
        const contenedorSwipe = document.querySelector(".contenedorSwipe");

        // ===================
        // FUNCIONES
        // ===================

        // ---- Perfil ----
        function calcularEdad(fechaNacimiento) {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
            return edad;
        }

        function mostrarNombreEdad() {
            const nombre = localStorage.getItem("nombre");
            const fechaNacimiento = localStorage.getItem("fechaNacimiento");
            if (!nombre || !fechaNacimiento) return;
            const edad = calcularEdad(fechaNacimiento);
            document.getElementById("nombre-edad-perfil").textContent = `${nombre}, ${edad}.`;
        }

        // ---- Navegación de paneles ----
        function mostrarPanel(panel) {
            [panelHogar, panelMatches, panelPerfil, editarPerfil].forEach(p => p.classList.add("oculto"));
            panel.classList.remove("oculto");
        }

        function cambiarIconos(seleccion) {
            const estados = {
                hogar: ["imgs/iconotindercolor.png", "imgs/iconomatches.png", "imgs/iconoperfil.png"],
                matches: ["imgs/iconotinder.png", "imgs/iconomatchescolor.png", "imgs/iconoperfil.png"],
                perfil: ["imgs/iconotinder.png", "imgs/iconomatches.png", "imgs/iconoperfilcolor.png"]
            };
            [imgHogar, imgMatches, imgPerfil].forEach((img, i) => img.src = estados[seleccion][i]);
        }

        // ---- Fotos ----
        async function cargarFotosUsuario(idUsuario) {
            try {
                const res = await fetch(`http://localhost:8080/api/foto/usuario/${idUsuario}`);
                const fotosBD = await res.json();
                fotos.fill(null);
                fotosBD.forEach(f => {
                    const cont = contenedoresFotos[f.orden];
                    if (!cont) return;
                    const preview = cont.querySelector(".preview");
                    const icono = cont.querySelector(".icono-subir");
                    const eliminar = cont.querySelector(".eliminar-foto");
                    preview.src = "http://localhost:8080/api/foto/archivo/" + encodeURIComponent(f.url);
                    preview.style.display = "block";
                    icono.style.display = "none";
                    eliminar.style.display = "block";
                    cont.dataset.idFoto = f.id;
                    fotos[f.orden] = "EXISTE_EN_BD";
                });
            } catch (e) {
                console.error("Error cargando fotos:", e);
            }
        }

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
                    preview.style.display = "block";
                    icono.style.display = "none";
                    eliminar.style.display = "block";
                    c.style.border = "none";
                } else {
                    preview.src = "";
                    preview.style.display = "none";
                    icono.style.display = "block";
                    eliminar.style.display = "none";
                    c.style.border = "2px dashed gray";
                }
            });
        }

        async function cargarFotoPerfil() {
            const idUsuario = localStorage.getItem("idUsuario");
            const imgBtnPerfil = document.querySelector("#btn-foto-perfil img");
            try {
                const res = await fetch(`http://localhost:8080/api/foto/usuario/${idUsuario}`);
                const fotos = await res.json();
                if (fotos.length > 0) {
                    const urlFoto = fotos[0].url;
                    imgBtnPerfil.src = `http://localhost:8080/api/foto/archivo/${encodeURIComponent(urlFoto)}`;
                } else {
                    imgBtnPerfil.src = "";
                }
            } catch (e) {
                console.error("Error cargando foto de perfil:", e);
            }
        }

        async function enviarFotosAPI(usuarioId) {
            const formData = new FormData();
            fotos.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append("fotos", file);
                    formData.append("orden", index);
                }
            });
            if ([...formData].length === 0) return;
            try {
                const response = await fetch(`http://localhost:8080/api/foto/subir/${usuarioId}`, { method: "POST", body: formData });
                const urls = await response.json();
                console.log("Fotos subidas:", urls);
            } catch (err) {
                console.error("Error subiendo fotos:", err);
            }
        }

        // ---- Tarjetas ----
        async function cargarTarjetasUsuarios(idUsuarioActual) {
            try {
                const res = await fetch(`http://localhost:8080/api/usuarios/otros/${idUsuarioActual}`);
                usuarios = await res.json();

                // Limpiar contenedor antes de agregar nuevas tarjetas
                contenedorSwipe.innerHTML = "";

                usuarios.forEach((user, index) => {
                    const card = crearTarjeta(user);

                    if (index === 0) card.classList.add("card-top");
                    else if (index === 1) {
                        card.classList.add("card-next");
                        card.style.transform = "scale(0.92) translateY(25px)";
                    } else card.classList.add("card-back");

                    contenedorSwipe.appendChild(card);
                });

                // Cargar las fotos en cada tarjeta
                for (let i = 0; i < usuarios.length; i++) {
                    await llenarTarjetaUsuario(i);
                }
            } catch (e) {
                console.error(e);
            }
        }

        async function llenarTarjetaUsuario(pos) {
            if (pos >= usuarios.length) return;
            const user = usuarios[pos];

            let fotosUsuario = [];
            try {
                const res = await fetch(`http://localhost:8080/api/foto/usuario/${user.id}`);
                const arr = await res.json();
                fotosUsuario = arr.map(f => `http://localhost:8080/api/foto/archivo/${encodeURIComponent(f.url)}`);
            } catch (e) {
                console.error("Error cargando fotos de usuario:", e);
            }

            const tarjetas = contenedorSwipe.querySelectorAll(".tarjeta");
            if (pos >= tarjetas.length) return;
            const card = tarjetas[pos];

            card.dataset.fotos = JSON.stringify(fotosUsuario);
            const img = card.querySelector(".foto-activa");
            if (fotosUsuario.length > 0) img.src = fotosUsuario[0];

            actualizarIndicadores(card);
        }



        // ===================
        // EVENTOS
        // ===================
        contenedoresFotos.forEach((c, index) => {
            const input = c.querySelector("input[type='file']");
            input.addEventListener("change", async e => {
                const file = e.target.files[0];
                if (!file) return;
                const posicion = fotos.findIndex(f => f === null);
                if (posicion === -1) {
                    alert("Máximo 9 fotos");
                    input.value = "";
                    return;
                }
                fotos[posicion] = file;
                renderGrid();
                actualizarFotoPerfil();
                input.value = "";
                await enviarFotosAPI(idUsuario);
            });
            const eliminar = c.querySelector(".eliminar-foto");
            eliminar.addEventListener("click", async e => {
                e.stopPropagation();
                const idFoto = c.dataset.idFoto;
                if (idFoto) await fetch(`http://localhost:8080/api/foto/${idFoto}`, { method: "DELETE" });
                fotos[index] = null;
                c.dataset.idFoto = "";
                renderGrid();
                actualizarFotoPerfil();
                await enviarFotosAPI(idUsuario);
            });
        });

        async function actualizarFotoPerfil() {
            const btnFoto = document.querySelector("#btn-foto-perfil img");
            // Buscar primera foto válida en el array
            const primera = fotos.find(f => f instanceof File || f === "EXISTE_EN_BD");
            if (!primera) {
                btnFoto.src = "";
                return;
            }

            if (primera instanceof File) {
                btnFoto.src = URL.createObjectURL(primera);
            } else if (primera === "EXISTE_EN_BD") {
                try {
                    const res = await fetch(`http://localhost:8080/api/foto/usuario/${idUsuario}`);
                    const arr = await res.json();
                    if (arr.length > 0) btnFoto.src = `http://localhost:8080/api/foto/archivo/${encodeURIComponent(arr[0].url)}`;
                } catch (e) {
                    console.error("Error cargando foto de perfil:", e);
                    btnFoto.src = "";
                }
            }
        }


        document.addEventListener("click", e => {
            if (e.target.closest("#boton-hogar")) { mostrarPanel(panelHogar); cambiarIconos("hogar"); }
            if (e.target.closest("#boton-matches")) { mostrarPanel(panelMatches); cambiarIconos("matches"); }
            if (e.target.closest("#boton-perfil")) { mostrarPanel(panelPerfil); cambiarIconos("perfil"); }
            if (e.target.closest("#btn-editar-perfil")) { mostrarPanel(editarPerfil); footerPrincipal.classList.add("oculto"); headerPrincipal.classList.add("oculto"); }
            if (e.target.closest("#btn-volver")) { mostrarPanel(panelPerfil); editarPerfil.classList.add("oculto"); footerPrincipal.classList.remove("oculto"); headerPrincipal.classList.remove("oculto"); }
            if (e.target.closest("#btn-like")) moverTarjeta(1);
            if (e.target.closest("#btn-dislike")) moverTarjeta(-1);

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

        });

        // ===================
        // INIT
        // ===================
        // INIT
        mostrarNombreEdad();
        cargarFotosUsuario(idUsuario);
        cargarFotoPerfil();
        actualizarFotoPerfil();
        cargarTarjetasUsuarios(idUsuario);


        // ---- Movimiento de tarjetas ----
        const UMBRAL = 150;
        const limiteY = 25;
        let arrastrando = false;
        let inicioX = 0, inicioY = 0;
        let deltaInicialX = null;
        let movXGlobal = 0;

        contenedorSwipe.addEventListener("mousedown", iniciarArrastre);
        contenedorSwipe.addEventListener("touchstart", iniciarArrastre, { passive: true });

        function crearTarjeta(user) {
            const div = document.createElement("div");
            div.className = "tarjeta";
            div.dataset.indexFoto = 0;
            div.dataset.idUsuario = user.id;

            div.innerHTML = `
        <div class="carrusel-tarjeta">
            <div class="indicadores-fotos"></div>
            <img class="foto-activa" src="" alt="Foto usuario" />
        </div>
        <h2>${user.nombre}, ${calcularEdad(user.fechaNacimiento)}.</h2>
    `;
            return div;
        }


        function actualizarIndicadores(card) {
            const fotos = JSON.parse(card.dataset.fotos || "[]");
            const index = parseInt(card.dataset.indexFoto || 0);
            const cont = card.querySelector(".indicadores-fotos");
            cont.innerHTML = fotos.map((_, i) =>
                `<span class="punto ${i === index ? 'activo' : ''}"></span>`
            ).join('');
        }



        function obtenerPunto(e) {
            if (e.touches && e.touches.length > 0) return e.touches[0];
            return e;
        }

        function iniciarArrastre(e) {
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;
            const p = obtenerPunto(e);
            const rect = cardTop.getBoundingClientRect();
            if (!(p.clientX >= rect.left && p.clientX <= rect.right && p.clientY >= rect.top && p.clientY <= rect.bottom)) return;
            arrastrando = true;
            inicioX = p.clientX;
            inicioY = p.clientY;
            deltaInicialX = null;
            movXGlobal = 0;
            cardTop.style.transition = "none";
            document.addEventListener("mousemove", alMover);
            document.addEventListener("touchmove", alMover, { passive: false });
            document.addEventListener("mouseup", finMover);
            document.addEventListener("touchend", finMover);
        }

        function alMover(e) {
            if (!arrastrando) return;
            const p = obtenerPunto(e);
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;
            if (e.type === "touchmove") {
                const dy = Math.abs(p.clientY - inicioY);
                const dx = Math.abs(p.clientX - inicioX);
                if (dx > dy) e.preventDefault();
            }
            let cambioX = p.clientX - inicioX;
            let cambioY = p.clientY - inicioY;
            if (deltaInicialX === null) deltaInicialX = cambioX;
            cambioX -= deltaInicialX;
            const resistencia = 1 - Math.exp(-Math.abs(cambioX) / 150);
            const movX = cambioX * resistencia;
            const movY = Math.max(Math.min(cambioY * 0.15, limiteY), -limiteY);
            movXGlobal = movX;
            const rotacion = movX / -20;
            cardTop.style.transform = `translate(${movX}px, ${movY}px) rotate(${rotacion}deg)`;
            const next = document.querySelector(".card-next");
            if (next) {
                const progreso = Math.min(Math.abs(movX) / UMBRAL, 1);
                const scale = 0.92 + 0.08 * progreso;
                const ty = 25 - 25 * progreso;
                next.style.transform = `scale(${scale}) translateY(${ty}px)`;
            }
        }

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
                cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;
                setTimeout(() => {
                    cardTop.remove();
                    promoverTarjetas();
                }, 420);
            } else {
                cardTop.style.transform = "translate(0px, 0px) rotate(0deg)";
                const next = document.querySelector(".card-next");
                if (next) { next.style.transition = "transform .3s ease"; next.style.transform = "scale(0.92) translateY(25px)"; }
            }
            document.removeEventListener("mousemove", alMover);
            document.removeEventListener("touchmove", alMover);
            document.removeEventListener("mouseup", finMover);
            document.removeEventListener("touchend", finMover);
        }

        function promoverTarjetas() {
            const next = document.querySelector(".card-next");
            const back = document.querySelector(".card-back");
            if (next) {
                next.classList.remove("card-next");
                next.classList.add("card-top");
                next.style.transition = "transform .35s ease";
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

