import express, { Application, Request, Response } from 'express'; 
import userRoutes from "./routes/userRoutes"; // Importation de la route user
import { sequelize } from "./config/database";
import { User } from "./models/User";

const app: Application = express(); 
const port = 3000; 

app.use(express.json()); 
app.use(express.static('public')); 

app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API.");
});

const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data', (req: Request, res: Response) => {
    res.json(etudiants); 
}); 

app.get('/api/hello/:name', (req: Request, res: Response) => {
    res.json({"message": `Bonjour ${req.params.name}`, "timestamp": new Date().toISOString()});
});

app.use('/api/users', userRoutes);

async function startApp() {
    try {
        // 1. Connexion
        await sequelize.authenticate();
        console.log('Connexion à SQLite établie');

        await sequelize.sync({ force: true });
        console.log("Synchronisation terminée (Table réinitialisée)");

        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Erreur de connexion avec SQlite:', error);
    }
};

startApp();