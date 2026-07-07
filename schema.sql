-- Run this once against your MySQL database:
--   mysql -u root -p zexo_perfume < schema.sql

CREATE DATABASE IF NOT EXISTS zexo_perfume;
USE zexo_perfume;

-- ==========================================================
-- better-auth core tables (email + password auth)
-- ==========================================================
CREATE TABLE IF NOT EXISTS user (
  id            VARCHAR(36) PRIMARY KEY,
  name          VARCHAR(255),
  email         VARCHAR(255) NOT NULL UNIQUE,
  emailVerified BOOLEAN DEFAULT FALSE,
  image         VARCHAR(512),
  role          VARCHAR(20) NOT NULL DEFAULT 'user',
  createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
  id        VARCHAR(36) PRIMARY KEY,
  userId    VARCHAR(36) NOT NULL,
  token     VARCHAR(255) NOT NULL UNIQUE,
  expiresAt DATETIME NOT NULL,
  ipAddress VARCHAR(64),
  userAgent VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
  id                    VARCHAR(36) PRIMARY KEY,
  userId                VARCHAR(36) NOT NULL,
  accountId             VARCHAR(255) NOT NULL,
  providerId            VARCHAR(255) NOT NULL,
  accessToken           TEXT,
  refreshToken          TEXT,
  idToken               TEXT,
  accessTokenExpiresAt  DATETIME,
  refreshTokenExpiresAt DATETIME,
  scope                 VARCHAR(255),
  password              VARCHAR(255),
  createdAt             DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt             DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification (
  id         VARCHAR(36) PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  value      VARCHAR(255) NOT NULL,
  expiresAt  DATETIME NOT NULL,
  createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- Shop tables
-- ==========================================================
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  name        VARCHAR(255) NOT NULL,
  subtitle    VARCHAR(255),
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  image_url   VARCHAR(512) NOT NULL,
  accent      VARCHAR(32) DEFAULT 'gold',
  in_stock    BOOLEAN DEFAULT TRUE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  order_number    VARCHAR(20) NOT NULL UNIQUE,
  user_id         VARCHAR(36) NULL,
  full_name       VARCHAR(255) NOT NULL,
  phone           VARCHAR(32) NOT NULL,
  email           VARCHAR(255),
  address         TEXT NOT NULL,
  city            VARCHAR(120) NOT NULL,
  notes           TEXT,
  payment_method  VARCHAR(32) NOT NULL DEFAULT 'cod',
  payment_status  VARCHAR(32) NOT NULL DEFAULT 'unpaid',
  stripe_session_id VARCHAR(255) NULL,
  status          VARCHAR(32) NOT NULL DEFAULT 'pending',
  subtotal        DECIMAL(10,2) NOT NULL,
  delivery_fee    DECIMAL(10,2) NOT NULL DEFAULT 0,
  total           DECIMAL(10,2) NOT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    INT NOT NULL,
  product_id  INT NOT NULL,
  name        VARCHAR(255) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  quantity    INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ==========================================================
-- Seed products (50 items — see full INSERT block below)
-- ==========================================================
INSERT INTO products (slug, name, subtitle, description, price, image_url, accent) VALUES
('elegance-noir', 'ELEGANCE NOIR', 'Signature Collection', 'A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.', 65.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('royal-orchid', 'ROYAL ORCHID', 'Signature Collection', 'A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.', 76.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('divine-bliss', 'DIVINE BLISS', 'Signature Collection', 'A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.', 87.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('midnight-oud', 'MIDNIGHT OUD', 'Signature Collection', 'A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.', 98.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('golden-vanilla', 'GOLDEN VANILLA', 'Signature Collection', 'A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.', 109.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('velvet-mystique', 'VELVET MYSTIQUE', 'Signature Collection', 'A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.', 120.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('imperial-bloom', 'IMPERIAL BLOOM', 'Signature Collection', 'A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.', 131.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('mystic-saffron', 'MYSTIC SAFFRON', 'Signature Collection', 'A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.', 142.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('eternal-charm', 'ETERNAL CHARM', 'Signature Collection', 'A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.', 153.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('noble-musk', 'NOBLE MUSK', 'Signature Collection', 'A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.', 74.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('amber-jasmine', 'AMBER JASMINE', 'Signature Collection', 'A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.', 85.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('crimson-grace', 'CRIMSON GRACE', 'Signature Collection', 'A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.', 96.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('silk-essence', 'SILK ESSENCE', 'Signature Collection', 'A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.', 107.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('radiant-velvet', 'RADIANT VELVET', 'Signature Collection', 'A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.', 118.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('opulent-desire', 'OPULENT DESIRE', 'Signature Collection', 'A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.', 129.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('serene-rose', 'SERENE ROSE', 'Signature Collection', 'A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.', 140.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('aurora-dawn', 'AURORA DAWN', 'Signature Collection', 'A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.', 151.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('celestial-aura', 'CELESTIAL AURA', 'Signature Collection', 'A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.', 72.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('timeless-amber', 'TIMELESS AMBER', 'Signature Collection', 'A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.', 83.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('enchanted-dusk', 'ENCHANTED DUSK', 'Signature Collection', 'A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.', 94.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('sapphire-noir', 'SAPPHIRE NOIR', 'Signature Collection', 'A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.', 105.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('ivory-orchid', 'IVORY ORCHID', 'Signature Collection', 'A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.', 116.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('onyx-bliss', 'ONYX BLISS', 'Signature Collection', 'A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.', 127.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('platinum-oud', 'PLATINUM OUD', 'Signature Collection', 'A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.', 138.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('whisper-vanilla', 'WHISPER VANILLA', 'Signature Collection', 'A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.', 149.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('elegance-mystique', 'ELEGANCE MYSTIQUE', 'Signature Collection', 'A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.', 70.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('royal-bloom', 'ROYAL BLOOM', 'Signature Collection', 'A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.', 81.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('divine-saffron', 'DIVINE SAFFRON', 'Signature Collection', 'A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.', 92.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('midnight-charm', 'MIDNIGHT CHARM', 'Signature Collection', 'A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.', 103.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('golden-musk', 'GOLDEN MUSK', 'Signature Collection', 'A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.', 114.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('velvet-jasmine', 'VELVET JASMINE', 'Signature Collection', 'A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.', 125.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('imperial-grace', 'IMPERIAL GRACE', 'Signature Collection', 'A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.', 136.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('mystic-essence', 'MYSTIC ESSENCE', 'Signature Collection', 'A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.', 147.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('eternal-velvet', 'ETERNAL VELVET', 'Signature Collection', 'A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.', 68.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('noble-desire', 'NOBLE DESIRE', 'Signature Collection', 'A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.', 79.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('amber-rose', 'AMBER ROSE', 'Signature Collection', 'A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.', 90.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('crimson-dawn', 'CRIMSON DAWN', 'Signature Collection', 'A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.', 101.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('silk-aura', 'SILK AURA', 'Signature Collection', 'A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.', 112.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('radiant-amber', 'RADIANT AMBER', 'Signature Collection', 'A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.', 123.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('opulent-dusk', 'OPULENT DUSK', 'Signature Collection', 'A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.', 134.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('serene-noir', 'SERENE NOIR', 'Signature Collection', 'A captivating fragrance blending oud, amber and black pepper, crafted for those who appreciate refined luxury.', 145.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('aurora-orchid', 'AURORA ORCHID', 'Signature Collection', 'A captivating fragrance blending saffron, vanilla and oud wood, crafted for those who appreciate refined luxury.', 66.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('celestial-bliss', 'CELESTIAL BLISS', 'Signature Collection', 'A captivating fragrance blending jasmine, white musk and orchid, crafted for those who appreciate refined luxury.', 77.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('timeless-oud', 'TIMELESS OUD', 'Signature Collection', 'A captivating fragrance blending bergamot, rose and sandalwood, crafted for those who appreciate refined luxury.', 88.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber'),
('enchanted-vanilla', 'ENCHANTED VANILLA', 'Signature Collection', 'A captivating fragrance blending vetiver, cedar and citrus, crafted for those who appreciate refined luxury.', 99.99, 'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?q=80&w=800&auto=format&fit=crop', 'rose'),
('sapphire-mystique', 'SAPPHIRE MYSTIQUE', 'Signature Collection', 'A captivating fragrance blending tuberose, iris and patchouli, crafted for those who appreciate refined luxury.', 110.99, 'https://images.unsplash.com/photo-1588163282942-bdc63a1d57ab?q=80&w=800&auto=format&fit=crop', 'gold'),
('ivory-bloom', 'IVORY BLOOM', 'Signature Collection', 'A captivating fragrance blending cardamom, leather and tonka bean, crafted for those who appreciate refined luxury.', 121.99, 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=800&auto=format&fit=crop', 'noir'),
('onyx-saffron', 'ONYX SAFFRON', 'Signature Collection', 'A captivating fragrance blending pink pepper, peony and musk, crafted for those who appreciate refined luxury.', 132.99, 'https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=800&auto=format&fit=crop', 'ivory'),
('platinum-charm', 'PLATINUM CHARM', 'Signature Collection', 'A captivating fragrance blending fig, moss and amberwood, crafted for those who appreciate refined luxury.', 143.99, 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=800&auto=format&fit=crop', 'black'),
('whisper-musk', 'WHISPER MUSK', 'Signature Collection', 'A captivating fragrance blending lavender, vanilla and cashmere wood, crafted for those who appreciate refined luxury.', 154.99, 'https://images.unsplash.com/photo-1601284687405-78283d7e3b2d?q=80&w=800&auto=format&fit=crop', 'amber')
ON DUPLICATE KEY UPDATE name = VALUES(name);
