import express, {Application, Request, Response} from 'express'; 

const app: Application = express(); 
const port = 3000; 

app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API.");
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});