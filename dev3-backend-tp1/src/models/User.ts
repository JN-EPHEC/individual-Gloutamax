import { sequelize } from '../config/database'
import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Lecteur",
        values: ["Lecteur", "Editeur", "Admin"]
    }
}, { tableName: 'User', timestamps: false});