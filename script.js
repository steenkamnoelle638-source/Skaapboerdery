
// ============================= TERUG NA BO KNOPPIE ============================= 
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

// ---------------------------------------------------------------------------------
// ==================================== GALERYE ====================================
//    ------------------------- 3 Verskillende galerye -------------------------
//                      Galery            - Tuisblad
//                      Mini Galery       - Ons trop blad
//                      Produkte Galery   - Produkte blad
// ---------------------------------------------------------------------------------

// ============================= GALERY ============================= 
    // Stel huidige / begin indeks as 0
    let slideIndex = 0;

    // Alles wat in 'slide'-klas is 
        // NodeList - beheer die slides en kolletjies terselfdetyd
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    // Maak dat 1 slide op 'n slag wys
    function showSlide(i) 
    {
        // Toets of 'slide' in blad is as dit is voer uit anders stop funksie - sodat JS nie crash nie
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

// ============================= MINI GALERY ============================= 
    function initMiniGalleries() 
    {
        // Loop deur alle mini-galery classe op die blad
        document.querySelectorAll('.mini-gallery').forEach(gallery => {
            // Stel huidige / begin indeks as 0
            let currentIndex = 0;
            // NodeList
            const miniSlides = gallery.querySelectorAll('.mini-slide');

            //Toets of mini galery bestaan in blad
            if (miniSlides.length === 0) 
            {
                return;
            }

            // Funksie om prent op 'ideks' te wys
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

        // Toets waneer op linker of regterpyl gekliek word
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

    document.addEventListener('DOMContentLoaded', initTopProductsPreview);

// ============================= PRODUKTE GALERY ============================= 
    // Soek in HTML vir 'id=produkCarousel' en stoor in waarde
    const carouselContainer = document.getElementById('produkCarousel');

    // Toets of carousel container bestaan in blad
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

// ============================= TOP 3 BESTE VERKOPE PREVIEW =============================
    async function initTopProductsPreview() 
    {
        const previewContainer = document.getElementById('topProductsPreview');

        if (!previewContainer) 
        {
            return;
        }

        // Gebruik huidige tabel as ons reeds op Verkope-blad is, anders lees uit verkope_en_rekord.html
        let salesRows = [];
        const localSalesTable = document.querySelector('#OnlangseVerkope table tbody');

        if (localSalesTable) 
        {
            salesRows = Array.from(localSalesTable.querySelectorAll('tr'));
        }
        else
        {
            try
            {
                const response = await fetch('verkope_en_rekord.html');
                const html = await response.text();
                const parser = new DOMParser();
                const salesDoc = parser.parseFromString(html, 'text/html');
                salesRows = Array.from(salesDoc.querySelectorAll('#OnlangseVerkope table tbody tr'));
            }
            catch (error)
            {
                previewContainer.innerHTML = '<p style="text-align: center;">Kon nie top verkope laai nie. <a class="top-products-link" href="verkope_en_rekord.html#OnlangseVerkope">Klik hier om die verkope blad oop te maak.</a></p>';
                return;
            }
        }

        // Koppel produknaam na bestaande produk-prente
        const topProductImageMap = [
            { matcher: ['wol'], src: 'Wol.jpg', alt: 'Hoë kwaliteit wol' },
            { matcher: ['lammer', 'lam'], src: 'Babies.jpg', alt: 'Lewende lammers' },
            { matcher: ['skaapvleis', 'vleis'], src: 'LamVleis.jpg', alt: 'Skaapvleis' },
            { matcher: ['skaap (volwasse)', 'volwasse'], src: '1BlackheadPersian.jpg', alt: 'Volwasse skaap' },
            { matcher: ['skaapvel', 'vel'], src: 'Skaapvel.jpg', alt: 'Skaapvel' },
            { matcher: ['skaapmis', 'mis'], src: 'SkaapMis.jpg', alt: 'Skaapmis' },
            { matcher: ['skaapvet', 'talg', 'vet'], src: 'LamVet.jpg', alt: 'Skaapvet / talg' }
        ];

        function resolveTopImage(productName)
        {
            const normalizedName = (productName || '').toLowerCase();

            const match = topProductImageMap.find(item =>
                item.matcher.some(keyword => normalizedName.includes(keyword))
            );

            return match || { src: 'Wol.jpg', alt: productName || 'Produk prent' };
        }

        const topProducts = salesRows
            .map(row => {
                const cells = row.querySelectorAll('td');
                const productName = cells[0]?.textContent?.trim() || '';
                const quantityText = cells[1]?.textContent?.trim() || '0';
                const quantity = parseInt(quantityText.replace(/[^\d-]/g, ''), 10) || 0;
                const image = resolveTopImage(productName);

                return { productName, quantity, image };
            })
            .filter(item => item.productName && item.quantity > 0)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 3);

        if (topProducts.length === 0)
        {
            previewContainer.innerHTML = '<p>Geen top verkope beskikbaar nie.</p>';
            return;
        }

        const topItemsHtml = topProducts
            .map((item, index) => `
                <article class="top-product-card ${index === 0 ? 'center' : ''}">
                    <img src="${item.image.src}" alt="${item.image.alt}">
                    <div class="top-product-card-body">
                        <span class="top-product-rank">#${index + 1}</span>
                        <h3 class="top-product-name">${item.productName}</h3>
                        <p class="top-product-qty">${item.quantity} verkoop</p>
                    </div>
                </article>
            `)
            .join('');

        previewContainer.innerHTML = `<div class="top-products-cards">${topItemsHtml}</div>`;
    }

// ---------------------------------------------------------------------------------
// ==================================== VORMS ====================================
//   ---------------------------------------------------------------------------
//                      Vorm                   - Bestelvorm en Kontakvorm
//                      Bestelvorm Validasie   - 
//                      Kontakvorm Validasie   - 
// ---------------------------------------------------------------------------------
    
    // ============================= VORMS =============================
        //  Bepaal sigbaarheid van aflewering adres veld
        function toggleAddressField() 
        {
         // BESTELVORM
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

        // Pryslys vir produkte (in Rand per eenheid)
        const productPrices = {
            "Wol": 160,                // per kg
            "Lammer": 2200,            // per lewendige lam
            "Skaapvleis": 95,         // per kg
            "Skaap": 3000,             // per volwasse skaap
            "Skaapvel": 2030,           // per vel
            "Skaapmis": 85,            // per sak
            "Skaapvet": 73             // per kg
        };

        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('productsContainer');
            const addBtn = document.getElementById('addProductBtn');
            let rowIndex = 1; // begin by 1 want 0 is al daar

            // Vind elemente en herroep togglePickupDate funksie elke keer as gebruiker iets verander
            const selectElement = document.getElementById('deliveryOption');
            if (selectElement) 
            {
                // Een listener vir albei bladsye – funksie besluit self watter logika om te gebruik
                selectElement.addEventListener('change', togglePickupDateField);
                
                // Roep eenmalig by laai (stel aanvanklike toestand)
                togglePickupDateField();
            }

            // Funksie om totaal te bereken
            function calculateTotal() 
            {
                let total = 0;
                // Beweeg deur al die rye, kyk watter produk gekies is en hoeveel gekies
                    // Spinner insit vir hoeveelheid (op en af pyltjies om waarde te vergroot / klein) saam met waarde invul opsie
                document.querySelectorAll('.product-row').forEach(row => {
                    const select = row.querySelector('.product-select');
                    const qty = row.querySelector('.quantity-input');

                    // Toets of produk en hoeveelheid gekies/ingevul is
                    if (select.value && qty.value) 
                    {
                        const price = productPrices[select.value] || 0;
                        total += price * parseInt(qty.value || 0);
                    }
                });

                // Konstantes vir totale prys en vertoning daarvan
                const totalEl = document.getElementById('totalPrice');
                const display = document.getElementById('totalDisplay');

                // Toets of totaal bestaan
                if (total > 0) 
                {
                    // Vertoon 'R' met totaal waarde afgerond tot 2 desimale plekke
                    totalEl.textContent = `R ${total.toFixed(2)}`;
                    display.style.display = 'block';
                } 
                else 
                {
                    display.style.display = 'none';
                }

                // Maak seker visibility update elke keer loop
                updatePaymentVisibility();
            }

            // Wys betaal-seksie en pas knoppie aan sodra totaal > 0
            function updatePaymentVisibility() 
            {
                const totalDisplay = document.getElementById('totalDisplay');
                const paymentSection = document.getElementById('paymentSection');
                const submitBtn = document.getElementById('submitBtn');
                const payTotal = document.getElementById('payTotal');

                if (totalDisplay.style.display === 'block' && parseFloat(document.getElementById('totalPrice').textContent.replace('R ', '')) > 0) 
                {
                    paymentSection.style.display = 'block';
                    submitBtn.style.display = 'block';
                    payTotal.textContent = document.getElementById('totalPrice').textContent.replace('R ', '');
                } 
                else 
                {
                    paymentSection.style.display = 'none';
                    submitBtn.style.display = 'none';
                }
            }

            // Roep dit in calculateTotal na die totaal wys
            updatePaymentVisibility();

            // Wys/versteek kaartvelde afhangend van watter betaalopsie gekies is
            document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('cardDetails').style.display = (this.value === 'card') ? 'block' : 'none';
                });
            });

            // Basiese formaat & validasie
            document.getElementById('cardNumber')?.addEventListener('input', function(e) {
                let val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g);
                if (val) e.target.value = val.join(' ');
            });

            document.getElementById('expiry')?.addEventListener('input', function(e) {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
                e.target.value = val.slice(0,5);
            });

        // KONTAKVORM 
            const contactSelect = document.getElementById('deliveryOption');
            if (contactSelect && document.getElementById('message')) 
            {
                // Kontakvorm-spesifieke listeners
                contactSelect.addEventListener('change', function () {
                    togglePickupDateField();       // jou bestaande funksie vir datum/tyd
                    toggleMessageFieldRequirement(); // nuwe funksie vir boodskap
                });

                // Stel aanvanklike toestand by laai
                toggleMessageFieldRequirement();
                // Roep eenmalig by laai (stel aanvanklike toestand)
                togglePickupDateField();
            }

            // Voeg gebeurtenisse by vir veranderinge
            function attachChangeListeners(row) 
            {
                row.querySelector('.product-select').addEventListener('change', calculateTotal);
                row.querySelector('.quantity-input').addEventListener('input', calculateTotal);
            
                const select = row.querySelector('.product-select');
                const qty = row.querySelector('.quantity-input');

                if (select) select.addEventListener('change', () => {
                    calculateTotal();
                    updatePaymentVisibility();   // ← Voeg hier by
                });

                if (qty) qty.addEventListener('input', () => {
                    calculateTotal();
                    updatePaymentVisibility();   // ← Voeg hier by
                });
            }

            // Eerste ry v. produkte (gekose produk en hoeveelheid)
            attachChangeListeners(document.querySelector('.product-row'));

            // Nog produk byvoeg
            addBtn.addEventListener('click', function() {
                const newRow = document.createElement('div');
                newRow.className = 'product-row';
                newRow.dataset.index = rowIndex++;
                // Maak verpligtend om in te vul -> alle opsies (options)
                // Maak dat min hoeveelheid wat ingevoer mag word 1 is
                newRow.innerHTML = `
                    <div class="product-select-wrap">
                        <select class="product-select" required>
                            <option value="">Kies produk...</option>
                            <option value="Wol">Wol (per kg) – R160</option>
                            <option value="Lammer">Lammer (lewend) – R2 200</option>
                            <option value="Skaapvleis">Skaapvleis (kg) – R95</option>
                            <option value="Skaap">Skaap (volwasse) – R3 000</option>
                            <option value="Skaapvel">Skaapvel (per vel) – R2 030</option>
                            <option value="Skaapmis">Skaapmis (per sak / 50 kg) – R85</option>
                            <option value="Skaapvet">Skaapvet / talg (per kg) – R73</option>
                        </select>
                    </div>
                    <div class="quantity-wrap">
                        <input type="number" class="quantity-input" min="1" placeholder="Aantal" required>
                    </div>
                    <button type="button" class="remove-product-btn">−</button>
                `;
                
                container.insertBefore(newRow, addBtn);
                attachChangeListeners(newRow);

                // Belangrik: herbereken totaal + opdateer betaalmetode sigbaarheid dadelik
                `calculateTotal();
                 updatePaymentVisibility();`

                // Verwyder knoppie se funksionaliteit + herroep totaal bereken metode
                newRow.querySelector('.remove-product-btn').addEventListener('click', function() {
                    newRow.remove();
                    calculateTotal();
                });
                
                // Wys verwyder knoppie op alle rye as daar >1 is
                document.querySelectorAll('.remove-product-btn').forEach(btn => {
                    btn.style.display = 'block';
                });
            });

            // Kyk vir veranderinge sodat totaal herbereken
            container.addEventListener('change', calculateTotal);
            container.addEventListener('input', calculateTotal);
        });
        

        // Nuwe funksie vir afhaal en besoek se datum en tyd velde
        function togglePickupDateField() {
            const select = document.getElementById('deliveryOption');
            if (!select) return;  // Geen keuse-element op die bladsy nie → stop dadelik

            const value = select.value;

        // ============================= BESTELVORM DATUM + TYD =============================
            // Toets of op bestelvorm blad
            if (document.body.contains(document.getElementById('productsContainer'))) 
            {

                const pickupGroup = document.getElementById('pickupDateGroup');
                const addressGroup = document.getElementById('addressGroup');
                const addressField = document.getElementById('deliveryAddress');

                if (!pickupGroup || !addressGroup) return; // veiligheid

                // Toets of self afhaal gekies
                if (value === 'self') 
                {
                    // Maak datum en tyd velde verpligtend
                    pickupGroup.style.display = 'block';
                    document.getElementById('pickupDate').required = true;
                    document.getElementById('pickupTime').required = true;

                    // Maak dat slegs datums vanaf more geldig is
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    document.getElementById('pickupDate').min = tomorrow.toISOString().split('T')[0];
                } 
                else 
                {
                    // Versteek / Maak velde nie verpligtend
                    pickupGroup.style.display = 'none';
                    document.getElementById('pickupDate').required = false;
                    document.getElementById('pickupTime').required = false;
                }

                // As aflewerveld gekies is
                if (value === 'deliver') 
                {
                    // Maak adresveld verpligtend
                    addressGroup.style.display = 'block';
                    addressField.required = true;
                } 
                else 
                {
                    // Versteek adresveld / maak leeg
                    addressGroup.style.display = 'none';
                    addressField.required = false;
                    addressField.value = '';
                }
            }

        // ============================= KONTAKVORM DATUM + TYD =============================
            // Toets of op kontakvorm blad
            else if (document.getElementById('visitDateTimeGroup')) 
            {

                const visitGroup = document.getElementById('visitDateTimeGroup');

                // Toets of besiek gekies is
                if (value === 'Besoek') 
                {
                    // Vertoon datum en tyd velde en maak verpligtend
                    visitGroup.style.display = 'block';
                    document.getElementById('visitDate').required = true;
                    document.getElementById('visitTime').required = true;
                } 
                else 
                {
                    // Versteek datum en tyd velde
                    visitGroup.style.display = 'none';
                    document.getElementById('visitDate').required = false;
                    document.getElementById('visitTime').required = false;
                }
            }
        }

        function toggleMessageFieldRequirement() 
        {
            const select = document.getElementById('deliveryOption');
            // As afleweringopsie nie gekies return
            if (!select) return;

            const messageField = document.getElementById('message');
            const messageLabel = document.getElementById('messageLabel');

            // As geen boodskapveld of label return
            if (!messageField || !messageLabel) return;

            const isNavraag = select.value === 'Navraag';

            // As navraag gekies is
            if (isNavraag) 
            {
                // Maak boodskapveld verpligtend
                messageField.required = true;
                messageLabel.innerHTML = 'Boodskap <span style="color:red;">*</span>';
                messageField.placeholder = "Jou boodskap of navraag...";
            } 
            else 
            {
                messageField.required = false;
                messageLabel.innerHTML = 'Boodskap (opsioneel vir besoek)';
                messageField.placeholder = "Enige bykomende inligting (opsioneel)";
            }
        }

        // Koppel aan die change event
        // Bestelvorm
        const deliverySelect = document.getElementById('deliveryOption');
        if (deliverySelect) 
        {
            deliverySelect.addEventListener('change', togglePickupDateField);
            // Roep een keer by laai (indien voorheen gekies)
            togglePickupDateField();
        }

        // Kontakvorm (dieselfde <select id="deliveryOption"> maar ander betekenis)
        const contactReasonSelect = document.getElementById('deliveryOption');
        if (contactReasonSelect && document.getElementById('visitDate')) 
        {
            contactReasonSelect.addEventListener('change', togglePickupDateField);
            togglePickupDateField();
        }

    // ============================= BESTELVORM VALIDASIE =============================
        // Voer funksie uit waneer form submit word
        function handleOrderSubmit(e) 
        {
            // Event(submission) objek - stop standaard vorm gedrag(simuleer bestelling ,geen bestelling eintlik geplaas)
            e.preventDefault();

            // Stoor en kry velde se waardes
            const name = document.getElementById('name').value.trim();
            const emailField = document.getElementById('email');  // Die element self
            const email = emailField.value.trim();

            const deliveryOption = document.getElementById('deliveryOption').value;
            const address = document.getElementById('deliveryAddress').value.trim();
            const notes = document.getElementById('notes').value.trim();
            const pickupDate = document.getElementById('pickupDate').value;

            // Skikking - foute tydens validasie te stoor
            let errors = [];

            // Versameling vir multiselect produkte
            let orderItems = [];
            let totaal = 0;
            document.querySelectorAll('.product-row').forEach(row => {
                const prod = row.querySelector('.product-select').value;
                const qty = parseInt(row.querySelector('.quantity-input').value) || 0;
                
                if (prod && qty > 0) 
                {
                    const price = productPrices[prod];
                    orderItems.push(`${prod} x ${qty} = R ${(price * qty).toFixed(2)}`);
                    totaal += price * qty;
                }
            });

            if (orderItems.length === 0) 
            {
                errors.push("Kies ten minste een produk met hoeveelheid.");
            }

            // Valideer elke veld een vir een (As nie voldoen vertoon hierdie in foute skikking)
            if (!name) 
            {
                // errors.push - Voeg nuwe item aan einde van skikking by
                errors.push("Naam is verpligtend – vul asseblief jou volle naam in.");
            }

            if (!emailField.checkValidity()) 
            {
                errors.push("Geldige e-posadres is verpligtend (bv. jou@email.com).");

                // Spring na waar fout is
                emailField.focus();
            }

            if (!deliveryOption) 
            {
                errors.push("Kies asseblief self-afhaal of aflewering.");
            }

            // Extra validasie vir afhaal
            if (deliveryOption === 'self' && !pickupDate) 
            {
                errors.push("Kies asseblief 'n afhaaldatum.");
            }

            if (errors.length > 0) 
            {
                alert("Daar is foute:\n\n" + errors.join("\n"));
                return;
            }

            // Spesifieke check vir aflewering
            if (deliveryOption === 'deliver' && !address) 
            {
                errors.push("Afleweringsadres is verpligtend as jy aflewering kies.");
            }

            // Wys waarskuwing en stop funksie as enige 'foute' is
            if (errors.length > 0) 
            {
                // errors.join - Plaas alle items binne skikking saam in 1 string met nuwe lyn tussen in
                alert("Daar is foute in die vorm:\n\n" + errors.join("\n"));
                // Stop hier – geen bestelling word geplaas nie
                return;  
            }

            // Betaling + betaal velde
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

            if (!paymentMethod) 
            {
                errors.push("Kies asseblief 'n betaalmetode.");
            }

            if (paymentMethod === 'card') 
            {
                const cardNumber = document.getElementById('cardNumber').value.replace(/\D/g, '');
                const expiry = document.getElementById('expiry').value;
                const cvv = document.getElementById('cvv').value;
                const cardName = document.getElementById('cardName').value.trim();

                if (!cardName) errors.push("Naam op kaart is verpligtend.");
                if (cardNumber.length < 13 || cardNumber.length > 19) errors.push("Ongeldige kaartnommer.");
                if (!/^\d{2}\/\d{2}$/.test(expiry)) errors.push("Vervaldatum moet MM/YY wees.");
                if (cvv.length < 3 || cvv.length > 4) errors.push("CVV moet 3-4 syfers wees.");
            }

            if (errors.length > 0) 
            {
                alert("Daar is foute:\n\n" + errors.join("\n"));
                return;
            }


            // Bou sukses-boodskap op (met al die besonderhede)
            let message = "Bestelling suksesvol geplaas!\n\n";
            message += `Naam: ${name}\n`;
            message += `E-pos: ${email}\n`;
            message += "Bestelling items:\n" + orderItems.join("\n");
            message += `\n\nTotaal: R ${totaal.toFixed(2)}\n`;
            message += `Afleweringsopsie: ${deliveryOption === 'deliver' ? 'Aflewering' : 'Self-afhaal'}\n`;
            message += `\nBetaalmetode: ${paymentMethod === 'card' ? 'Kaart' : paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}\n`;
            message += "Betaling suksesvol!\n";

            // Voeg adres by as aflewering gekies is
            if (deliveryOption === 'deliver') 
            {
                message += `Adres: ${address}\n`;
                message += `Aflewering: Ons lewer af binne 3-5 werksdae\n`;
            } 
            else 
            {
                message += `Afhaaldatum: ${pickupDate || 'Nie gekies nie'}\n`;
                message += `Self-afhaal by plaas (Pretoria omgewing)\n`;
            }

            // Voeg notas by as daar iets ingevul is
            if (notes) 
            {
                message += `Bykomende notas: ${notes}\n`;
            }


            // Wys finale boodskap in popup
            alert(message);

            // Maak die hele vorm leeg na sukses
            document.getElementById('orderForm').reset();

            // Maak adresveld toe en steek totaal weg
            toggleAddressField();
            togglePickupDateField();
            document.getElementById('totalDisplay').style.display = 'none';
        }

    // ============================= KONTAKVORM VALIDASIE =============================
        // Defineer gebeurtenis objek funksie
        function handleSubmit(e) 
        {
            // Keer vorm se standaardgedrag - sodat bladsy nie herlaai, na ander URL beweeg as daar 'n 'action' is
            e.preventDefault();

            // Stoor in konstantes vir makliker en vinniger gebruik
            const name = document.getElementById('name').value.trim();
                // emailField is vir element self nie waarde soos email nie
            const emailField = document.getElementById('email');
            const email = emailField.value.trim();
            const message = document.getElementById('message').value.trim();
            const reason = document.getElementById('deliveryOption').value;

            // Skikking - foute tydens validasie te stoor
            let errors = [];

            // Valideer elke veld een vir een (As nie voldoen vertoon hierdie in foute skikking)
            if (!name) 
            {
                // errors.push - Voeg nuwe item aan einde van skikking by
                errors.push("Naam is verpligtend – vul asseblief jou volle naam in.");
            }

            if (!emailField.checkValidity()) 
            {
                errors.push("Geldige e-posadres is verpligtend (bv. jou@email.com).");

                // Spring na waar fout is
                emailField.focus();
            } 
            
            // Slegs as Navrae gekies is, moet boodskap ingevul wees
            if (reason === 'Navraag') 
            {
                if (message.length < 10) 
                {
                    errors.push("Boodskap moet minstens 10 karakters wees vir 'n navraag.");
                }
            }

            // Wys waarskuwing en stop funksie as enige 'foute' is
            if (errors.length > 0) 
            {
                // errors.join - Plaas alle items binne skikking saam in 1 string met nuwe lyn tussen in
                alert("Daar is foute in die vorm:\n\n" + errors.join("\n"));
                // Stop hier – geen bestelling word geplaas nie
                return;  
            }

            // Bou sukses-boodskap op (met al die besonderhede)
            let successMsg = "Boodskap suksesvol gestuur!\n\n";
            successMsg += `Naam: ${name}\nE-pos: ${email}\n`;
            successMsg += `Rede: ${reason === 'Besoek' ? 'Plaas besoek' : 'Navrae'}\n`;

            if (reason === 'Navraag') 
            {
                successMsg += `Boodskap: ${message}`;
            } 
            else 
            {
                successMsg += "(Besoek-aanvraag – geen boodskap vereis nie)";
            }

            alert(successMsg);

            // Vind vorm met id "contactForm" ,maak velde leeg
            document.getElementById('contactForm').reset();

            toggleMessageFieldRequirement();
            togglePickupDateField();
        }

