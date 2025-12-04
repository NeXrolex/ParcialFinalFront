document.addEventListener("DOMContentLoaded", e => {

    if (document.body.classList.contains("index")) {

        let botonIniciarSesionIndex = document.getElementById("btnIniciarSesionIndex");
        let botonCrearCuentaIndex = document.getElementById("btnCrearCuentaIndex");

        document.addEventListener("click", e => {

            if (e.target === botonCrearCuentaIndex) {
                window.location.href = "registro.html";
            }

            if (e.target === botonIniciarSesionIndex) {
                window.location.href = "login.html";
            }
        });
    };

    if (document.body.classList.contains("login")) {
        let botonEntrarPrincipal = document.getElementById("botonEntrarPrincipal");
        document.addEventListener("click", e => {
            if (e.target === botonEntrarPrincipal) {
                window.location.href = "principal.html";
                mostrarPanel(panelHogar);
            }
        });
    }

    if (document.body.classList.contains("registro")) {

    }

    if (document.body.classList.contains("principal")) {

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


        function mostrarPanel(panel) {
            panelHogar.classList.add("oculto");
            panelMatches.classList.add("oculto");
            panelPerfil.classList.add("oculto");

            panel.classList.remove("oculto");
        }

        let matches = "{x}";

        document.getElementById("buscar-matches").placeholder = `Buscar ${matches} matches`;

        document.addEventListener("click", e => {

            if (e.target.closest("#boton-hogar")) {
                mostrarPanel(panelHogar);

                imgHo.src = "imgs/iconotindercolor.png";
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
        });


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
                cardTop.style.transform = `translate(${direccion * window.innerWidth * 1.2}px, 0px) rotate(${direccion * -30}deg)`;

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

        function mostrarPanel(panel) {
            panelHogar.classList.add("oculto");
            panelMatches.classList.add("oculto");
            panelPerfil.classList.add("oculto");

            panel.classList.remove("oculto");
        }
    };



});

