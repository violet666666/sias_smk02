import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Kelas = db.define('kelas', {
    uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    deskripsi: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tahun: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    periodeAwal: {
        type: Sequelize.DATE,
        allowNull: true
    },
    periodeAkhir: {
        type: Sequelize.DATE,
        allowNull: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Kelas;