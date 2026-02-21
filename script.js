// =====================================================================
// ----------------------------- GALLERY -------------------------------
// =====================================================================
    let slideIndex = 0;

    // Alles wat in 'slide'-klas is 
        // -> NodeList - beheer die slides en kolletjies terselfdetyd
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    // Maak dat 1 slide op 'n slag wys
    function showSlide(i) 
    {
        // Toets of '.slide' in blad is as dit is voer uit anders stop funksie - sodat JS nie crash nie
        if (slides.length === 0)
        {
            return;  
        }

        // For-lus: Verwyder 'active'-klas van alle elemente in NodeList, 1 vir 1
            //Gebruik 's => s' en 'd => d' eerder as function(slide) met 'slide.classList...' binne {}
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        
        // Merk huidige('i') slide en kol aktief - sodat huidige slide se kolletjie ingevul is
        slides[i].classList.add("active");  
        dots[i].classList.add("active");
    }

    // Verander huidige slide met sekere getal voor of agter-entoe
        // Volgende slide(n) - '1'
        // Vorige slide(n) - '-1' 
    function changeSlide(n) 
    {
        if (slides.length === 0)
        {
            return;
        }

        // Sirkulere navigase - link einde en begin aan mekaar
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        // Roep funksie om nuwe slide te wys
        showSlide(slideIndex);
    }

    // Spring na spesifieke slide (as kolletjie kliek)
    function currentSlide(n) 
    {
        if (slides.length === 0)
        { 
            return;
        }

        // Stel gelyk aan nommer van slide wat jy wil wys (nommer gelink aan sirkel in html)
        slideIndex = n;
        // Roep funksie sodat die gekose slide hierbo wys
        showSlide(slideIndex);
    }

    // Wys eerste slide outomaties waneer bladsy laai - as daar minste 1 slide is
    if (slides.length > 0) 
    {
        // As minste 1 slide is wys slide 0
        showSlide(slideIndex);
    }

// =====================================================================
// -------------------- MINI GALLERY – per gallery ---------------------
// =====================================================================
    function initMiniGalleries() 
    {
        // Loop deur alle mini-galery classe op die blad
        document.querySelectorAll('.mini-gallery').forEach(gallery => {
            let currentIndex = 0;
            // NodeList
            const miniSlides = gallery.querySelectorAll('.mini-slide');

            //Toets
            if (miniSlides.length === 0) 
            {
                return;
            }

            function showMiniSlide(index) 
            {
                // Gaan deur elke prent in die spesifieke gallery - maak sodat geen slide aktief is voordat nuwe een aktiveer word nie
                miniSlides.forEach(slide => slide.classList.remove('mini-active'));
                
                // Toets of daar slide by die indeks bestaan 
                if (miniSlides[index])
                {  
                    // Maak die huidige slide active
                    miniSlides[index].classList.add('mini-active');
                    // Opdateer sodat weet watter indeks tans wys
                    currentIndex = index;
                }
            }

            //Soek spesifiek vir hierdie knoppies sodat nie inmeng met ander op bladsy
            const leftBtn = gallery.querySelector('.mini-arrow.mini-left'); 
            const rightBtn = gallery.querySelector('.mini-arrow.mini-right');


            if (leftBtn) 
            {
                // Kyk waneer op linker pyl gekliek word
                leftBtn.addEventListener('click', () => {
                    
                    // Stel nuwe indeks gelyk aan vorige indeks (linkerkant)
                    let newIndex = currentIndex - 1;

                    // Toets of nuwe indeks -1 is
                    if (newIndex < 0) 
                    {
                        // Maak die nuwe ineks die laaste slide (sirkulere slideshow)
                        newIndex = miniSlides.length - 1;
                    }

                    // Roep - wys slide met die nuwe indeks
                    showMiniSlide(newIndex);
                });
            }

            if (rightBtn) 
            {
                // Kky waneer op regter pyltjie kliek
                rightBtn.addEventListener('click', () => {
                    
                    // Stel nuwe indeks gelyk aan volgende indeks (regterkant)
                    let newIndex = currentIndex + 1;
                    
                    // Toets of verby laaste slide gaan - spring terug na indeks 0 as waar
                    if (newIndex >= miniSlides.length) 
                    {
                        newIndex = 0;
                    }
                    
                    // Roep - wys slide met die nuwe indeks
                    showMiniSlide(newIndex);
                });
            }

            // Begin met eerste slide - wys indeks 0 slide eerste
            showMiniSlide(0);
        });
    }

    // Wag tot hele HTML blad klaar gelaai is - voer dan eers 'initMiniGalleries' uit
    document.addEventListener('DOMContentLoaded', initMiniGalleries);

