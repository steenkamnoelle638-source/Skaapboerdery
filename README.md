# Highveld Boerdery – Skaapboerdery Webtuiste

**'n Volledige, responsiewe en multifunksionele webtuiste vir 'n moderne skaapboerdery.**

---

## Beskrywing van my projek:
Highveld Boerdery is 'n volledige, responsiewe en multi-bladsy webtuiste oor skaapboerdery.

Die webblad bevat inligting oor:
- Oorsig van die boerdery en produkte in **index.html**
- Die boerdery (Geskiedenis, missie en waardes) in **oor_ons.html**
- Die trop (3 skaaprasse en boerdery inligting) in **ons_trop.html**
- Die produkte en bestelvorm(wol, lewende lammers en skape, lamvleis en byprodukte) in **products.html**
- Voorraadbestuur (Databasis om die voorraad van produkte) in **voorraadbestuur.html**
- Onlangse verkope en rekords in **verkope_en_rekord.html**
- Kontakbesonderhede / -vorm in **contact.html**

Daar is gebruik gemaak van CSS en JS om die webtuiste profesioneel, aantreklik en gebruikersvriendelik te maak en te maak lyk.  
Die webblad moet 'n multibladsy ontwerp hê met multimedia, tabelle, 2 webvorms en 'n CRUD databasis.  
Die webwerf moet dus 'n profesionele multifunksie webblad wees wat responsief is, databerging implementeer asook verskeie prente en inligting oor die boerdery bevat.  
Die lêer `database.sql` dokumenteer die beplande SQL-struktuur vir 'n toekomstige regte databasis.
Die webwerf is 'n simulasie en word slegs die volgende in die webblaaier *(`localStorage`)* gestoor:    
- Voorraad vir voorraadbeheer
- Transaksies (Transaksie log vir CRUD operasies) nie geld transaksies en inligting nie.
- Gebruikers besonderhede vir inteken
- Kliente se laaste 4 bestellings

### Bladsy-oorsig
- **`index.html`** – Tuisblad en oorsig van die boerdery en produkte.
- **`oor_ons.html`** – Geskiedenis, missie en waardes.
- **`ons_trop.html`** – Inligting oor die trop en skaaprasse.
- **`products.html`** – Produkte en bestelvorm.
- **`voorraadbestuur.html`** – Voorraadbestuur en CRUD-aksies.
- **`verkope_en_rekord.html`** – Onlangse verkope en rekords.
- **`contact.html`** – Kontakbesonderhede en navrae-vorm.

## Belangrikste Funksionaliteit

- **Multi-bladsy responsiewe ontwerp** (werk uitstekend op selfoon, tablet en rekenaar)
- **Professionele navigasie** met dropdown-menus en mobiele hamburger-menu
- **Dinamiese galerye** en produk-carousel
- **Produkte & Bestelvorm** met intydse totaal-berekening en betaalopsies asook veld validasies
- **Voorraadbestuur** met volle **CRUD**-funksies en lae-voorraad waarskuwings
- **Transaksie-log** vir alle voorraadveranderinge
- **Onlangse verkope** oorsig (dinamies)
- **Kontakvorm** met besoek-besprekingsopsie en veld validasies
- **Multimedia** – Foto-galerye, produk-carousel en bemarkingsvideo met onderskrifte
- **Print-vriendelike** styl vir fakture en verslae

## Databasis-simulasie en Kalenderfunksie
Die finale fase gebruik nie meer 'n verpligte CRUD-databasis as hoofvereiste nie. In plaas daarvan fokus die projek op **funksionaliteit** en 'n **plaaskalender**. Die databasis word dus in die dokumentasie en in **`database.sql`** gesimuleer: die SQL-lêer wys watter tabelle die stelsel sou hê indien dit later na 'n regte databasis oorgedra word.

Die webdemo gebruik die volgende `localStorage`-sleutels:

- **`highveld_inventory`** → sou ooreenstem met **VOORRAAD_ITEMS** vir voorraaditems.
- **`highveld_transactions`** → sou ooreenstem met **VOORRAAD_TRANSAKSIES** vir voorraadveranderinge.
- **`highveld_users`** → sou ooreenstem met **GEBRUIKERS** vir geregistreerde gebruikers.
- **`highveld_user`** → sou ooreenstem met **GEBRUIKER_SESSIES** vir die huidige ingeteken gebruiker.
- **`highveld_cart`** → sou ooreenstem met **MANDJIE_ITEMS** vir items in die inkopie-mandjie.
- **`highveld_orders`** → sou ooreenstem met **BESTELLINGS** en **BESTELLING_ITEMS** vir bestelgeskiedenis.
- **`highveld_sales`** → sou ooreenstem met **VERKOPE_REKORDS** vir verkoopsrekords.
- **`highveld_calendar_events`** → sou ooreenstem met **KALENDER_GEBEURE** vir kalenderdae wat uitgelig word.

