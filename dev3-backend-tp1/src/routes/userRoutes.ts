import { Router, Request, Response } from "express";

// Création du router 
const router = Router();

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

// Définition de la route
// Ici on met juste '/' car le routeur sera définit sur '/api/users' dans server.ts
router.get("/", (req: Request, res: Response) => {
    res.json(users); 
})

// Exportation du router pour l'exporter ailleurs 
export default router;  