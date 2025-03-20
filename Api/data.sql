CREATE DATABASE IF NOT EXISTS streetlight_db;
USE streetlight_db;

-- Table des lampadaires
CREATE TABLE IF NOT EXISTS lampadaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    etat VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date_derniere_modif DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);