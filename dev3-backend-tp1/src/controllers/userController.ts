import type { Request, Response, NextFunction} from "express";
import User from "../models/User"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error){
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {firstName, lastName} = req.body; 
        const newUser = await User.create({ firstName, lastName});
        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};