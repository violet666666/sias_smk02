import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Classes from "./KelasModel.js";

const { DataTypes } = Sequelize;

const Attendance = db.define('attendance', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

Users.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Users, { foreignKey: 'student_id' });

Classes.hasMany(Attendance, { foreignKey: 'class_id' });
Attendance.belongsTo(Classes, { foreignKey: 'class_id' });

export default Attendance;