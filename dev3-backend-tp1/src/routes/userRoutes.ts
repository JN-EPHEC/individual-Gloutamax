import { Router, Request, Response } from "express";
import { squelize } from '../config/database';
import { User } from '../models/User';

// Création du router 
const router = Router();

// == DEFINITION DES METHODES DE REFACTORING API ==
// Get : Récupération de tous les utilisateurs
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(error) {
        res.status(500).json(({ message: "Erreur lors de la récupération", error}));
    }
});

// Post : Création d'un utilisateur
router.post('/', async (req: Request, res: Response) => {
    try {
        const {firstName, lastName} = req.body;
        const newUser = await User.create({ firstName, lastName });
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({ message: "Erreur lors de la création", error});
    }
});

// Delete/:id : Suppresion d'un utilsateur par son ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({
            where: { id: id}
        });

        if (deleted) {
            res.status(204).json({message: `Utilisateur avec l'ID ${id} supprimé.` });
        } else {
            res.status(404).json({message: "Utilisateur non trouvé. "})
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la suppresion", error});
    }
});

export default router;  