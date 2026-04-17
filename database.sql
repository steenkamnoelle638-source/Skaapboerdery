-- =================================================================================================================
--                                          Highveld Boerdery Databasis
-- ----------------------------------------------------------------------------------------------------------------
--                               Tabel 1: VOORRAAD_ITEMS (produkte blad tabel)
--                               Tabel 2: VERKOPE_REKORDS (verkope en rekords blad tabel)
-- =================================================================================================================

CREATE TABLE VOORRAAD_ITEMS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER DEFAULT 0,
    unit TEXT NOT NULL,
    reorder_level INTEGER DEFAULT 5,        -- Herbestelpunt (minimum voordat waarskuwing wys)
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VERKOPE_REKORDS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_date DATE NOT NULL,
    product_name TEXT NOT NULL,
    quantity_sold INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Voorbeeld data vir Voorraad (VOORRAAD_ITEMS)
INSERT INTO VOORRAAD_ITEMS (item_name, category, quantity, unit, reorder_level) VALUES
('Lusern hooi', 'Voer', 45, 'bale', 30),
('Dorper entstof', 'Medisyne', 8, 'bottels', 15),
('Skeertoerusting', 'Toerusting', 3, 'stelle', 2),
('Voerkrippe', 'Toerusting', 12, 'stuks', 10),
('Merino wol', 'Produk', 120, 'kg', 50),
('Dorper lammers', 'Lewende diere', 35, 'stuk', 10);

-- Voorbeeld data vir Verkope (VERKOPE_REKORDS) - pas by verkope_en_rekord.html
INSERT INTO VERKOPE_REKORDS (sale_date, product_name, quantity_sold, total_amount, notes) VALUES
('2026-01-15', 'Wol (per kg)', 5, 800.00, 'Wol verkoop'),
('2026-01-16', 'Lewende Lammer (small/meduim)', 2, 4400.00, ''),
('2026-01-18', 'Skaapvleis (kg)', 7, 665.00, ''),
('2026-01-18', 'Skaap (volwasse)', 1, 3000.00, ''),
('2026-01-22', 'Skaapmis (per sak / 50 kg)', 3, 255.00, ''),
('2026-01-25', 'Skaapvet / talg (per kg)', 1, 73.00, '');