// ----------------------------------- TERUG NA BO KNOPPIE -----------------------------------
    // Stoor die 'id=topBtn' in veranderlike vir makliker gebruik
    const btn = document.getElementById("topBtn");

    // Koppel funksie aan scroll van die hele bladsy
    window.onscroll = function() 
    {
        // Meer as 300px afscroll - knoppie raak sigbaar
            // 'window.scrollY' - huidige scroll pos in pixels
        if (window.scrollY > 300) 
        {
            btn.style.display = "block";    // Wys die knoppie
        } 
        else 
        {
            btn.style.display = "none";     // Steek die knoppie weg
        }
    };

// ----------------------------------- SPLIT -----------------------------------
    // Kyk watter split classe sigbaar is op skerm
    function checkSplitVisibility() 
    {
        // Vind alle split klasse
        const splits = document.querySelectorAll('.split');
        
        // Beweeg deur elke split 1 vir 1
        splits.forEach(split => {

            // Gee pos en grootte v. split relatief tot sigbare skerm
            const rect = split.getBoundingClientRect();
            // Hoogte v. sigbare skerm in pixels
            const windowHeight = window.innerHeight;
            
            // Toets of enige deel van die element(rect) - sodat animasie nie te vroeg of laat begin
                // Bokant v. element mag net 200 max onder skerm wees
                // Onderkant v. element mag 200 max bo die skerm wees
            if (rect.top < windowHeight + 200 && rect.bottom > -200) 
            {
                // Kyk of element nog nie 'show' klas het 
                if (!split.classList.contains('show')) 
                {
                    // Voeg klas show by - aktiveer die CSS vir die animasie
                    split.classList.add('show');
                }
            }
        });
    }

    // Wag tot hele HTML blad klaar gelaai is - voer dan eers funksie uit
    document.addEventListener('DOMContentLoaded', function() {
        
        // Roep funksie vir as elemente reeds sigbaar
        checkSplitVisibility();
        // Roep weer funksie na '100ms' en '500ms' - laai stadiger sodat posisies korrek bereken word
        setTimeout(checkSplitVisibility, 100);
        setTimeout(checkSplitVisibility, 500);
    });

    // Roep met scroll en resize
        // Kyk watter splits sigbaar word met scroll
        // Kyk of skermgroote verander
    window.addEventListener('scroll', checkSplitVisibility);
    window.addEventListener('resize', checkSplitVisibility);


