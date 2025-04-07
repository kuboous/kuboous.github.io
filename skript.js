const btn = document.querySelectorAll('.tlacitko');

btn.forEach(function(tlacitko) {
    tlacitko.addEventListener('click', function(){
        //pro každou dočasnou proměnnou tlacitko se nám zastaví event listener onClick
        alert('Kliknul jste na tlačítko!');
    })
});