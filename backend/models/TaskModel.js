import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: false
});

export default Task;