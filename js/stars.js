// Funzione per creare lo sfondo stellato con costellazioni
document.addEventListener('DOMContentLoaded', function() {
    createStarryBackground();
});

function createStarryBackground() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 200;
    const numberOfConstellations = 5;

    // Crea le stelle
    for (let i = 0; i < numberOfStars; i++) {
        createStar(starsContainer);
    }

    // Crea le costellazioni
    for (let i = 0; i < numberOfConstellations; i++) {
        createConstellation(starsContainer);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Posizione casuale
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Dimensione casuale
    const size = Math.random() * 3;

    // Ritardo casuale per l'animazione
    const delay = Math.random() * 4;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);
    return star;
}

function createConstellation(container) {
    // Crea un gruppo di 4-7 stelle per formare una costellazione
    const numberOfStars = 4 + Math.floor(Math.random() * 4);
    const stars = [];

    // Punto di partenza della costellazione
    const startX = 10 + Math.random() * 80; // Mantieni la costellazione all'interno del container
    const startY = 10 + Math.random() * 80;

    // Crea la prima stella
    const firstStar = document.createElement('div');
    firstStar.classList.add('star');
    firstStar.style.left = `${startX}%`;
    firstStar.style.top = `${startY}%`;
    firstStar.style.width = `3px`;
    firstStar.style.height = `3px`;
    container.appendChild(firstStar);
    stars.push({x: startX, y: startY, element: firstStar});

    // Crea le stelle rimanenti
    let prevX = startX;
    let prevY = startY;

    for (let i = 1; i < numberOfStars; i++) {
        // Crea una nuova stella non troppo lontana dalla precedente
        const angle = Math.random() * Math.PI * 2;
        const distance = 2 + Math.random() * 10; // Distanza tra 2% e 12% dello schermo

        const x = prevX + Math.cos(angle) * distance;
        const y = prevY + Math.sin(angle) * distance;

        // Assicurati che la stella sia all'interno del container
        if (x < 0 || x > 100 || y < 0 || y > 100) continue;

        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `3px`;
        star.style.height = `3px`;
        container.appendChild(star);

        // Crea una linea tra questa stella e la precedente
        createLine(container, prevX, prevY, x, y);

        stars.push({x, y, element: star});
        prevX = x;
        prevY = y;
    }

    return stars;
}

function createLine(container, x1, y1, x2, y2) {
    const line = document.createElement('div');
    line.classList.add('constellation-line');

    // Calcola la lunghezza e l'angolo della linea
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    // Posiziona la linea
    line.style.width = `${length}%`;
    line.style.left = `${x1}%`;
    line.style.top = `${y1}%`;
    line.style.transform = `rotate(${angle}deg)`;

    container.appendChild(line);
    return line;
}

// Funzione per animare i pulsanti
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Gestione della barra di navigazione nascondibile
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Se stiamo scorrendo verso il basso e siamo oltre i 100px dall'inizio
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hidden');
        } else {
            // Se stiamo scorrendo verso l'alto o siamo vicini all'inizio
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });
});
