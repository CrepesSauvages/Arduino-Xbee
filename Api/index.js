import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: false
    }
});
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
}));
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "streetlight_db",
});

app.post('/api/xbee-data', async (req, res) => {
    try {
        const { data } = req.body;
        const dataArray = data.split(';');
        let id, etat, status;
        console.log("Données reçues avant Si:", dataArray);

        dataArray.forEach(element => {
            const [key, value] = element.split('=');
            switch (key.trim().toLowerCase()) {
                case 'id':
                    id = value.trim();
                    break;
                case 'etat':
                    etat = value.trim();
                    break;
                case 'status':
                    status = value.trim();
                    break;
            }
        });
        if (id && etat && status) {
            console.log("Données reçues après Si:", id, etat, status);
            const date_derniere_modif = new Date();
            await pool.query(
                'INSERT INTO lampadaires (id, etat, status, date_derniere_modif) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE etat = VALUES(etat), status = VALUES(status), date_derniere_modif = VALUES(date_derniere_modif)',
                [id, etat, status, date_derniere_modif]
            );
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Les champs id, etat et status sont obligatoires' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la réception des données du XBee' });
    }
});