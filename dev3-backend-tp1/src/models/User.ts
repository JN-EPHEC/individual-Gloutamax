import { sequelize } from '../config/database'
import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        // Utilise ENUM pour restreindre les choix, ou reste en STRING
        type: DataTypes.ENUM("Étudiant", "Délégué", "Admin", "Lecteur", "Editeur"), 
        allowNull: false,
        defaultValue: "Étudiant"
    }
}, { 
    tableName: 'User', 
    timestamps: true
});