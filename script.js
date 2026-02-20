// =====================================================================
// ----------------------------- GALLERY -------------------------------
// =====================================================================
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(i) {
        if (slides.length === 0) return;  // Veiligheids check – geen crash as geen slides nie
        
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        
        slides[i].classList.add("active");
        dots[i].classList.add("active");
    }

    function changeSlide(n) {
        if (slides.length === 0) return;
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    function currentSlide(n) {
        if (slides.length === 0) return;
        slideIndex = n;
        showSlide(slideIndex);
    }

    // Wys eerste slide slegs as daar slides is
    if (slides.length > 0) {
        showSlide(slideIndex);
    }

// =====================================================================
// -------------------- MINI GALLERY – per gallery ---------------------
// =====================================================================
    function initMiniGalleries() {
        document.querySelectorAll('.mini-gallery').forEach(gallery => {
            let currentIndex = 0;
            const miniSlides = gallery.querySelectorAll('.mini-slide');  // Gebruik miniSlides i.p.v. slides

            if (miniSlides.length === 0) return;

            function showMiniSlide(index) {
                miniSlides.forEach(slide => slide.classList.remove('mini-active'));
                if (miniSlides[index]) {  // veiligheids check
                    miniSlides[index].classList.add('mini-active');
                    currentIndex = index;
                }
            }

            const leftBtn = gallery.querySelector('.mini-arrow.mini-left');  // meer spesifiek
            const rightBtn = gallery.querySelector('.mini-arrow.mini-right');

            if (leftBtn) {
                leftBtn.addEventListener('click', () => {
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = miniSlides.length - 1;
                    showMiniSlide(newIndex);
                });
            }

            if (rightBtn) {
                rightBtn.addEventListener('click', () => {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= miniSlides.length) newIndex = 0;
                    showMiniSlide(newIndex);
                });
            }

            // Begin met eerste slide
            showMiniSlide(0);
        });
    }

    document.addEventListener('DOMContentLoaded', initMiniGalleries);

// ----------------------------------- TERUG NA BO KNOPPIE -----------------------------------
    const btn = document.getElementById("topBtn");
    window.onscroll = function() {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    };

// ----------------------------------- SPLIT -----------------------------------
    /* SCROLL ANIMATIONS VIR SPLIT */
    function checkSplitVisibility() {
        const splits = document.querySelectorAll('.split');
        
        splits.forEach(split => {
            const rect = split.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Baie verdraagsaam: as enige deel van die element sigbaar is of naby is
            if (rect.top < windowHeight + 200 && rect.bottom > -200) {
                if (!split.classList.contains('show')) {
                    split.classList.add('show');
                    console.log("Show klas bygevoeg vir split element");  // debug
                }
            }
        });
    }

    // Roep dadelik by laai
    document.addEventListener('DOMContentLoaded', function() {
        checkSplitVisibility();
        // Extra oproep vir stadige laai
        setTimeout(checkSplitVisibility, 100);
        setTimeout(checkSplitVisibility, 500);
    });

    // Roep met scroll en resize
    window.addEventListener('scroll', checkSplitVisibility);
    window.addEventListener('resize', checkSplitVisibility);


// =====================================================================
// CAROUSEL - Slegs uitvoer as die element bestaan, sodat js nie crash
// =====================================================================
    const carouselContainer = document.getElementById('produkCarousel');

    if (carouselContainer) {
        console.log("Carousel gevind – begin carousel-logika");

        const carousel = carouselContainer;
        const images = [
            { src: "Wol.jpg", alt: "Hoë kwaliteit wol" },
            { src: "Babies.jpg", alt: "Lammers" },
            { src: "LamVleis.jpg", alt: "Skaapvleis" },
            { src: "1Skaap.jpg", alt: "Volwasse skaap" },
            { src: "Skaapvel.jpg", alt: "Skaapvel" },
            { src: "LamVet.jpg", alt: "Skaapvet / talg" }
        ];

        let currentIndex = 0;
        const visibleCount = 3;
        const centerIndex = Math.floor(visibleCount / 2);

        function renderCarousel() {
            const total = images.length;
            carousel.innerHTML = '';

            for (let i = 0; i < visibleCount; i++) {
                const imgIndex = (currentIndex + i - centerIndex + total) % total;
                const imgData = images[imgIndex];

                const wrapper = document.createElement('div');
                wrapper.classList.add('carousel-item');

                const img = document.createElement('img');
                img.src = imgData.src;
                img.alt = imgData.alt;

                wrapper.appendChild(img);
                carousel.appendChild(wrapper);

                if (i === centerIndex) {
                    wrapper.classList.add('center');
                }
            }
        }

        function moveSlide(direction) {
            currentIndex = (currentIndex + direction + images.length) % images.length;
            renderCarousel();
        }

        // Maak moveSlide globaal sodat <button onclick="moveSlide(1)"> dit kan roep
        window.moveSlide = moveSlide;

        // Eerste render
        renderCarousel();

        // Outo-scroll
        let autoScroll = setInterval(() => moveSlide(1), 4000);

        // Hover stop/start
        const parent = carousel.parentElement;
        if (parent) {  // ekstra check – dit was lyn 170 wat crash
            parent.addEventListener('mouseenter', () => clearInterval(autoScroll));
            parent.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => moveSlide(1), 4000);
            });
        }
    } else {
        console.log("Geen carousel op hierdie bladsy nie – slaan oor");
    }

