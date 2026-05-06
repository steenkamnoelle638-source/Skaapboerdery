
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
            { src: "Media/Wol.jpg", alt: "Hoë kwaliteit wol" },
            { src: "Media/Babies.jpg", alt: "Lammers" },
            { src: "Media/LamVleis.jpg", alt: "Skaapvleis" },
            { src: "Media/1Skaap.jpg", alt: "Volwasse skaap" },
            { src: "Media/Skaapvel.jpg", alt: "Skaapvel" },
            { src: "Media/LamVet.jpg", alt: "Skaapvet / talg" }
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
                // Fallback vir file:// oopmaak (want fetch word deur die blaaier geblok)
                const fallbackSales = [
                    { productName: 'Wol (per kg)', quantity: 5 },
                    { productName: 'Lewende Lammer (small/meduim)', quantity: 2 },
                    { productName: 'Skaapvleis (kg)', quantity: 7 },
                    { productName: 'Skaap (volwasse)', quantity: 1 },
                    { productName: 'Skaapvel (per vel)', quantity: 0 },
                    { productName: 'Skaapmis (per sak / 50 kg)', quantity: 3 },
                    { productName: 'Skaapvet / talg (per kg)', quantity: 1 }
                ];

                salesRows = fallbackSales.map(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${item.productName}</td><td>${item.quantity}</td>`;
                    return row;
                });
            }
        }

        // Koppel produknaam na bestaande produk-prente
        const topProductImageMap = [
            { matcher: ['wol'], src: 'Media/Wol.jpg', alt: 'Hoë kwaliteit wol' },
            { matcher: ['lammer', 'lam'], src: 'Media/Babies.jpg', alt: 'Lewende lammers' },
            { matcher: ['skaapvleis', 'vleis'], src: 'Media/LamVleis.jpg', alt: 'Skaapvleis' },
            { matcher: ['skaap (volwasse)', 'volwasse'], src: 'Media/1BlackheadPersian.jpg', alt: 'Volwasse skaap' },
            { matcher: ['skaapvel', 'vel'], src: 'Media/Skaapvel.jpg', alt: 'Skaapvel' },
            { matcher: ['skaapmis', 'mis'], src: 'Media/SkaapMis.jpg', alt: 'Skaapmis' },
            { matcher: ['skaapvet', 'talg', 'vet'], src: 'Media/LamVet.jpg', alt: 'Skaapvet / talg' }
        ];

        function resolveTopImage(productName)
        {
            const normalizedName = (productName || '').toLowerCase();

            const match = topProductImageMap.find(item =>
                item.matcher.some(keyword => normalizedName.includes(keyword))
            );

            return match || { src: 'Media/Wol.jpg', alt: productName || 'Produk prent' };
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
            function toggleCardDetailsRequirement() {
                const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
                const isCard = method === 'card';
                const cardDetails = document.getElementById('cardDetails');
                const cardFields = ['cardName', 'cardNumber', 'expiry', 'cvv']
                    .map(id => document.getElementById(id))
                    .filter(Boolean);

                if (cardDetails) 
                {
                    cardDetails.style.display = isCard ? 'block' : 'none';
                }

                cardFields.forEach(field => {
                    field.required = isCard;
                    field.disabled = !isCard;

                    if (!isCard)
                    {
                        field.value = '';
                    }
                });
            }

            document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
                radio.addEventListener('change', toggleCardDetailsRequirement);
            });

            // Stel reg by aanvanklike laai ook
            toggleCardDetailsRequirement();

            // Basiese formaat & validasie
            document.getElementById('cardNumber')?.addEventListener('input', function(e) {
                let val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g);

                if (val)
                {
                    e.target.value = val.join(' ');
                } 
            });

            document.getElementById('expiry')?.addEventListener('input', function(e) {
                let val = e.target.value.replace(/\D/g, '');

                if (val.length > 2) 
                {
                    val = val.slice(0,2) + '/' + val.slice(2);
                }

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
                    updatePaymentVisibility();
                });

                if (qty) qty.addEventListener('input', () => {
                    calculateTotal();
                    updatePaymentVisibility();
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
                        <input type="number" class="quantity-input" min="1" max="500" step="1" placeholder="Aantal" required>
                    </div>
                    <button type="button" class="remove-product-btn">−</button>
                `;
                
                container.insertBefore(newRow, addBtn);
                attachChangeListeners(newRow);

                // Belangrik: herbereken totaal + opdateer betaalmetode sigbaarheid dadelik
                calculateTotal();
                updatePaymentVisibility();

                // Verwyder knoppie se funksionaliteit + herroep totaal bereken metode
                newRow.querySelector('.remove-product-btn').addEventListener('click', function() {
                    newRow.remove();
                    calculateTotal();
                    updatePaymentVisibility();
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
        function togglePickupDateField() 
        {
            const select = document.getElementById('deliveryOption');
            if (!select)
            { 
                return;  // Geen keuse-element op die bladsy nie → stop dadelik
            }

            const value = select.value;

        // ============================= BESTELVORM DATUM + TYD =============================
            // Toets of op bestelvorm blad
            if (document.body.contains(document.getElementById('productsContainer'))) 
            {

                const pickupGroup = document.getElementById('pickupDateGroup');
                const addressGroup = document.getElementById('addressGroup');
                const addressField = document.getElementById('deliveryAddress');

                if (!pickupGroup || !addressGroup) 
                {
                    return; // veiligheid
                }

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
            if (!select) 
            {
                return;
            }

            const messageField = document.getElementById('message');
            const messageLabel = document.getElementById('messageLabel');

            // As geen boodskapveld of label return
            if (!messageField || !messageLabel) 
            {
                return;
            }

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
            const pickupTime = document.getElementById('pickupTime').value;

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

            if (deliveryOption === 'self' && !pickupTime)
            {
                errors.push("Kies asseblief 'n afhaaltyd.");
            }

            if (errors.length > 0)
            {
                alert("Daar is foute:\n\n" + errors.join("\n"));
                return;
            }

            // Spesifieke check vir aflewering
            if (deliveryOption === 'deliver' && address.length < 10)
            {
                errors.push("Afleweringsadres moet minstens 10 karakters wees as jy aflewering kies.");
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

            // Betaling validasie
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

                if (!cardName) 
                {
                    errors.push("Naam op kaart is verpligtend.");
                }

                if (cardNumber.length < 13 || cardNumber.length > 19) 
                {
                    errors.push("Ongeldige kaartnommer.");
                }

                if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry))
                {
                    errors.push("Vervaldatum moet MM/YY wees, bv. 08/28.");
                }

                if (cvv.length < 3 || cvv.length > 4) 
                {
                    errors.push("CVV moet 3-4 syfers wees.");
                }   
            }

            if (errors.length > 0) 
            {
                alert("Daar is foute:\n\n" + errors.join("\n"));
                return;
            }


            // Voeg items by die mandjie
            let hasItems = false;
            document.querySelectorAll('.product-row').forEach(row => {
                const select = row.querySelector('.product-select');
                const qtyInput = row.querySelector('.quantity-input');
                
                if (select && select.value && qtyInput && parseInt(qtyInput.value) > 0) 
                {
                    const selectedOptionText = select.options[select.selectedIndex].text;
                    const productName = normalizeProductName(selectedOptionText);
                    const price = productPrices[select.value] || 0;
                    const qty = parseInt(qtyInput.value);
                    
                    addToCart(productName, price, qty);
                    hasItems = true;
                }
            });

            if (!hasItems) 
            {
                alert("Geen produkte is bygevoeg nie.");
                return;
            }

            // Suksesboodskap
            let message = `✅ Sukses, ${name}!\n\n`;
            message += `Jou ${orderItems.length} produk(te) is by die mandjie gevoeg.\n\n`;
            message += orderItems.join("\n") + "\n\n";
            message += `Totaal: R ${totaal.toFixed(2)}\n\n`;
            
            alert(message);

            // Maak vorm skoon
            document.getElementById('orderForm').reset();

            // Herstel UI elemente
            const totalDisplay = document.getElementById('totalDisplay');
            const paymentSection = document.getElementById('paymentSection');
            const submitBtn = document.getElementById('submitBtn');

            if (totalDisplay) 
            {
                totalDisplay.style.display = 'none';
            }

            if (paymentSection) 
            {
                paymentSection.style.display = 'none';
            }

            if (submitBtn) 
            {
                submitBtn.style.display = 'none';
            }

            // Herstel ander velde
            toggleAddressField();
            if (typeof togglePickupDateField === 'function')
            {
                togglePickupDateField();
            }
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
            const visitDate = document.getElementById('visitDate').value;
            const visitTime = document.getElementById('visitTime').value;

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

            if (!reason)
            {
                errors.push("Kies asseblief 'n rede vir kontak.");
            } 
            
            // Slegs as Navrae gekies is, moet boodskap ingevul wees
            if (reason === 'Navraag') 
            {
                if (message.length < 10) 
                {
                    errors.push("Boodskap moet minstens 10 karakters wees vir 'n navraag.");
                }
            }

            if (reason === 'Besoek')
            {
                if (!visitDate)
                {
                    errors.push("Kies asseblief 'n datum vir die plaasbesoek.");
                }

                if (!visitTime)
                {
                    errors.push("Kies asseblief 'n tyd vir die plaasbesoek.");
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
            if (reason === 'Besoek')
            {
                successMsg += `Besoekdatum: ${visitDate} om ${visitTime}\n`;
            }

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

// ============================= DATABASIS: VOORRAADBESTUUR BLAD ============================= 
    const DB_KEY = 'highveld_inventory';
    const TX_KEY = 'highveld_transactions';

    let inventoryDB = [];
    let transactions = [];

    // Laai uit localStorage (SQL databasis)
    function loadDB() 
    {
        const saved = localStorage.getItem(DB_KEY);
        inventoryDB = saved ? JSON.parse(saved) : [
            { id:1, item_name:"Lusern hooi", category:"Voer", quantity:45, unit:"bale", reorder_level:30 },
            { id:2, item_name:"Dorper entstof", category:"Medisyne", quantity:8, unit:"bottels", reorder_level:15 },
            { id:3, item_name:"Skeertoerusting", category:"Toerusting", quantity:3, unit:"stelle", reorder_level:2 },
            { id:4, item_name:"Voerkrippe", category:"Toerusting", quantity:12, unit:"stuks", reorder_level:10 }
        ];

        const savedTx = localStorage.getItem(TX_KEY);
        transactions = savedTx ? JSON.parse(savedTx) : [];
    }

    // Stoor na localStorage
    function saveDB() 
    {
        localStorage.setItem(DB_KEY, JSON.stringify(inventoryDB));
        localStorage.setItem(TX_KEY, JSON.stringify(transactions));
    }

    // Voeg transaksie by (soos 'n regte databasis log)
    function addTransaction(item_id, type, qty, notes) 
    {
        const tx = {
            id: Date.now(),
            item_id: item_id,
            transaction_type: type,
            quantity: qty,
            date: new Date().toISOString(),
            notes: notes || ''
        };
        transactions.unshift(tx); // nuutste bo
        saveDB();
    }

    // Herbou die tabel
    function renderInventory() 
    {
        const tbody = document.getElementById('inventoryBody');
        tbody.innerHTML = '';

        inventoryDB.forEach(item => {
            const isLow = item.quantity < item.reorder_level;
            const rowHTML = `
                <tr ${isLow ? 'class="low-stock-row"' : ''}>
                    <td>${item.item_name}</td>
                    <td>${item.category}</td>
                    <td class="${isLow ? 'low-stock-emphasis' : ''}">${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.reorder_level}</td>
                    <td>${isLow ? '<span class="status-low">LAAG – Bestel!</span>' : 'Goed'}</td>
                    <td>
                        <button onclick="editItem(${item.id})" style="margin-right:8px; color:#065f46;">✏️</button>
                        <button onclick="deleteInventory(${item.id})" style="color:#dc2626;">🗑️</button>
                    </td>
                </tr>`;
            tbody.innerHTML += rowHTML;
        });
    }

// CRUD funksies
    // Bysit funksie (CREATE)
    window.addInventory = function() 
    {
        const item_name = prompt("Item naam:") || "Nuwe item";
        const category = prompt("Kategorie:", "Voer") || "Voer";
        const quantity = parseInt(prompt("Hoeveelheid:", "10")) || 10;
        const unit = prompt("Eenheid:", "stuks") || "stuks";
        const reorder = parseInt(prompt("Herbestel by:", "5")) || 5;

        const newItem = {
            id: Date.now(),
            item_name,
            category,
            quantity,
            unit,
            reorder_level: reorder
        };

        inventoryDB.push(newItem);
        addTransaction(newItem.id, 'add', quantity, 'Handmatig bygevoeg');
        saveDB();
        renderInventory();
    };

    // Verwyder funksie (DELETE)
    window.deleteInventory = function(id) 
    {
        if (!confirm("Verwyder hierdie item permanent?")) 
        {
            return;
        } 

        const item = inventoryDB.find(i => i.id === id);

        if (item) 
        {
            addTransaction(id, 'sell', item.quantity, 'Verwyder uit voorraad');
        }
        
        inventoryDB = inventoryDB.filter(i => i.id !== id);
        saveDB();
        renderInventory();
    };

    // Opdateer funksie (UPDATE)
    window.editItem = function(id) 
    {
        const item = inventoryDB.find(i => i.id === id);
        if (!item) 
        {
            return;
        }

        const newQty = parseInt(prompt(`Nuwe hoeveelheid vir ${item.item_name}:`, item.quantity));
        if (isNaN(newQty)) 
        {
            return;
        }

        const diff = newQty - item.quantity;
        item.quantity = newQty;
        item.last_updated = new Date().toISOString();

        addTransaction(id, diff > 0 ? 'add' : 'adjust', Math.abs(diff), 'Handmatig gewysig');
        saveDB();
        renderInventory();
    };

    // Filter funksie (READ met filter)
    window.filterInventory = function() 
    {
        const val = document.getElementById('searchInv').value.toLowerCase().trim();
        const rows = document.querySelectorAll('#inventoryBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(val) ? '' : 'none';
        });
    };

    window.showTransactions = function() 
    {
        let msg = "LAATSTE TRANSAKSIES\n\n";
        transactions.slice(0, 15).forEach(tx => {
            const item = inventoryDB.find(i => i.id === tx.item_id);
            const itemName = item ? item.item_name : 'Onbekend';
            msg += `${tx.date.split('T')[0]} ${tx.transaction_type.toUpperCase()} ${tx.quantity} × ${itemName} ${tx.notes ? '('+tx.notes+')' : ''}\n`;
        });

        if (transactions.length === 0) 
        {
            msg += "Nog geen transaksies nie.\n";
        }

        alert(msg);
    };

    // Inisialiseer
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('inventoryBody')) 
        {
            loadDB();
            renderInventory();
            // Herlaai elke 30 sekondes (demo)
            setInterval(() => { if (document.getElementById('inventoryBody')) renderInventory(); }, 30000);
        }
    });

// ============================= TRANSaksies LOG =============================
    window.showTransactions = function() 
    {
        if (transactions.length === 0) 
        {
            alert("Nog geen transaksies nie.\n\nVoeg items by of verander voorraad om die log te sien.");
            return;
        }

        let msg = "LAATSTE TRANSAKSIES (mees onlangse bo)\n\n";

        transactions.slice(0, 20).forEach(tx => {   // wys maksimum 20 transaksies
            const item = inventoryDB.find(i => i.id === tx.item_id);
            const itemName = item ? item.item_name : 'Onbekende item';
            
            const date = new Date(tx.date);
            const formattedDate = date.toLocaleString('af-ZA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            let typeEmoji = '';
            let typeText = '';

            switch(tx.transaction_type) 
            {
                case 'add':
                    typeEmoji = '➕';
                    typeText = 'Bygevoeg';
                    break;
                case 'sell':
                    typeEmoji = '➖';
                    typeText = 'Verwyder';
                    break;
                case 'adjust':
                    typeEmoji = '✏️';
                    typeText = 'Hoeveelheid aangepas';
                    break;
                default:
                    typeEmoji = '🔄';
                    typeText = tx.transaction_type;
            }

            msg += `${typeEmoji} ${formattedDate}\n`;
            msg += `   ${typeText}: ${tx.quantity} × ${itemName}\n`;
            
            if (tx.notes) 
            {
                msg += `   Nota: ${tx.notes}\n`;
            }

            msg += "\n";
        });

        msg += "=".repeat(60) + "\n";
        msg += `Totaal transaksies: ${transactions.length}`;

        alert(msg);
    };

// ============================= PLAASKALENDER =============================
    const CALENDAR_KEY = 'highveld_calendar_events';

    const defaultCalendarEvents = [
        { date: '2026-05-08', title: 'Skeerbeplanning', type: 'Produksie', details: 'Kontroleer skeertoerusting en bevestig skeerspan.' },
        { date: '2026-05-12', title: 'Entstofdag', type: 'Gesondheid', details: 'Dorper- en Merino-lammers kry geskeduleerde entstowwe.' },
        { date: '2026-05-18', title: 'Voerbestelling', type: 'Voorraad', details: 'Bestel lusern en mineraallekke voordat voorraad laag raak.' },
        { date: '2026-05-26', title: 'Markdag', type: 'Verkope', details: 'Lewende lammers en wol word vir kopers voorberei.' },
        { date: '2026-06-03', title: 'Veeartsbesoek', type: 'Gesondheid', details: 'Kwartaal-kontrole van tropgesondheid en parasietbeheer.' },
        { date: '2026-06-14', title: 'Rotasie-weiding skuif', type: 'Bestuur', details: 'Skuif trop na volgende kamp volgens weidingsplan.' }
    ];

    let calendarMonth = new Date(2026, 4, 1);
    let selectedCalendarDate = null;

    function loadCalendarEvents()
    {
        const saved = localStorage.getItem(CALENDAR_KEY);
        if (saved)
        {
            return JSON.parse(saved);
        }

        localStorage.setItem(CALENDAR_KEY, JSON.stringify(defaultCalendarEvents));
        return defaultCalendarEvents;
    }

    function formatDateKey(date)
    {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function renderCalendarEvents(dateKey, events)
    {
        const list = document.getElementById('calendarEventList');
        if (!list)
        {
            return;
        }

        const dayEvents = events.filter(eventItem => eventItem.date === dateKey);
        if (dayEvents.length === 0)
        {
            list.textContent = 'Geen gebeurtenisse op hierdie dag nie.';
            return;
        }

        const formattedDate = new Date(`${dateKey}T00:00:00`).toLocaleDateString('af-ZA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        list.innerHTML = `<strong>Gebeurtenisse vir ${formattedDate}:</strong><ul>${dayEvents.map(eventItem => `
            <li><strong>${eventItem.title}</strong> (${eventItem.type}) – ${eventItem.details}</li>
        `).join('')}</ul>`;
    }

    function renderFarmCalendar()
    {
        const calendar = document.getElementById('farmCalendar');
        const title = document.getElementById('calendarTitle');
        if (!calendar || !title)
        {
            return;
        }

        const events = loadCalendarEvents();
        const year = calendarMonth.getFullYear();
        const month = calendarMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const mondayStartOffset = (firstDay.getDay() + 6) % 7;
        const todayKey = formatDateKey(new Date());

        title.textContent = calendarMonth.toLocaleDateString('af-ZA', { month: 'long', year: 'numeric' });
        calendar.innerHTML = '';

        for (let i = 0; i < mondayStartOffset; i++)
        {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDay.getDate(); day++)
        {
            const date = new Date(year, month, day);
            const dateKey = formatDateKey(date);
            const dayEvents = events.filter(eventItem => eventItem.date === dateKey);
            const dayButton = document.createElement('button');
            dayButton.type = 'button';
            dayButton.className = 'calendar-day';
            dayButton.setAttribute('aria-label', `${dateKey}${dayEvents.length ? ' met gebeurtenisse' : ''}`);

            if (dayEvents.length > 0)
            {
                dayButton.classList.add('has-event');
            }
            else
            {
                dayButton.classList.add('no-event');
            }

            if (dateKey === todayKey)
            {
                dayButton.classList.add('today');
            }

            if (dateKey === selectedCalendarDate)
            {
                dayButton.classList.add('selected');
            }

            dayButton.innerHTML = `
                <span class="calendar-date-number">${day}</span>
                ${dayEvents.map(() => '<span class="calendar-event-dot"></span>').join('')}
            `;

            dayButton.addEventListener('click', () => {
                selectedCalendarDate = dateKey;
                renderFarmCalendar();
                renderCalendarEvents(dateKey, events);
            });

            calendar.appendChild(dayButton);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('farmCalendar'))
        {
            return;
        }

        document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
            calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
            selectedCalendarDate = null;
            renderFarmCalendar();
            document.getElementById('calendarEventList').textContent = 'Kies \'n gemerkte dag om die gebeurtenisse te sien.';
        });

        document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
            calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
            selectedCalendarDate = null;
            renderFarmCalendar();
            document.getElementById('calendarEventList').textContent = 'Kies \'n gemerkte dag om die gebeurtenisse te sien.';
        });

        renderFarmCalendar();
    });

