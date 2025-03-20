# Arduino-Xbee
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

Ceci est un projet de fin d'année de STI2D dont le but est de créer un système d'éclairage urbain connecté. Le projet utilise la technologie Xbee avec un Arduino et une API pour gérer et surveiller l'état des lampadaires.

## Table des matières

- [Installation](#installation)
- [Matériel nécessaire](#matériel-nécessaire)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Contribution](#contribution)
- [Licence](#licence)

## Installation

1. Clonez le dépôt sur votre machine locale :
    ```bash
    git clone https://github.com/CrepesSauvages/Arduino-Xbee.git
    ```

2. Installez les dépendances nécessaires pour le serveur :
    ```bash
    npm i dotenv mysql2 cors socket.io http express
    ```

## Matériel nécessaire

- Arduino Uno
- Module Xbee S1
- Ethernet Shield pour Arduino
- Câbles de connexion
- Alimentation pour Arduino

## Configuration

1. **Arduino :**
   - Connectez le module Xbee à l'Arduino en utilisant les broches RX et TX.
   - Connectez l'Ethernet Shield à l'Arduino.
   - Téléversez le code Arduino depuis le fichier `arduino_code.ino` sur votre Arduino en utilisant l'IDE Arduino.

2. **Serveur API :**
   - Créez un fichier `.env` dans le répertoire `server` et configurez les variables d'environnement suivantes :
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=root
     DB_NAME=streetlight_db
     PORT_API=3000
     ```
   - Démarrez le serveur :
     ```bash
     npm start
     ```

3. **Base de données :**
   - Créez la base de données et les tables nécessaires en utilisant le script SQL fourni :
     ```sql
     -- Création de la base de données
     CREATE DATABASE IF NOT EXISTS streetlight_db;
     USE streetlight_db;

     -- Table des lampadaires
     CREATE TABLE IF NOT EXISTS lampadaires (
         id INT AUTO_INCREMENT PRIMARY KEY,
         etat VARCHAR(50) NOT NULL,
         status VARCHAR(50) NOT NULL,
         date_derniere_modif DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );
     ```

## Utilisation

1. Allumez l'Arduino et assurez-vous qu'il est connecté à votre réseau local via l'Ethernet Shield.
2. Ouvrez un navigateur web et accédez à l'interface de l'API sur `http://localhost:3000`.
3. Utilisez les points de terminaison API pour gérer et surveiller les lampadaires.

## API

### Endpoints disponibles

- `POST /api/xbee-data` : Recevoir les données du Xbee.
  - Exemple de corps de requête :
    ```json
    {
      "data": "id=1; etat=off; status=error"
    }
    ```

## Contribution

Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Validez vos modifications (`git commit -m 'Ajouter ma fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
