-- =================================================================================================================
--                                          Highveld Boerdery Databasis
-- ----------------------------------------------------------------------------------------------------------------
--                               Tabel 1: VOORRAAD_ITEM (voorraadbeheer blad tabel)
--                               Tabel 2: VOORRAAD_TRANSAKSIE (transaksies vir CRUD)
--                               Tabel 3: GEBRUIKER (Gebruikerregistrasie en bestuur)
--                               Tabel 4: MANDJIE_ITEM
--                               Tabel 5: BESTELLING (Hoof bestelling)
--                               Tabel 6: BESTELLING_ITEM (Items binne elke bestelling)
-- =================================================================================================================

CREATE TABLE VOORRAAD_ITEM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit TEXT NOT NULL,
    reorder_level INTEGER NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),        -- Herbestelpunt (minimum voordat waarskuwing wys)
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VOORRAAD_TRANSAKSIE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('add', 'adjust', 'sell')),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES VOORRAAD_ITEM(id)
);

CREATE TABLE GEBRUIKER (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MANDJIE_ITEM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES GEBRUIKER(id)
);

CREATE TABLE BESTELLING (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_label TEXT,
    total REAL NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'Geplaas',
    FOREIGN KEY (user_id) REFERENCES GEBRUIKER(id)
);

CREATE TABLE BESTELLING_ITEM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES BESTELLING(id)
);

-- Voorbeeld data vir Voorraad (VOORRAAD_ITEM)
INSERT INTO VOORRAAD_ITEM VALUES
('Lusern hooi', 'Voer', 45, 'bale', 30),
('Dorper entstof', 'Medisyne', 8, 'bottels', 15),
('Skeertoerusting', 'Toerusting', 3, 'stelle', 2),
('Voerkrippe', 'Toerusting', 12, 'stuks', 10),
('Merino wol', 'Produk', 120, 'kg', 50),
