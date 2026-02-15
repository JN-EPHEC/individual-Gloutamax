import { Router, Request, Response } from "express";
import * as userService from "../services/userService"; 
import { User } from "../models/User";

// Création du router 
const router = Router();

// == DEFINITION DES METHODES DE REFACTORING API ==
// Get : Récupération de tous les utilisateurs
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch(error) {
        res.status(500).json(({ message: "Erreur lors de la récupération", error}));
    }
});

// Get /:id : Récupérer les détails d'un utilisateur précis
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);

        if (!user) {
            // Validation : Si l'ID n'existe pas, on renvoie 404
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// Post : Création d'un utilisateur
router.post('/', async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, role} = req.body;
        const newUser = await User.create({ firstName, lastName, role });
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({ message: "Erreur lors de la création", error});
    }
})

// Put/:id : Mise à jour des informations d'un utilisateur (changer son role et son role)
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); 
        const { firstName, lastName } = req.body; 

        if (isNaN(id)) {
            res.status(400).json({ message: "ID invalide" });
        }

        const updatedUser = await userService.updateUser(id, { firstName, lastName} );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(updatedUser);
    } catch(error) {
        console.error("Détail de l'erreur côté serveur :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
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