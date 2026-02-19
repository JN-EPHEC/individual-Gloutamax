import express, {Application, Request, Response} from 'express'; 
import userRoutes from "./routes/userRoutes"; // Importation de la route user
import { sequelize } from "./config/database";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './config/swagger';
import cors from 'cors';

const app: Application = express(); 
const port = 3000; 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json()); 

app.use(cors());

app.use(express.static('public')); 

app.use(requestLogger); 

app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API.");
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
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

// Mise en place du routeur, avec toutes les routes de userRoutes qui utilisent '/api/users'
app.use('/api/users', userRoutes);

async function startApp() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à SQLite établie');
        await sequelize.sync({ alter: true});
        console.log("Synchronisation terminé");

        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erreur de connexion avec SQlite:', error);
    }
};

app.use(errorHandler);

startApp();