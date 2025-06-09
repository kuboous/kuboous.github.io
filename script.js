// Carousel
const track = document.querySelector('.carousel-track');            // vybere kontejner s položkami carouselu
const items = document.querySelectorAll('.carousel-item');          // vybere všechny položky carouselu
let currentItem = 0;                                               // index právě zobrazené položky

function updateCarousel() {
    track.style.transform = `translateX(-${currentItem * 100}%)`; // posune track, aby se zobrazila správná položka
}

document.getElementById('prev').addEventListener('click', () => {
    currentItem = (currentItem - 1 + items.length) % items.length; // posune index o jednu zpět s ošetřením přetečení
    updateCarousel();                                             // aktualizuje zobrazení carouselu
});

document.getElementById('next').addEventListener('click', () => {
    currentItem = (currentItem + 1) % items.length;               // posune index o jednu vpřed s ošetřením přetečení
    updateCarousel();                                             // aktualizuje zobrazení carouselu
});

updateCarousel();                                                 // inicializuje polohu carouselu při načtení


// Countdown
const timer = document.getElementById("timer");                   // vybere element, kam se vkládá odpočet
let countdownDate = new Date();                                   // vytvoří nový Date objekt s aktuálním časem
countdownDate.setHours(countdownDate.getHours() + 15);           // nastaví cílový čas o 15 hodin dopředu

function updateCountdown() {
    const now = new Date().getTime();                             // získá aktuální čas v ms
    const distance = countdownDate - now;                         // spočítá zbývající čas

    const hours = Math.floor(distance / (1000 * 60 * 60));        // kolik zbývá hodin
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // kolik zbývá minut
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);   // kolik zbývá sekund

    timer.innerHTML = `${hours}h ${minutes}m ${seconds}s`;        // vypíše odpočet do elementu

    if (distance < 0) {
        clearInterval(countdownInterval);                         // zastaví interval, když odpočet skončí
        timer.innerHTML = "Akce skončila";                        // zobrazí zprávu o ukončení akce
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);     // spustí updateCountdown každou sekundu


// FAQ accordion s dynamickým slide
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');                  // vybere tlačítko otázky
  const a = item.querySelector('.faq-answer');                    // vybere kontejner odpovědi

  q.addEventListener('click', () => {
    a.classList.toggle('open');                                   // přepíná třídu .open pro zobrazení/skrytí odpovědi
  });
});


// Form validation
const form = document.getElementById('reservationForm');          // vybere formulář podle ID
form.addEventListener('submit', function(e) {
    const name = form.name.value.trim();                          // získá a ořízne hodnotu pole jména
    const email = form.email.value.trim();                        // získá a ořízne hodnotu pole e-mailu
    const date = form.date.value;                                 // získá hodnotu pole date (pokud existuje)

    if (!name || !email || !date) {                              // kontrola, zda jsou vyplněna povinná pole
        alert("Prosím, vyplňte všechna povinná pole.");          // upozornění pro uživatele
        e.preventDefault();                                       // zamezí odeslání formuláře
        return;                                                   // ukončí zpracování
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;              // regulární výraz pro validaci e-mailu
    if (!emailRegex.test(email)) {                               // pokud e-mail nevyhovuje
        alert("Prosím, zadejte platný e-mail.");                  // upozorní uživatele
        e.preventDefault();                                       // zamezí odeslání formuláře
    }
});


// ---- kalkulačka ceny ----
const priceMap = {                                                // mapa cen jednotlivých pokojů
  president: 5500,
  suite:     4200,
  romantic:  3800,
  business:  4500
};

const totalEl  = document.getElementById('total');                // element pro zobrazení výsledné ceny
const roomEls  = document.querySelectorAll('input[name="room"]'); // všechny radio inputy pro výběr pokoje
const inEl     = document.getElementById('checkin');              // input pro datum příjezdu
const outEl    = document.getElementById('checkout');             // input pro datum odjezdu

function calculateTotal() {
  const room = document.querySelector('input[name="room"]:checked'); // zjistí vybraný pokoj
  const inDate  = inEl.valueAsDate;                                 // převede příjezd na Date objekt
  const outDate = outEl.valueAsDate;                                // převede odjezd na Date objekt

  if (room && inDate && outDate && outDate > inDate) {              // ověří platnost dat a výběru
    const nights = Math.round((outDate - inDate) / (1000*60*60*24)); // spočítá počet nocí
    const price  = priceMap[room.value] || 0;                       // najde cenu za noc
    const total  = nights * price;                                  // celková cena
    totalEl.textContent = `Celková cena: ${total.toLocaleString()} Kč`; // vypíše výslednou cenu
  } else {
    totalEl.textContent = 'Celková cena: 0 Kč';                     // pokud data neplatí, ukáže 0 Kč
  }
}

// přidáme event listenery
roomEls.forEach(el => el.addEventListener('change', calculateTotal)); // přepočítá při změně pokoje
inEl.addEventListener('change', calculateTotal);                      // přepočítá při změně příjezdu
outEl.addEventListener('change', calculateTotal);                     // přepočítá při změně odjezdu
calculateTotal();                                                     // inicializuje výpočet při načtení


// Toggle mobilního menu
const menuToggle = document.querySelector('.menu-toggle');            // vybere tlačítko hamburger
const navMenu = document.querySelector('.nav-menu');                 // vybere navigační menu

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');                                  // přepíná viditelnost mobilního menu
});