// ============================= INTEKEN =============================
    let currentUser = null;

    // Laai gebruiker as daar een is
    function loadUser() 
    {
        const savedUser = localStorage.getItem('highveld_user');
        if (savedUser)  
        {
            currentUser = JSON.parse(savedUser);
            updateAuthUI();
        }
    }

    // Dateer die user ikoon en toestand op
    function updateAuthUI() 
    {
        const authBtn = document.getElementById('authBtn');
        if (!authBtn)
        { 
            return;
        }

        if (currentUser) 
        {
            authBtn.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
            authBtn.classList.add('logged-in');
            authBtn.title = `Welkom, ${currentUser.name}`;
        } 
        else 
        {
            authBtn.innerHTML = `<i class="fa-solid fa-user"></i>`;
            authBtn.classList.remove('logged-in');
        }
    }

    // Maak modal oop
    function openAuthModal(defaultTab = 'login') 
    {
        let modal = document.getElementById('authModal');
        
        if (!modal) 
        {
            createAuthModal();
            modal = document.getElementById('authModal');
        }
        
        modal.style.display = 'flex';
        
        // Skakel na regte tab
        showTab(defaultTab);
    }

    // Skep die modal (eenmalig)
    function createAuthModal() 
    {
        const modalHTML = `
        <div id="authModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeAuthModal()">×</span>
                
                <div class="tab-buttons">
                    <button class="tab-btn active" onclick="showTab('login')">Teken In</button>
                    <button class="tab-btn" onclick="showTab('register')">Registreer</button>
                </div>

                <!-- Login Form -->
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>E-pos</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Wagwoord</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit">Teken In</button>
                </form>

                <!-- Register Form -->
                <form id="registerForm" onsubmit="handleRegister(event)" style="display:none;">
                    <div class="form-group">
                        <label>Volle Naam</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-group">
                        <label>E-pos</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Wagwoord</label>
                        <input type="password" id="regPassword" required minlength="6">
                    </div>
                    <button type="submit">Registreer</button>
                </form>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Wissel tussen tabs
    function showTab(tab) 
    {
        document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
        document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', 
                (tab === 'login' && btn.textContent === 'Teken In') ||
                (tab === 'register' && btn.textContent === 'Registreer')
            );
        });
    }

    function closeAuthModal() 
    {
        const modal = document.getElementById('authModal');
        if (modal) 
        {
            modal.style.display = 'none';
        }
    }

    // Handle Login
    function handleLogin(e) 
    {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('highveld_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) 
        {
            currentUser = { name: user.name, email: user.email };
            localStorage.setItem('highveld_user', JSON.stringify(currentUser));
            updateAuthUI();
            closeAuthModal();
            alert(`Welkom terug, ${user.name}!`);
        } 
        else 
        {
            alert("Verkeerde e-pos of wagwoord.");
        }
    }

    // Handle Register
    function handleRegister(e) 
    {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        let users = JSON.parse(localStorage.getItem('highveld_users') || '[]');

        if (users.some(u => u.email === email)) 
        {
            alert("Hierdie e-pos is reeds geregistreer.");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('highveld_users', JSON.stringify(users));

        currentUser = { name, email };
        localStorage.setItem('highveld_user', JSON.stringify(currentUser));

        updateAuthUI();
        closeAuthModal();
        alert(`Welkom by Highveld Boerdery, ${name}!`);
    }

    // Uittree funksie (kan later bygevoeg word in 'n dropdown)
    window.logout = function() 
    {
        if (confirm("Wil jy regtig uitteken?")) 
        {
            currentUser = null;
            localStorage.removeItem('highveld_user');
            updateAuthUI();
        }
    };

    // Inisialiseer
    document.addEventListener('DOMContentLoaded', function() {
        loadUser();

        const authBtn = document.getElementById('authBtn');
        if (authBtn) 
        {
            authBtn.addEventListener('click', () => {
                if (currentUser) 
                {
                    showProfileModal();
                } 
                else 
                {
                    openAuthModal('login');
                }
            });
        }
    });

// ============================= INKOPIE MANDJIE =============================
    const CART_KEY = 'highveld_cart';
    const ORDER_HISTORY_KEY = 'highveld_orders';
    function normalizeProductName(name)
    {
        return String(name || '')
            .replace(/\s+[–-]\s*R[\d\s.,]+$/u, '')
            .trim();
    }

    let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
        .map(item => ({ ...item, name: normalizeProductName(item.name) }));

    function getOrderHistory()
    {
        return JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]')
            .map(order => ({
                ...order,
                items: Array.isArray(order.items)
                    ? order.items.map(item => ({ ...item, name: normalizeProductName(item.name) }))
                    : []
            }));
    }

    function saveOrderHistory(history)
    {
        localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
    }

    function formatCurrency(amount)
    {
        return `R ${Number(amount || 0).toFixed(2)}`;
    }

    function saveCart() 
    {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() 
    {
        const countEl = document.getElementById('cartCount');
        if (countEl) 
        {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            countEl.textContent = totalItems;
            countEl.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Voeg item by mandjie
    function renderOrderHistoryList(limit = 4, showReorderButton = true)
    {
        const orders = getOrderHistory().slice(0, limit);

        if (orders.length === 0)
        {
            return `<p class="order-history-empty">Nog geen vorige bestellings nie.</p>`;
        }

        return orders.map(order => {
            const itemsHtml = order.items.map(item => `
                <li>
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-meta">${item.quantity} × ${formatCurrency(item.price)}</span>
                </li>
            `).join('');

            return `
                <article class="order-history-item">
                    <div class="order-history-head">
                        <small>${order.dateLabel}</small>
                        <strong>${formatCurrency(order.total)}</strong>
                    </div>
                    <ul class="order-history-products">${itemsHtml}</ul>
                    ${showReorderButton ? `<button class="order-history-reorder" onclick="reorderItems(${order.id})">Herbestel</button>` : ""}
                </article>
            `;
        }).join('');
    }

    function renderProfileOrders()
    {
        const profileOrdersEl = document.getElementById('profileOrdersList');
        if (!profileOrdersEl)
        {
            return;
        }

        profileOrdersEl.innerHTML = renderOrderHistoryList(4, false);
    }

    function showProfileModal()
    {
        if (!currentUser)
        {
            openAuthModal('login');
            return;
        }

        let modal = document.getElementById('profileModal');
        if (!modal)
        {
            const profileHtml = `
                <div id="profileModal" class="modal" style="display:flex;">
                    <div class="modal-content">
                        <h3 class="close-modal" onclick="closeProfileModal()"><i class="fa-solid fa-circle-xmark"></i></h3>
                        <h3 style="margin-bottom:0.4rem; font-size: 25px;"><i style="font-size: 30px; margin-top: 10px" class="fa-solid fa-circle-user"></i>   My Profiel</h3>
                        <p style="margin-bottom:1rem; color:#4b5563;">${currentUser.name} · ${currentUser.email}</p>
                        <h4 style="margin-bottom:0.6rem;">Laaste 4 bestellings</h4>
                        <div id="profileOrdersList"></div>
                        <button onclick="logout(); closeProfileModal();" style="margin-top:2px; width:100%; padding:10px; border:1px solid #d1d5db; background: #a6dbb5; border-radius:8px; color: #303439;">Teken uit</button>
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', profileHtml);
            modal = document.getElementById('profileModal');
        }

        modal.style.display = 'flex';
        renderProfileOrders();
    }

    window.closeProfileModal = function()
    {
        const modal = document.getElementById('profileModal');
        if (modal)
        {
            modal.style.display = 'none';
        }
    };


    function addToCart(productName, price, quantity = 1) 
    {
        const cleanProductName = normalizeProductName(productName);
        const existing = cart.find(item => item.name === cleanProductName);

        if (existing) 
        {
            existing.quantity += quantity;
        } 
        else 
        {
            cart.push({ name: cleanProductName, price: price, quantity: quantity });
        }
        saveCart();
    }

    // Wys mandjie modal
    function showCart() 
    {
        let html = `<h3 style="font-size: 25px; margin-bottom:1rem; margin-top: 2px;"><i class="fa-solid fa-basket-shopping"></i>  Jou Inkopie Mandjie</h3>`;
        let total = 0;

        if (cart.length === 0)
        {
            html += '<p style="margin-top: -1rem;">Geen items in jou mandjie.</p>';
        }
        else
        {
            cart.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                html += `
                    <div style="display:flex; justify-content:space-between; margin:12px 0; padding:8px; background:#f9fafb; border-radius:8px;">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small>${formatCurrency(item.price)} × ${item.quantity} = ${formatCurrency(subtotal)}</small>                        
                        </div>

                        <div style="text-align:right;">
                            <strong>${formatCurrency(subtotal)}</strong><br>
                            <button onclick="removeFromCart(${index}); showCart();" style="color:#dc2626; font-size:0.9rem;">Verwyder</button>
                        </div>
                    </div>`;
            });

            html += `<hr><p style="font-size:1.3rem; font-weight:bold; color:#065f46;">Totaal: ${formatCurrency(total)}</p>`;
            html += `<button onclick="placeOrder()" style="width:100%; margin-top:15px; padding:14px; background:#065f46; color:white; border:none; border-radius:8px; font-size:1.1rem;">Plaas Bestelling</button>`;
        }

        html += `<section class="cart-order-history" style="margin-top:0.35rem;"><h4 class="order-history-title" style="margin: -30px 0 0.45rem -50px;">Laaste 4 bestellings</h4>${renderOrderHistoryList(4)}</section>`;
        document.querySelectorAll('div[data-cart-overlay="true"]').forEach(el => el.remove());

        // Gebruik bestaande modal
        const modal = document.createElement('div');
        modal.dataset.cartOverlay = 'true';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:3000;';
        modal.innerHTML = `
            <div style="background:white; padding:25px; border-radius:16px; max-width:500px; width:90%; max-height:90vh; overflow:auto; position:relative;">
                <button class="close-modal close-modal-circle" onclick="this.parentElement.parentElement.remove()" aria-label="Sluit mandjie"><i class="fa-solid fa-circle-xmark"></i></button>
                ${html}
            </div>`;
        document.body.appendChild(modal);
    }

    // Verwyder uit mandjie
    window.removeFromCart = function(index) 
    {
        cart.splice(index, 1);
        saveCart();
    };

    // Plaas bestelling
    window.reorderItems = function(orderId)
    {
        const order = getOrderHistory().find(item => item.id === orderId);
        if (!order)
        {
            return;
        }

        order.items.forEach(item => addToCart(item.name, item.price, item.quantity));
        showCart();
        alert('Items is weer by die mandjie gevoeg.');
    };

    window.placeOrder = function() 
    {
        if(cart.length === 0)
        { 
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const summary = cart.map(item => `${item.name} × ${item.quantity}`).join(' | ');

        const saleRecord = {
            id: Date.now(),
            sale_date: new Date().toISOString().split('T')[0],
            product_name: summary,
            quantity_sold: cart.reduce((sum, item) => sum + item.quantity, 0),
            total_amount: total,
            notes: currentUser ? `Bestelling deur ${currentUser.name}` : 'Gaste bestelling'
        };

        const orderRecord = {
            id: saleRecord.id,
            created_at: new Date().toISOString(),
            dateLabel: new Date().toLocaleString('af-ZA', { dateStyle: 'medium', timeStyle: 'short' }),
            total,
            items: cart.map(item => ({ ...item }))
        };

        let sales = JSON.parse(localStorage.getItem('highveld_sales') || '[]');
        sales.unshift(saleRecord);
        localStorage.setItem('highveld_sales', JSON.stringify(sales));

        const orderHistory = getOrderHistory();
        orderHistory.unshift(orderRecord);
        saveOrderHistory(orderHistory.slice(0, 50));

        alert(`✅ Bestelling suksesvol geplaas!
        Totaal: ${formatCurrency(total)}
        Dankie vir jou aankoop!`);

        cart = [];
        saveCart();

        // Sluit alle modals
        document.querySelectorAll('.modal, div[data-cart-overlay="true"]').forEach(el => el.remove());
        renderProfileOrders();
        if (typeof initTopProductsPreview === 'function') 
        {
            initTopProductsPreview();
        }
    };

    // Koppel mandjie knoppie
    document.addEventListener('DOMContentLoaded', () => {
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn)
        { 
            cartBtn.addEventListener('click', showCart);
        }

        updateCartCount();
        renderProfileOrders();

        // Maak mandjie beskikbaar in bestelvorm
        window.addToCart = addToCart;
        window.showProfileModal = showProfileModal;
    });

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

    if (video) 
    {
        video.addEventListener('timeupdate', () => {
            if (video.currentTime >= video.duration - 5) // laaste 5 sekondes
            {   
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

    if (pickupDate) 
    {
        pickupDate.setAttribute('min', minDate);
    }

    if (visitDate) 
    {
        visitDate.setAttribute('min', minDate);
    }

// Print: maak select-opsies volledig sigbaar
    const selectStates = [];
    function expandSelectsForPrint() 
    {
        document.querySelectorAll('select').forEach((select) => {
            selectStates.push({ el: select, size: select.getAttribute('size') });
            select.setAttribute('size', String(Math.max(select.options.length, 2)));
        });
    }

    function restoreSelectsAfterPrint() 
    {
        selectStates.forEach(({ el, size }) => {
            if (!el) 
            {
                return;
            }

            if (size === null) 
            {
                el.removeAttribute('size');
            } 
            else 
            {
                el.setAttribute('size', size);
            }
        });
        selectStates.length = 0;
    }

    window.addEventListener('beforeprint', expandSelectsForPrint);
    window.addEventListener('afterprint', restoreSelectsAfterPrint);
    });