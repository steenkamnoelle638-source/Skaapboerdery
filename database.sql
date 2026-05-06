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
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit TEXT NOT NULL,
    reorder_level INTEGER NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),        -- Herbestelpunt (minimum voordat waarskuwing wys)
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- localStorage sleutel: highveld_transactions
CREATE TABLE VOORRAAD_TRANSAKSIES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('add', 'adjust', 'sell')),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (item_id) REFERENCES VOORRAAD_ITEMS(id)
);

-- localStorage sleutel: highveld_users
CREATE TABLE GEBRUIKERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- localStorage sleutel: highveld_user (huidige ingeteken gebruiker)
CREATE TABLE GEBRUIKER_SESSIES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_started DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    FOREIGN KEY (user_id) REFERENCES GEBRUIKERS(id)
);

-- localStorage sleutel: highveld_cart
CREATE TABLE MANDJIE_ITEMS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES GEBRUIKERS(id)
);

-- localStorage sleutel: highveld_orders
CREATE TABLE BESTELLINGS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_label TEXT,
    total REAL NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'Geplaas',
    FOREIGN KEY (user_id) REFERENCES GEBRUIKERS(id)
);

-- Deel van localStorage sleutel: highveld_orders (items binne elke bestelling)
CREATE TABLE BESTELLING_ITEMS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES BESTELLINGS(id)
);

CREATE TABLE VERKOPE_REKORDS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_date DATE NOT NULL,
    product_name TEXT NOT NULL,
    quantity_sold INTEGER NOT NULL CHECK (quantity_sold >= 0),
    total_amount REAL NOT NULL CHECK (total_amount >= 0),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- localStorage sleutel: highveld_calendar_events
CREATE TABLE KALENDER_GEBEURE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_date DATE NOT NULL,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Kontakvorm simulasie: tans word navrae net met 'n suksesboodskap gewys, maar hierdie tabel wys hoe dit gestoor sou word.
CREATE TABLE KONTAK_NAVRAE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('Navraag', 'Besoek')),
    message TEXT,
    visit_date DATE,
    visit_time TIME,
    newsletter_opt_in INTEGER NOT NULL DEFAULT 0 CHECK (newsletter_opt_in IN (0, 1)),
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

-- Voorbeeld data vir kalendergebeure (KALENDER_GEBEURE)
INSERT INTO KALENDER_GEBEURE (event_date, title, event_type, details) VALUES
('2026-05-08', 'Skeerbeplanning', 'Produksie', 'Kontroleer skeertoerusting en bevestig skeerspan.'),
('2026-05-12', 'Entstofdag', 'Gesondheid', 'Dorper- en Merino-lammers kry geskeduleerde entstowwe.'),
('2026-05-18', 'Voerbestelling', 'Voorraad', 'Bestel lusern en mineraallekke voordat voorraad laag raak.'),
('2026-05-26', 'Markdag', 'Verkope', 'Lewende lammers en wol word vir kopers voorberei.'),
('2026-06-03', 'Veeartsbesoek', 'Gesondheid', 'Kwartaal-kontrole van tropgesondheid en parasietbeheer.'),
('2026-06-14', 'Rotasie-weiding skuif', 'Bestuur', 'Skuif trop na volgende kamp volgens weidingsplan.');