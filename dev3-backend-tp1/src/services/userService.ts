import { User } from "../models/User";

export const getUserById = async (id: Number) => {
    // .findByPk = Find By Primary Key
    return await User.findByPk(id); 
}

export const updateUser =  async (id: Number, data: { firstName?: string, lastName?: string}) => {
    const [affectedCount] = await User.update(data, {
        where: {id: id }
    });

    if (affectedCount === 0) return null;

    // Récupération de l'utilisateur mis à jour pour le renvoyer
    return await User.findByPk(id); 
}