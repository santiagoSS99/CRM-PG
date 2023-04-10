// window.onload = function () {
//     const sidebar = document.querySelector(".sidebar-menu");
//     const closeBtn = document.querySelector("#btn");
//     const searchBtn = document.querySelector(".bx-search");

//     closeBtn.addEventListener("click", function () {
//         sidebar.classList.toggle("open");
//         menuBtnChange();
//     })

//     searchBtn.addEventListener("click", function () {
//         sidebar.classList.toggle("open");
//         menuBtnChange();
//     })

//     function menuBtnChange() {
//         if (sidebar.classList.contains("open")) {
//             closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
//         } else {
//             closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");

//         }
//     }
// }

window.onload = function () {
    const sidebar = document.querySelector(".sidebar-menu");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");
    const navList = document.querySelectorAll(".nav-list li");

    closeBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        menuBtnChange();
    });

    searchBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        menuBtnChange();
    });

    function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    // Cerrar la barra lateral cuando se hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !event.target.matches("#btn")) {
            sidebar.classList.remove("open");
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    });
};
