# Skaapboerdery

## Beskrywing van my projek:
Highveld Boerdery is 'n volledige, responsiewe en multi-bladsy webtuiste oor skaapboerdery.

Die webblad bevat inligting oor:
- Oorsig van die boerdery en produkte in **index.html**
- Die boerdery (Geskiedenis, missie en waardes) in **oor_ons.html**
- Die trop (3 skaaprasse en boerdery inligting) in **ons_trop.html**
- Die produkte en bestelvorm(wol, lewende lammers en skape, lamvleis en byprodukte) in **products.html**
- Voorraadbestuur (Databasis om die voorraad van produkte) in **voorraadbestuur.html**
- Onlangse verkope en rekords in **verkope_en_rekords.html**
- Kontakbesonderhede / -vorm in **contact.html**

Daar is gebruik gemaak van CSS en JS om die webtuiste profesioneel, aantreklik en gebruikersvriendelik te maak en te maak lyk.  
Die webblad moet 'n multibladsy ontwerp hê met multimedia, tabelle, 2 webvorms en 'n CRUD databasis.  
Die webwerf moet dus 'n profesionele multifunksie webblad wees wat responsief is, databerging implementeer asook verskeie prente en inligting oor die boerdery bevat.  
Die webwerf is tans net 'n simulasie en word geen data gestoor nie. Eers in fase 5 sal data gestoor word en dan sal net voorraad en voorraadinligting in 'n databasis gestoor word.


## Databasis Struktuur
Die databasis bevat volle CRUD funksies   
Die databasis is baseer op 2 tabelle VOORRAAD_ITEMS (products.html tabel) en VERKOPE_REKORDS(verkope_en_rekords.html tabel)   
Elke item in die voorraad databasis bevat die volgende velde:
- **id** – Unieke identifiseerder (timestamp)
- **item_name** – Naam van die item (bv. "Lusern hooi", "Dorper entstof")
- **category** – Kategorie (Voer, Medisyne, Toerusting, ens.)
- **quantity** – Huidige hoeveelheid
- **unit** – Eenheid (bale, bottels, stelle, stuks, ens.)
- **reorder_level** – Herbestelpunt (minimum voorraad voordat waarskuwing wys)
- **last_updated** – Datum en tyd van laaste verandering

**Funksionaliteit wat die databasis het:**
- **Real-time voorraadstatus**: Visuele waarskuwing (rooi) wanneer hoeveelheid onder die herbestelpunt daal
- **Transaksie-log**: Volledige geskiedenis van alle voorraadveranderinge
- **Soekfunksie**: vinnige filtering van voorraaditems
- **CRUD-operasies**:
  - Create: Nuwe item byvoeg
  - Read: Voorraad en transaksies bekyk
  - Update: Hoeveelheid wysig
  - Delete: Item permanent verwyder
- **Data stoor**: Alle data word in `localStorage` gestoor en bly behoue selfs na die bladsy herlaai word

## Tegnologie gebruik:
- **Kode:** HTML5, CSS, JavaScript
- **Styling:** Eksterne Style.css met media queries vir responsiwiteit
- **Interaktiwiteit:** script.js (galerye, animasies, vormvalidasie, DOM-manipulasie)
- **Databasis:** [bv. PHP + MySQL / Node.js + SQLite / Firebase – vul self in]
- **Eksterne bronne:** Google Fonts (Poppins, Playfair Display), Font Awesome ikone

## Belangrike funksionaliteit:
- Multi-bladsy responsiewe ontwerp (werk op mobiel, tablet en desktop)
- Professionele navigasie met dropdown-menus en hamburger-menu vir klein skerms
- Dinamiese galerye (hoof-galery op tuisblad + mini-galerye op Ons Trop)
- Voorraadbestuur met visuele waarskuwings vir lae voorraad
- Produkpryslys en bestelvorm met outomatiese totaal-berekening
- Onlangse verkope-oorsig
- Kontak- / navrae-vorm
- Volledige CRUD-operasies op voorraad-items (via databasis)
