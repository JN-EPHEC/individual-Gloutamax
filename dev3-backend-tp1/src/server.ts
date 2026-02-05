import express, {Application, Request, Response} from 'express'; 
import userRoutes from "./routes/userRoutes"; // Importation de la route user

const app: Application = express(); 
const port = 3000; 

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