// =====================================================================
// CAROUSEL - Slegs uitvoer as die element bestaan, sodat js nie crash
// =====================================================================
    // Soek in HTML vir 'id=produkCarousel' en stoor in waarde
    const carouselContainer = document.getElementById('produkCarousel');

    // Toets of carousel container bestaan is
    if (carouselContainer) 
    {
        // Verkorte naam vir makliker en vinniger gebruik
        const carousel = carouselContainer;
        // Skikking vir carousel se prente
        const images = [
            { src: "Wol.jpg", alt: "Hoë kwaliteit wol" },
            { src: "Babies.jpg", alt: "Lammers" },
            { src: "LamVleis.jpg", alt: "Skaapvleis" },
            { src: "1Skaap.jpg", alt: "Volwasse skaap" },
            { src: "Skaapvel.jpg", alt: "Skaapvel" },
            { src: "LamVet.jpg", alt: "Skaapvet / talg" }
        ];

        // Watter prent tans in middel is
        let currentIndex = 0;
        // Wys 3 prente gelyktydig op skerm
        const visibleCount = 3;
        // Maak prent wat op pos 1 is die middel prent vanuit 3 posisies wat daar is (0  1  2)
        const centerIndex = Math.floor(visibleCount / 2);

        // Funksie wat sigbare deel bou of herbou
        function renderCarousel() 
        {
            // Stoor aantal prente 
            const total = images.length;
            // Maak leeg - verwyder ou inhoud
            carousel.innerHTML = '';

            // Loop 3 keer deur - elke sigbare prent
            for (let i = 0; i < visibleCount; i++) 
            {
                // Bereken watter prent in die pos moet kom (maak seker dis sirkuler)
                const imgIndex = (currentIndex + i - centerIndex + total) % total;
                // Prent data(src / alt) vir die berekende indeks
                const imgData = images[imgIndex];

                // Skep nuwe div met 'carousel-item'-klas vir elke prent
                const wrapper = document.createElement('div');
                wrapper.classList.add('carousel-item');

                // Stel die src en alt vir img element 
                const img = document.createElement('img');
                img.src = imgData.src;
                img.alt = imgData.alt;

                // Plaas img element binne div
                wrapper.appendChild(img);
                // Sit div binne houer
                carousel.appendChild(wrapper);

                // Toets of middelse prent
                if (i === centerIndex) 
                {
                    // Kry ekstra klas - center
                    wrapper.classList.add('center');
                }
            }
        }

        // Beweeg vorentoe of gaterntoe
        function moveSlide(direction) 
        {
            // Bereken watter prent in die pos moet kom (maak seker dis sirkuler)
            currentIndex = (currentIndex + direction + images.length) % images.length;
            // Roep om sigbare deel te herbou
            renderCarousel();
        }

        // Maak moveSlide global sodat <button onclick="moveSlide(1)"> dit kan roep
        window.moveSlide = moveSlide;

        // Bou die 1ste keer wys items (0,1,2)
        renderCarousel();

        // Outo-scroll elke 4 sekondes 1 regs/vorentoe
        let autoScroll = setInterval(() => moveSlide(1), 4000);

        // Veranderlike vir ouer element
        const parent = carousel.parentElement;
        // Toets of muis op 'parent' hover
        if (parent) 
        { 
            // Stop auto-scroll
            parent.addEventListener('mouseenter', () => clearInterval(autoScroll));
            // Begin weer auto-scroll
            parent.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => moveSlide(1), 4000);
            });
        }
    }

