<?php
// Základní zobrazení a sanitizace vstupních dat
if ($_SERVER['REQUEST_METHOD'] === 'POST') {                                         // Kontrola, že formulář byl odeslán metodou POST
    $name     = htmlspecialchars(trim($_POST['name']));                              // Odstraní přebytečné mezery a escapuje HTML znaky v poli 'name'
    $email    = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);            // Odstraní přebytečné mezery a sanitizuje e-mailovou adresu
    $room     = htmlspecialchars(trim($_POST['room']));                              // Odstraní mezery a escapuje HTML znaky v poli 'room'
    $checkin  = htmlspecialchars(trim($_POST['checkin']));                           // Odstraní mezery a escapuje HTML znaky v poli 'checkin'
    $checkout = htmlspecialchars(trim($_POST['checkout']));                          // Odstraní mezery a escapuje HTML znaky v poli 'checkout'
    $message  = htmlspecialchars(trim($_POST['message']));                           // Odstraní mezery a escapuje HTML znaky v poli 'message'

    // Jednoduchá validace e-mailu
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {                                 // Ověří, že e-mail odpovídá správnému formátu
        echo '<p>Neplatný formát e-mailu.</p>';                                      // Vypíše chybovou hlášku
        exit;                                                                         // Ukončí skript, aby se další kód nespustil
    }
    // Ověření, že povinná pole nejsou prázdná
    if (empty($name) || empty($room) || empty($checkin) || empty($checkout)) {         // Kontrola neprázdnosti polí name, room, checkin, checkout
        echo '<p>Vyplňte prosím všechna povinná pole.</p>';                           // Vypíše chybovou hlášku
        exit;                                                                         // Ukončí skript
    }

    // Výpis potvrzení rezervace
    echo "<h1>Děkujeme za rezervaci, $name!</h1>";                                     // Zobrazí nadpis s poděkováním a jménem
    echo "<p><strong>Vybraný pokoj:</strong> $room</p>";                               // Vypíše zvolený pokoj
    echo "<p><strong>Datum příjezdu:</strong> $checkin</p>";                           // Vypíše datum příjezdu
    echo "<p><strong>Datum odjezdu:</strong> $checkout</p>";                           // Vypíše datum odjezdu
    echo "<p><strong>E-mail:</strong> $email</p>";                                     // Vypíše e-mailovou adresu
    if ($message !== '') {                                                            // Kontrola, zda bylo vyplněno pole s poznámkou
        echo "<p><strong>Poznámka:</strong> $message</p>";                            // Vypíše poznámku, pokud není prázdná
    }
} else {
    echo '<p>Formulář nebyl odeslán správně.</p>';                                    // Vypíše chybovou zprávu pro jiné metody než POST
}
?>


