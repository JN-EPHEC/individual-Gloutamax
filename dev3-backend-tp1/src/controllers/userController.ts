import type { Request, Response } from "express";
import User from "../models/User"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({ error: (error as any).message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName} = req.body; 
        const newUser = await User.create({ firstName, lastName});
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({ message: "Erreur lors de la création", error}); 
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({
            where: { id:id}
        });

        if (deleted) {
            res.status(204).json({message: `Utilisateur avec l'ID ${id} supprimé.`});
        } else {
            res.status(404).json({message:"Utilisateur non trouvé."})
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la suppresion", error});
    }
};