//  ----------------------------------- BESTELVORM -----------------------------------
    function toggleAddressField() {
        const option = document.getElementById('deliveryOption').value;
        const addressGroup = document.getElementById('addressGroup');
        const addressField = document.getElementById('deliveryAddress');

        if (option === 'deliver') {
            addressGroup.style.display = 'block';
            addressField.required = true;
        } else {
            addressGroup.style.display = 'none';
            addressField.required = false;
            addressField.value = ''; // Maak skoon as self-afhaal gekies word
        }
    }

    function handleOrderSubmit(e) {
        e.preventDefault();

        const deliveryOption = document.getElementById('deliveryOption').value;
        let message = "Bestelling suksesvol geplaas!\n\n";

        if (deliveryOption === 'deliver') {
            const address = document.getElementById('deliveryAddress').value.trim();
            if (!address) {
                alert("Verskaf asseblief 'n afleweringsadres wanneer jy aflewering kies.");
                return;
            }
            message += "Afleweringsopsie: Aflewering\nAdres: " + address + "\n\n";
        } else if (deliveryOption === 'self') {
            message += "Afleweringsopsie: Self-afhaal\n\n";
        }

        alert(message + "(Dit is 'n simulasie vir demonstrasie)");
        document.getElementById('orderForm').reset();
        toggleAddressField(); // Maak adresveld toe na reset
    }

// =====================================================================
// VOORRAADBESTUUR - Slegs as die tabel bestaan, sodat js nie crash
// =====================================================================
    const inventoryBodyElement = document.getElementById('inventoryBody');

    if (inventoryBodyElement) {
        console.log("Voorraad tabel gevind – begin voorraad-logika");

        function updateStockStatus() {
            const rows = document.querySelectorAll('#inventoryBody tr');
            rows.forEach(row => {
                const qty = parseInt(row.dataset.qty) || 0;
                const reorder = parseInt(row.dataset.reorder) || 0;
                const qtyCell = row.cells[2];
                const statusCell = row.cells[5];

                if (!isNaN(qty) && !isNaN(reorder) && qty < reorder) {
                    qtyCell.classList.add('low-stock');
                    statusCell.innerHTML = '<span class="status-low">LAAG – Bestel!</span>';
                } else {
                    qtyCell.classList.remove('low-stock');
                    statusCell.innerHTML = 'Goed';
                }
            });
        }

        // Globale funksies vir onclick
        window.addInventory = function() {
            const item = prompt("Item naam:")?.trim() || "Nuwe item";
            const category = prompt("Kategorie:")?.trim() || "Voer";
            const qty = parseInt(prompt("Hoeveelheid:", "10") || "10") || 10;
            const unit = prompt("Eenheid:")?.trim() || "stuks";
            const reorder = parseInt(prompt("Herbestel by:", "5") || "5") || 5;

            const tr = document.createElement('tr');
            tr.dataset.item = item;
            tr.dataset.category = category;
            tr.dataset.qty = qty;
            tr.dataset.unit = unit;
            tr.dataset.reorder = reorder;

            tr.innerHTML = `
                <td>${item}</td>
                <td>${category}</td>
                <td>${qty}</td>
                <td>${unit}</td>
                <td>${reorder}</td>
                <td>Goed</td>
                <td><button onclick="deleteInventory(this)" style="color:#dc2626; background:none; border:none; cursor:pointer; font-size:1.2rem;"><i class="fas fa-trash"></i></button></td>
            `;

            inventoryBodyElement.appendChild(tr);
            updateStockStatus();
        };

        window.deleteInventory = function(button) {
            if (confirm("Verwyder hierdie item?")) {
                button.closest('tr')?.remove();
            }
        };

        window.filterInventory = function() {
            const input = document.getElementById('searchInv');
            if (!input) return;

            const val = input.value.toLowerCase().trim();
            const rows = document.querySelectorAll('#inventoryBody tr');

            rows.forEach(row => {
                const item = (row.dataset.item || '').toLowerCase();
                const cat = (row.dataset.category || '').toLowerCase();
                row.style.display = (item.includes(val) || cat.includes(val)) ? '' : 'none';
            });
        };

        // Begin
        updateStockStatus();
    } else {
        console.log("Geen voorraad tabel op hierdie bladsy nie – slaan oor");
    }

// =====================================================================
// --------------------- ------ Kontakvorm -----------------------------
// =====================================================================
    function handleSubmit(e) {
        e.preventDefault();
        alert("Boodskap suksesvol gestuur! (Simulasie vir projek)");
        document.getElementById('contactForm').reset();
    }