### Plaaskalender
Die kalender is op **`voorraadbestuur.html`**. Dit wys 'n maand-uitleg, merk dae met gebeurtenisse in groen, en wys die detail van 'n gebeurtenis wanneer die gebruiker op die dag kliek. Die kalender gebruik 'n JavaScript-skikking van gebeurtenisse en stoor dit in `localStorage` onder **`highveld_calendar_events`**.

### Intekenopsie
Die gebruiker kan met die profiel-ikoon registreer of inteken. Registrasie stoor naam, e-pos en wagwoord in `localStorage` onder **`highveld_users`**. Wanneer die gebruiker inteken, word die aktiewe gebruiker onder **`highveld_user`** gestoor en die profiel-ikoon verander om te wys dat iemand ingeteken is.

### Mandjie en bestellings
Die bestelvorm voeg produkte by die inkopie-mandjie in plaas daarvan om dadelik 'n finale databasisrekord te skep. Die mandjie word onder **`highveld_cart`** gestoor, wys 'n itemtelling in die navigasie en laat die gebruiker items verwyder. Wanneer 'n bestelling geplaas word, word dit in **`highveld_orders`** gestoor en 'n verkoopsrekord word in **`highveld_sales`** gesimuleer.

### Validasie
Die belangrikste vormvelde het HTML- en JavaScript-validasie: name het minimumlengtes en patrone, e-posvelde gebruik `type="email"`, hoeveelhede het minimum/maksimum waardes, aflewering vereis 'n adres, self-afhaal vereis datum/tyd, kaartbetaling vereis kaartnaam, kaartnommer, vervaldatum en CVV, en die kontakvorm vereis 'n rede en toepaslike boodskap/besoekdata.

## Tegnologie gebruik:
- **Kode:** HTML5, CSS, JavaScript
- **Styling:** Eksterne Style.css met media queries vir responsiwiteit en Print.css vir pdf en print van webblad
- **Interaktiwiteit:** script.js (galerye, animasies, vormvalidasie, DOM-manipulasie)
- **Databasis simulasie**: `localStorage` vir die webdemo, plus `database.sql` met VOORRAAD_ITEMS en VERKOPE_REKORDS
- **Multimedia**: Galerye, Carousel, Video met onderskrifte
- **Responsief**: Werk op selfoon, tablet en rekenaar
- **Eksterne bronne:** Google Fonts (Poppins, Playfair Display), Font Awesome ikone

## Belangrike funksionaliteit:
- Multi-bladsy responsiewe ontwerp (werk op mobiel, tablet en desktop)
- Professionele navigasie met dropdown-menus en hamburger-menu vir klein skerms
- Dinamiese galerye (hoof-galery op tuisblad + mini-galerye op Ons Trop)
- Voorraadbestuur met visuele waarskuwings vir lae voorraad
- Plaaskalender met uitgeligte gebeurtenisdae
- Inteken-/registreeropsie met `localStorage` gebruikers
- Inkopie-mandjie met itemtelling, bestelgeskiedenis en herbestelopsie
- Produkpryslys en bestelvorm met outomatiese totaal-berekening
- Onlangse verkope-oorsig
- Kontak- / navrae-vorm met validasie
- Volledige CRUD-operasies op voorraad-items (via databasis)

## Fase Dokumentasie
- **Fase 1 tot 5** se volledige beplanning, CSS-verduidelikings, JavaScript-logika en databasis-dokumentasie is beskikbaar in die gids **`Fases_Dokumentasie/`**.

## Lêerstruktuur
```
Skaapboerdery/   
├─ index.html   
├─ oor_ons.html   
├─ ons_trop.html   
├─ products.html   
├─ voorraadbestuur.html   
├─ verkope_en_rekord.html   
├─ contact.html   
├─ Style.css   
├─ print.css   
├─ script.js   
├─ database.sql   
├─ Bemarking.vtt   
├─ README.md   
│   
├─ Media/                    
│   └─ Alle foto's en video's wat in my webblaaie voorkom is hierbinne (38 Leers totaal)   
│   
├─ Fases_Dokumentasie/    
│   ├─ Fase1_Beplaning+Basies-HTML.docx   
│   ├─ Fase2_CSS+Uitleg.docx   
│   ├─ Fase3_Reponsief+Tabelle+Webvorm.docx   
│   ├─ Fase4_JS+Multimedia.docx   
│   ├─ Fase5_Databasis+Finale-Webblad.docx   
│   ├─ BuiteHanboekCode.docx   
│   ├─ Hanboek&ProjekVoorkom.docx   
│   └─ KI_media.docx   
│   
└─ Skermskote en Video/   
    ├─ Fase2 - 3Blaaie/   
    │   ├─ Tuisblad_Skermskoot.png   
    │   ├─ OorOnsBlad_Skermskoot.png   
    │   └─ ProdukteBlad_Skermskoot.png   
    └─ Fase5 - Demo Video's/   
        ├─ Rekenaarskerm.mp4   
        ├─ Tabletskerm.mp4   
        └─ Slimfoon.mp4  
```