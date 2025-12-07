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


        mostrarNombreEdad();

        let botonHogar = document.getElementById("boton-hogar");
        let botonMatches = document.getElementById("boton-matches");
        let botonPerfil = document.getElementById("boton-perfil");

        let panelHogar = document.querySelector(".hogar");
        let panelMatches = document.querySelector(".matches");
        let panelPerfil = document.querySelector(".perfil");

        let imgHogar = botonHogar.querySelector("img");
        let imgMatches = botonMatches.querySelector("img");
        let imgPerfil = botonPerfil.querySelector("img");

        let cardTop = document.querySelector(".card-top");
        let cardNext = document.querySelector(".card-next");

        let footerPrincipal = document.querySelector(".footerPrincipal");
        let headerPrincipal = document.querySelector(".headerPrincipal");
        let editarPerfil = document.querySelector(".contenedorEditarPerfil");
        let btnVolver = document.getElementById("btn-volver");

        let buscadorPlaceholder = document.getElementById("buscar-matches")

        let matches = "x";
        buscadorPlaceholder.placeholder = `Buscar ${matches} matches`;

        function calcularEdad(fechaNacimiento) {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        }

        function mostrarNombreEdad() {
            const nombre = localStorage.getItem("nombre");
            const fechaNacimiento = localStorage.getItem("fechaNacimiento");

            if (!nombre || !fechaNacimiento) return;

            const edad = calcularEdad(fechaNacimiento);

            const parrafo = document.getElementById("nombre-edad-perfil");
            parrafo.textContent = `${nombre}, ${edad}.`;
        }

        function mostrarPanel(panel) {
            panelHogar.classList.add("oculto");
            panelMatches.classList.add("oculto");
            panelPerfil.classList.add("oculto");

            panel.classList.remove("oculto");
        }


        function renderGrid() {
            const contenedores = document.querySelectorAll(".contenedorSubirFoto");

            contenedores.forEach((c, index) => {
                const preview = c.querySelector(".preview");
                const icono = c.querySelector(".icono-subir");
                const eliminar = c.querySelector(".eliminar-foto");
                const input = c.querySelector("input[type='file']");

                const foto = fotos[index];

                // Si es una foto nueva subida desde input
                if (foto instanceof File) {
                    preview.src = URL.createObjectURL(foto);
                    preview.style.display = "block";
                    icono.style.display = "none";
                    eliminar.style.display = "block";
                    c.style.border = "none";
                }
                // Si es una foto que existe en BD
                else if (foto === "EXISTE_EN_BD") {
                    // No tocamos el src porque ya lo puso cargarFotosUsuario()
                    preview.style.display = "block";
                    icono.style.display = "none";
                    eliminar.style.display = "block";
                    c.style.border = "none";
                }
                // Si no hay nada
                else {
                    preview.src = "";
                    preview.style.display = "none";
                    icono.style.display = "block";
                    eliminar.style.display = "none";
                    c.style.border = "2px dashed gray";
                }

                // Eliminar foto
                eliminar.onclick = async (e) => {
                    e.stopPropagation();

                    const idFoto = c.dataset.idFoto;

                    // Si existe en BD → eliminar
                    if (idFoto) {
                        await fetch(`http://localhost:8080/api/foto/${idFoto}`, {
                            method: "DELETE"
                        });
                        c.dataset.idFoto = "";
                    }

                    fotos[index] = null;
                    renderGrid();

                    await enviarFotosAPI(localStorage.getItem("idUsuario"));
                };
            });
        }


        const fotos = Array(9).fill(null);
        const contenedores = document.querySelectorAll(".contenedorSubirFoto");

        contenedores.forEach((contenedor, index) => {

            const input = contenedor.querySelector("input[type='file']");

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
                input.value = "";

                await enviarFotosAPI(localStorage.getItem("idUsuario"));
            });

        });


        async function enviarFotosAPI(usuarioId) {

            const formData = new FormData();

            fotos.forEach((file, index) => {
                if (file !== null) {
                    formData.append("fotos", file);
                    formData.append("orden", index); // <-- IMPORTANTE
                }
            });

            const response = await fetch(`http://localhost:8080/api/foto/subir/${usuarioId}`, {
                method: "POST",
                body: formData
            });

            const urls = await response.json();
            console.log("URLs devueltas y ordenadas:", urls);
        }



        async function cargarFotosUsuario(idUsuario) {
            try {
                const res = await fetch(`http://localhost:8080/api/foto/usuario/${idUsuario}`);
                const fotosBD = await res.json();

                console.log("Fotos que vienen de BD:", fotosBD);

                // Reiniciar arreglo local de fotos
                fotos.fill(null);

                const contenedores = document.querySelectorAll(".contenedorSubirFoto");

                fotosBD.forEach(f => {
                    const orden = f.orden;
                    const cont = contenedores[orden];

                    if (!cont) return;

                    const preview = cont.querySelector(".preview");
                    const icono = cont.querySelector(".icono-subir");
                    const eliminar = cont.querySelector(".eliminar-foto");

                    // Usar encodeURIComponent para evitar problemas con espacios en la URL
                    preview.src = "http://localhost:8080/api/foto/archivo/" + encodeURIComponent(f.url);
                    preview.style.display = "block";

                    // Ocultar icono de subir y mostrar botón de eliminar
                    icono.style.display = "none";
                    eliminar.style.display = "block";

                    // Guardar idFoto en el dataset del contenedor para poder eliminar
                    cont.dataset.idFoto = f.id;

                    // Marcar la posición como ocupada en el arreglo local
                    fotos[orden] = "EXISTE_EN_BD";
                });

            } catch (e) {
                console.error("Error cargando fotos:", e);
            }
        }

        const idUsuario = localStorage.getItem("idUsuario");
        cargarFotosUsuario(idUsuario);

        document.addEventListener("click", async e => {
            if (e.target.classList.contains("btn-eliminar-foto")) {
                const img = e.target.parentElement.querySelector("img");
                const idFoto = img.dataset.id;

                if (idFoto) {
                    await fetch(`http://localhost:8080/api/foto/${idFoto}`, {
                        method: "DELETE"
                    });
                }

                e.target.parentElement.remove();
            }
        });


        document.addEventListener("click", e => {

            if (e.target.closest("#boton-hogar")) {
                mostrarPanel(panelHogar);

                imgHogar.src = "imgs/iconotindercolor.png";
                imgMatches.src = "imgs/iconomatches.png";
                imgPerfil.src = "imgs/iconoperfil.png";
            }

            if (e.target.closest("#boton-matches")) {
                mostrarPanel(panelMatches);

                imgHogar.src = "imgs/iconotinder.png";
                imgMatches.src = "imgs/iconomatchescolor.png";
                imgPerfil.src = "imgs/iconoperfil.png";
            }

            if (e.target.closest("#boton-perfil")) {
                mostrarPanel(panelPerfil);

                imgHogar.src = "imgs/iconotinder.png";
                imgMatches.src = "imgs/iconomatches.png";
                imgPerfil.src = "imgs/iconoperfilcolor.png";
            }

            if (e.target.closest("#btn-like")) {
                moverTarjeta(1);
            }
            if (e.target.closest("#btn-dislike")) {
                moverTarjeta(-1);
            }

            if (e.target.closest("#btn-editar-perfil")) {
                mostrarPanel(editarPerfil);
                footerPrincipal.classList.add("oculto");
                headerPrincipal.classList.add("oculto")
            }

            if (e.target.closest("#btn-volver")) {
                mostrarPanel(panelPerfil);
                editarPerfil.classList.add("oculto");
                footerPrincipal.classList.remove("oculto");
                headerPrincipal.classList.remove("oculto")
            }
        });


        function moverTarjeta(direccion) {
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;

            cardTop.style.transition = "transform .45s cubic-bezier(.22,.9,.39,1)";
            cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * - 30}deg)`;

            setTimeout(() => {
                cardTop.remove();
                promoverTarjetas();
                agregarNuevaTarjeta();
            }, 420);

            // animar siguiente tarjeta
            const next = document.querySelector(".card-next");
            if (next) {
                next.style.transition = "transform .3s ease";
                next.style.transform = "scale(0.92) translateY(25px)";
            }
        }


        // ========= CONFIG ==========
        const UMBRAL = 150;
        const limiteY = 25;
        const contenedorSwipe = document.querySelector(".contenedorSwipe");

        // cargar tarjetas iniciales
        cargarTarjetas(3);

        // estado swipe
        let arrastrando = false;
        let inicioX = 0, inicioY = 0;
        let deltaInicialX = null;
        let movXGlobal = 0;

        // listener en contenedor pero validamos card-top al iniciar
        contenedorSwipe.addEventListener("mousedown", iniciarArrastre);
        contenedorSwipe.addEventListener("touchstart", iniciarArrastre, { passive: true });

        function crearTarjeta() {
            const div = document.createElement("div");
            div.className = "tarjeta card-back";
            return div;
        }


        function cargarTarjetas(n) {
            for (let i = 0; i < n; i++) {
                const card = crearTarjeta();

                if (i === 0) {
                    card.classList.add("card-top");
                } else if (i === 1) {
                    card.classList.add("card-next");
                    card.style.transform = "scale(0.92) translateY(25px)";
                } else {
                    card.classList.add("card-back");
                }

                contenedorSwipe.appendChild(card);
            }
        }

        function obtenerPunto(e) {
            if (e.touches && e.touches.length > 0) return e.touches[0];
            return e;
        }

        function iniciarArrastre(e) {
            const cardTop = document.querySelector(".card-top");
            if (!cardTop) return;

            // evitar iniciar si el touch/mousedown viene de la tarjeta de atrás
            // (por seguridad: comprobamos que el punto inicial esté dentro del cardTop)
            const p = obtenerPunto(e);
            const rect = cardTop.getBoundingClientRect();
            if (!(p.clientX >= rect.left && p.clientX <= rect.right && p.clientY >= rect.top && p.clientY <= rect.bottom)) {
                return;
            }

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

            // bloqueo scroll si hay predominio horizontal (touch)
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

            // opcional: animar ligeramente la siguiente tarjeta para dar feedback
            const next = document.querySelector(".card-next");
            if (next) {
                // cuanto más mueves, más sube/escala la siguiente (pequeña reacción)
                const progreso = Math.min(Math.abs(movX) / UMBRAL, 1);
                const scale = 0.92 + 0.08 * progreso; // de 0.92 → 1
                const ty = 25 - 25 * progreso; // de 25px → 0px
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
                // animar fuera
                cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * - 30}deg)`;

                setTimeout(() => {
                    // eliminar top actual
                    cardTop.remove();
                    promoverTarjetas();      // la siguiente sube
                    agregarNuevaTarjeta();   // mantenemos el stack
                }, 420);
            } else {
                // volver al centro
                cardTop.style.transform = `translate(0px, 0px) rotate(0deg)`;

                // devolver transform a next si lo modificamos
                const next = document.querySelector(".card-next");

                if (next) {
                    next.style.transition = "transform .3s ease";
                    next.style.transform = "scale(0.92) translateY(25px)";
                }


            }

            document.removeEventListener("mousemove", alMover);
            document.removeEventListener("touchmove", alMover);
            document.removeEventListener("mouseup", finMover);
            document.removeEventListener("touchend", finMover);
        }

        function promoverTarjetas() {
            const next = document.querySelector(".card-next");
            const back = document.querySelector(".card-back");

            // 1. Subir next → top
            if (next) {
                next.classList.remove("card-next");
                next.classList.add("card-top");
                next.style.transition = "transform .35s ease";

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        next.style.transform = "translate(0px,0px) rotate(0deg)";
                        setTimeout(() => {
                            next.style.transition = "";
                            next.style.transform = "";
                        }, 360);
                    });
                });
            }

            // 2. Subir back → next
            if (back) {
                back.classList.remove("card-back");
                back.classList.add("card-next");

                // reset transform para estar debajo del top
                back.style.transform = "scale(0.92) translateY(25px)";
            }
        }


        function agregarNuevaTarjeta() {
            const card = crearTarjeta(); // ya nace como card-back
            card.classList.add("hidden-card");

            contenedorSwipe.appendChild(card);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.classList.remove("hidden-card");
                }, 50);
            });
        }
    };
});