// ============================= VOORRAADBESTUUR BLAD ============================= 
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
                const reorderCell = row.cells[4];
                const statusCell = row.cells[5];

                // Toets of beide geldig is en huidige qty minder is as reorder
                if (!isNaN(qty) && !isNaN(reorder) && qty < reorder) 
                {
                    // Ligte rooi agtergrond op die hele ry
                    row.classList.add('low-stock-row');
                    // Beklemtoon net hoeveelheid en herbestel by in rooi
                    qtyCell.classList.add('low-stock-emphasis');
                    reorderCell.classList.add('low-stock-emphasis');
                    statusCell.innerHTML = '<span class="status-low">LAAG – Bestel!</span>';
                } 
                else 
                {
                    // Verwyder waarskuwing en stel status 'Goed'
                    row.classList.remove('low-stock-row');
                    qtyCell.classList.remove('low-stock-emphasis');
                    reorderCell.classList.remove('low-stock-emphasis');
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

// ============================= VERDEEL (SPLIT) ============================= 
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

// ================================================================================= 
// ----------------------------- RESPONSIEWE NAVIGASIE -----------------------------
// =================================================================================
    // Hamburger menu toggle
    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('menuToggle');
        const barsIcon = document.getElementById('barsIcon');
        const xIcon = document.getElementById('xIcon');
        const nav = document.getElementById('mainNav');

        if (!toggleBtn || !nav)
        {
            return;
        }

        // Hoof burger menu oop/toe
        toggleBtn.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('active');

            if (isOpen) 
            {
                barsIcon.style.display = 'none';
                xIcon.style.display = 'inline-block';
            } 
            else 
            {
                barsIcon.style.display = 'inline-block';
                xIcon.style.display = 'none';
                // Maak alle sub-dropdowns toe wanneer hoofmenu toemaak
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });

        // Maak toe as buite gekliek word
        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target) && !toggleBtn.contains(event.target)) 
            {
                nav.classList.remove('active');
                barsIcon.style.display = 'inline-block';
                xIcon.style.display = 'none';
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });

        // Mobiele dropdowns: net die pyltjie oopmaak/toemaak
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();         // stop navigasie
                e.stopPropagation();        // stop borrel na ouer <a>

                const dropdown = this.closest('.dropdown');
                if (!dropdown) 
                {
                    console.log('Geen dropdown gevind vir hierdie pyltjie');
                    return;
                }

                // Toggle en log vir debug
                const isActiveNow = dropdown.classList.toggle('active');

                // Maak ander toe
                document.querySelectorAll('.dropdown').forEach(other => {
                    if (other !== dropdown) 
                    {
                        other.classList.remove('active');
                    }
                });
            });
        });

        // As op 'n sub-link gekliek word → maak hele mobiele menu toe
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
                barsIcon.style.display = 'inline-block';
                xIcon.style.display = 'none';
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            });
        });

// ============================= INTERAKTIEWE VIDEO + DATUM OBJEK =============================
    const video = document.getElementById('marketingVideo');
    const endLogo = document.getElementById('videoEndLogo');

    if (video) {
        video.addEventListener('timeupdate', () => {
            if (video.currentTime >= video.duration - 5) {   // laaste 5 sekondes
                endLogo.style.display = 'block';
                endLogo.style.opacity = '1';
            }
        });

        video.addEventListener('ended', () => {
            endLogo.style.opacity = '1';
        });
    }

    // Datum-objek: minimum datum vir afhaal/besoek (môre)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const pickupDate = document.getElementById('pickupDate');
    const visitDate = document.getElementById('visitDate');
    if (pickupDate) pickupDate.setAttribute('min', minDate);
    if (visitDate) visitDate.setAttribute('min', minDate);
    });

    