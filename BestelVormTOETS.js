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
            // Voeg by einde van calculateTotal():
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

        // BESTELVORM se datum en tyd
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

        // KONTAKVORM se datum en tyd
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
            if (reason === 'Navraag') {
                if (message.length < 10) {
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

            if (reason === 'Navraag') {
                successMsg += `Boodskap: ${message}`;
            } else {
                successMsg += "(Besoek-aanvraag – geen boodskap vereis nie)";
            }

            alert(successMsg);

            // Vind vorm met id "contactForm" ,maak velde leeg
            document.getElementById('contactForm').reset();

            toggleMessageFieldRequirement();
            togglePickupDateField();
        }