//  ----------------------------------- BESTELVORM -----------------------------------
    // Funksie: Bepaal sigbaarheid van aflewering adres veld
    function toggleAddressField() 
    {
        // Kry selekteerde waarde vanaf veld met id 'deliveryOption' en stoor in waarde
        const option = document.getElementById('deliveryOption').value;
        // Groep div's wat hele adres-invoer bevat en stoor in waarde
        const addressGroup = document.getElementById('addressGroup');
        // Vind eintlike teksveld van adres
        const addressField = document.getElementById('deliveryAddress');

        // Toets of gebruiker aflewering kies
        if (option === 'deliver') 
        {
            // Maak hele adres groep sigbaar en verpligtend
            addressGroup.style.display = 'block';
            addressField.required = true;
        } 
        else 
        {
            addressGroup.style.display = 'none';
            addressField.required = false;
            // Vee inhoud uit sodat geen adres oorbly
            addressField.value = '';
        }
    }

    // Voer funksie uit waneer form submit word
    function handleOrderSubmit(e) 
    {
        // Event(submission) objek - stop standaard vorm gedrag(simuleer bestelling ,geen bestelling eintlik geplaas)
        e.preventDefault();

        const deliveryOption = document.getElementById('deliveryOption').value;
        // Basiese suksess boodskap met 2 lyne vir ekstra spasie
        let message = "Bestelling suksesvol geplaas!\n\n";

        // Toets of aflewering gekies is
        if (deliveryOption === 'deliver') 
        {
            // Kry adres en verwyder ekstra spasie voor of agter (trim)
            const address = document.getElementById('deliveryAddress').value.trim();
            // Toets of adres leeg is, as leeg wys waarskuwing en stop funksie
            if (!address) 
            {
                alert("Verskaf asseblief 'n afleweringsadres wanneer jy aflewering kies.");
                return;
            }
            // Voeg aflewering inligting by basiese suksesboodskap
            message += "Afleweringsopsie: Aflewering\nAdres: " + address + "\n\n";
        } 
        else if (deliveryOption === 'self') 
        {
            // Voeg self afhaal by basiese suksesboodskap by
            message += "Afleweringsopsie: Self-afhaal\n\n";
        }

        // Wys finale suksesboodskap in popup
        alert(message);
        // Maak hele vorm leeg
        document.getElementById('orderForm').reset();
        toggleAddressField(); // Maak adresveld toe na reset
    }

