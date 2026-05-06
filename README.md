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
- **Produkte & Bestelvorm** met intydse totaal-berekening en betaalopsies
- **Voorraadbestuur** met volle **CRUD**-funksies en lae-voorraad waarskuwings
- **Transaksie-log** vir alle voorraadveranderinge
- **Onlangse verkope** oorsig (dinamies)
- **Kontakvorm** met besoek-besprekingsopsie
- **Multimedia** – Foto-galerye, produk-carousel en bemarkingsvideo met onderskrifte
- **Print-vriendelike** styl vir fakture en verslae

## Databasis Struktuur
Die webtuiste gebruik **`localStorage`** as 'n eenvoudige front-end databasis-simulasie vir realistiese plaasbestuur. Die projek dokumenteer ook 'n SQL-datamodel in **`database.sql`** met twee tabelle:

- **VOORRAAD_ITEMS** – Beheer alle voorraaditems (voer, medisyne, toerusting, produkte, ens.) met velde soos hoeveelheid, eenheid en herbestelpunt.
- **VERKOPE_REKORDS** – Dokumenteer verkope met datum, produknaam, hoeveelheid en totale bedrag.
- **Transaksies in `localStorage`** – Volledige logboek van voorraadveranderinge (byvoeg, aanpas, verwyder) vir die webdemo.
   
Elke item in die voorraad databasis bevat die volgende velde:
- **id** – Unieke identifiseerder (timestamp)
- **item_name** – Naam van die item (bv. "Lusern hooi", "Dorper entstof")
- **category** – Kategorie (Voer, Medisyne, Toerusting, ens.)
- **quantity** – Huidige hoeveelheid
- **unit** – Eenheid (bale, bottels, stelle, stuks, ens.)
- **reorder_level** – Herbestelpunt (minimum voorraad voordat waarskuwing wys)
- **last_updated** – Datum en tyd van laaste verandering

### Funksionaliteit wat die databasis het:
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
- **Styling:** Eksterne Style.css met media queries vir responsiwiteit en Print.css vir pdf en print van webblad
- **Interaktiwiteit:** script.js (galerye, animasies, vormvalidasie, DOM-manipulasie)
- **Databasis**: `localStorage` vir die webdemo, plus `database.sql` met VOORRAAD_ITEMS en VERKOPE_REKORDS
- **Multimedia**: Galerye, Carousel, Video met onderskrifte
- **Responsief**: Werk op selfoon, tablet en rekenaar
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