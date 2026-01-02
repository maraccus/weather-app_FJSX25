const runIntro = false;

/**
 * Kör en valfri introduktionssekvens med fade-in animationer och exempel på sök + pagination.
 * Avfyrar en custom event "introFinished" när sekvensen är klar.
 */
export async function initIntro() {
    // Skippa introduktionen om runIntro är false
    if (!runIntro) {
        window.dispatchEvent(new Event("introFinished"));
        return;
    }

    // Skapa element till introduktionen
    const welcomeContainer = document.createElement("div");
    welcomeContainer.id = "welcome-container";
    document.body.appendChild(welcomeContainer);

    const introH1 = document.createElement("h1");
    introH1.textContent = "Välkommen till Vädret Nu";

    const introH2 = document.createElement("h2");
    introH2.textContent = "Få snabb och enkel väderprognos för svenska städer.";

    welcomeContainer.appendChild(introH1);
    welcomeContainer.appendChild(introH2);

    const infobox1 = document.createElement("div");
    infobox1.classList.add("intro-infobox", "weather-snow"); // Applies gradient bg
    welcomeContainer.appendChild(infobox1);

    const introH3 = document.createElement("h3");
    introH3.textContent = "Sök på städer med navigationsfältet.";
    
    const introH3icon = document.createElement("i");
    introH3icon.classList.add("fa-solid", "fa-magnifying-glass");
    introH3icon.id = "intro-magnifying-glass";

    const infobox2 = document.createElement("div");
    infobox2.classList.add("intro-infobox", "weather-rain");
    welcomeContainer.appendChild(infobox2);

    const introH4 = document.createElement("h3");
    introH4.textContent = "Klicka på prickarna för att växla stad.";

    const introP = document.createElement("p");

    const introPagination1 = document.createElement("i");
    const introPagination2 = document.createElement("i");
    const introPagination3 = document.createElement("i");

    introPagination1.classList.add("fa-solid", "fa-circle");
    introPagination1.id = "intro-dot-1";
    introPagination2.classList.add("fa-regular", "fa-circle");
    introPagination2.id = "intro-dot-2";
    introPagination3.classList.add("fa-regular", "fa-circle");
    introPagination3.id = "intro-dot-3";
    
    
    infobox1.appendChild(introH3);
    infobox1.appendChild(introH3icon);
    infobox2.appendChild(introH4);
    infobox2.appendChild(introP);
    introP.appendChild(introPagination1);
    introP.appendChild(introPagination2);
    introP.appendChild(introPagination3);

    const welcome = document.getElementById("welcome-container");
    const h1 = welcome.querySelector("h1");
    const h2 = welcome.querySelector("h2");
    const p = welcome.querySelector("p");
    const dots = [
        document.getElementById("intro-dot-1"),
        document.getElementById("intro-dot-2"),
        document.getElementById("intro-dot-3")
    ];

    const cards = document.getElementById("cards-container");
    const nav = document.getElementById("nav-container");

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Fade in rubriker
    await wait(300);
    h1.classList.add("fade-in");
    h2.classList.add("fade-in");

    await wait(1800);
    infobox1.classList.add("fade-in");
    introH3.classList.add("fade-in");
    introH3icon.classList.add("fade-in");

    // Fade in pagination
    await wait(1800);
    infobox2.classList.add("fade-in");
    introH4.classList.add("fade-in");
    p.classList.add("fade-in");

    // Pagination cirklar ett varv
    await wait(800);
    for (let i = 0; i < dots.length; i++) {
        dots.forEach((dot, index) => {
            dot.classList.toggle("fa-solid", index === i);
            dot.classList.toggle("fa-regular", index !== i);
        });
        await wait(900);
    }

    // Fade out welcome
    welcome.classList.add("fade-out");
    await wait(800);

    // Dölj welcome
    welcome.style.display = "none";
    window.dispatchEvent(new Event("introFinished"));
}