// =====================================================================
// VOORRAADBESTUUR - Slegs as die tabel bestaan, sodat js nie crash
// =====================================================================
    // Vind <tbody> met id 'inventoryBody' - waar ry data bygevoeg/verwyder word
    const inventoryBodyElement = document.getElementById('inventoryBody');

    // Toets of in bladsy bestaan
    if (inventoryBodyElement) 
    {
        // Hoof funksie wat wat status nagaan en opdateer (laag / goed)
        function updateStockStatus() 
        {
            // Kry alle ry binne lyf
            const rows = document.querySelectorAll('#inventoryBody tr');
            // Gaan deur elke ry 1 vir 1
            rows.forEach(row => {
                // Lees qry en reorder , as nie getal is vertoon 0
                const qty = parseInt(row.dataset.qty) || 0;
                const reorder = parseInt(row.dataset.reorder) || 0;
                // Maak vaste veranderlikes vir spesifieke ry en kolom
                const qtyCell = row.cells[2];
                const statusCell = row.cells[5];

                // Toets of beide geldig is en huidige qty minder is as reorder
                if (!isNaN(qty) && !isNaN(reorder) && qty < reorder) 
                {
                    // Voeg rooi op qty selle en verander status na 'Laag'
                    qtyCell.classList.add('low-stock');
                    statusCell.innerHTML = '<span class="status-low">LAAG – Bestel!</span>';
                } 
                else 
                {
                    // Verwyder waarskuwing en stel status 'Goed'
                    qtyCell.classList.remove('low-stock');
                    statusCell.innerHTML = 'Goed';
                }
            });
        }

        // Globale funksies sodat HTML-knoppie direk kan roep
        window.addInventory = function() 
        {
            // Vra gebruiker vir prompt

            let item = prompt("Item naam:")

            // Toets of waarde ingevul/geldig is
            if (item === null || item === undefined) 
            {
                // Standaardwaarde
                item = "Nuwe item";
            } 
            else 
            {
                // Verwyder ekstra spasies voor of na woord
                item = item.trim();
            }

            let categoryInput = prompt("Kategorie:");
    
            if (categoryInput === null || categoryInput === undefined) 
            {
                categoryInput = "Voer";
            } 
            else 
            {
                categoryInput = categoryInput.trim();
            }
            let category = categoryInput;

            // Hoeveelheid
            let qtyInput = prompt("Hoeveelheid:", "10");
            
            let qty;
            if (qtyInput === null || qtyInput === undefined || qtyInput.trim() === "")
            {
                qty = 10;
            } 
            else 
            {
                qty = parseInt(qtyInput);
                // As parseInt nie 'n getal kon maak nie (bv. letters ingetik)
                if (isNaN(qty)) 
                {
                    qty = 10;
                }
            }

            // Eenheid
            let unitInput = prompt("Eenheid:");
            
            if (unitInput === null || unitInput === undefined) 
            {
                unitInput = "stuks";
            } 
            else 
            {
                unitInput = unitInput.trim();
            }
            let unit = unitInput;

            // Herbestel-punt
            let reorderInput = prompt("Herbestel by:", "5");
            
            let reorder;
            if (reorderInput === null || reorderInput === undefined || reorderInput.trim() === "") 
            {
                reorder = 5;
            } 
            else 
            {
                reorder = parseInt(reorderInput);
                if (isNaN(reorder)) 
                {
                    reorder = 5;
                }
            }

            // Skep nuwe tabel ry
            const tr = document.createElement('tr');

            // Stoor waardes
            tr.dataset.item = item;
            tr.dataset.category = category;
            tr.dataset.qty = qty;
            tr.dataset.unit = unit;
            tr.dataset.reorder = reorder;

            // Vul ry met inhoud wat binne HTML is
            tr.innerHTML = `
                <td>${item}</td>
                <td>${category}</td>
                <td>${qty}</td>
                <td>${unit}</td>
                <td>${reorder}</td>
                <td>Goed</td>
                <td><button onclick="deleteInventory(this)" style="color:#dc2626; background:none; border:none; cursor:pointer; font-size:1.2rem;"><i class="fas fa-trash"></i></button></td>
            `;

            // Voeg die ry by tabel en opdateer status
            inventoryBodyElement.appendChild(tr);
            updateStockStatus();
        };

        // Funksie om rye te delete - button is delete knoppie
        window.deleteInventory = function(button) 
        {
            // Wys standaarde conformasie met ok en cancel knoppies
            if (confirm("Verwyder hierdie item?")) 
            {
                // Stoor naaste 'tr' opwaarts vanaf knoppie
                const row = button.closest('tr');
        
                // Toets of naaste gekry is
                if (row)
                {              
                    // Verwyder naaste ry
                    row.remove();
                }
            }
        };

        // Filter funksie
        window.filterInventory = function() 
        {
            // Stoor soek-input in html met id "searchInv"
            const input = document.getElementById('searchInv');
            // Toets of daar geen element met daai id is
            if (!input) 
            {
                return;
            }

            // Kry gebruiker se invoer,maak kleinerllers en verwyder spasies voor en na
            const val = input.value.toLowerCase().trim();
            // Stoor alle <tr> rye wat in tabel is
            const rows = document.querySelectorAll('#inventoryBody tr');

            // Gaan deur elke ry 1 vir 1
            rows.forEach(row => {
                // Lees data item en kategorie, gebruik lee string as nie bestaan
                const item = (row.dataset.item || '').toLowerCase();
                const cat = (row.dataset.category || '').toLowerCase();
                // Kyk of soekterm in item naam of kategorie voorkom
                if (item.includes(val) || cat.includes(val)) 
                {
                    row.style.display = '';      // wys die ry
                } 
                else 
                {
                    row.style.display = 'none';  // versteek die ry
                }
            });
        };

        // Roep sodra kode gelaai is - maak dat tabel reg lyk op oopmaak
        updateStockStatus();
    } 

// =====================================================================
// --------------------- ------ Kontakvorm -----------------------------
// =====================================================================
    // Defineer gebeurtenis objek funksie
    function handleSubmit(e) 
    {
        // Keer vorm se standaardgedrag - sodat bladsy nie herlaai, na ander URL beweeg as daar 'n 'action' is
        e.preventDefault();
        // Wys eenvoudige popup met teks hieronder, stuur geen regte boodskap net 'n simulasie
        alert("Boodskap suksesvol gestuur!");
        // Vind vorm met id "contactForm" ,maak velde leeg
        document.getElementById('contactForm').reset();
    }