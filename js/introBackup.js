document.addEventListener("DOMContentLoaded", async () => {

    // Skapa element till introduktionen
    const welcomeContainer = document.createElement("div");
    welcomeContainer.id = "welcome-container";
    document.body.appendChild(welcomeContainer);

    const introH1 = document.createElement("h1");
    introH1.textContent = "Välkommen till Vädret Nu";

    const introH2 = document.createElement("h2");
    introH2.textContent = "Få snabb och enkel väderprognos för svenska städer";

    const introP = document.createElement("p");

    const introPagination1 = document.createElement("i");
    const introPagination2 = document.createElement("i");
    const introPagination3 = document.createElement("i");

    introPagination1.classList.add("fa-solid", "fa-circle");
    introPagination2.classList.add("fa-regular", "fa-circle");
    introPagination3.classList.add("fa-regular", "fa-circle");
    
    welcomeContainer.appendChild(introH1);
    welcomeContainer.appendChild(introH2);
    welcomeContainer.appendChild(introP);
    introP.appendChild(introPagination1);
    introP.appendChild(introPagination2);
    introP.appendChild(introPagination3);

    const welcome = document.getElementById("welcome-container");
    const h1 = welcome.querySelector("h1");
    const h2 = welcome.querySelector("h2");
    const p = welcome.querySelector("p");
    const dots = welcome.querySelectorAll("i");

    const cards = document.getElementById("cards-container");
    const nav = document.getElementById("nav-container");

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Fade in rubriker
    await wait(300);
    h1.classList.add("fade-in");
    h2.classList.add("fade-in");

    // Fade in pagination
    await wait(900);
    p.classList.add("fade-in");

    // Pagination cirklar ett varv
    await wait(600);
    for (let i = 0; i < dots.length; i++) {
        dots.forEach((dot, index) => {
            dot.classList.toggle("fa-solid", index === i);
            dot.classList.toggle("fa-regular", index !== i);
        });
        await wait(700);
    }

    // Fade out welcome
    welcome.classList.add("fade-out");
    await wait(800);

    // Dölj welcome
    welcome.style.display = "none";
    window.dispatchEvent(new Event("introFinished"));

    // Fade-in UI
    // requestAnimationFrame(() => {
    //     cards.classList.add("ui-visible");
    //     nav.classList.add("ui-visible");

    //     // Event till main.js
    //     window.dispatchEvent(new Event("introFinished"));
    // });
});