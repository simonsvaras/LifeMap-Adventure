export const loadMap = () =>{
    function redirectTemporarily() {
        // Uložte aktuální URL
        const originalUrl = window.location.href;

        // URL nové stránky, na kterou chcete přesměrovat
        const newUrl = '/Load.html';

        // Přesměrujte na novou stránku
        window.location.href = newUrl;

        // Po 5 sekundách přesměrujte zpět na původní stránku
        setTimeout(() => {
            window.location.href = originalUrl;
        }, 5000); // 5000 ms = 5 sekund
    }

    window.onload = redirectTemporarily;
}