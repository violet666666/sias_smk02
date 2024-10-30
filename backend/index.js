import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import KelasRoute from "./routes/KelasRoute.js";
import GuruRoute from "./routes/GuruRoute.js";
import SiswaRoute from "./routes/SiswaRoute.js";
import ParentRoute from "./routes/ParentRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import User from "./models/UserModel.js";
import Kelas from "./models/KelasModel.js";
import TaskRoute from "./routes/TaskRoute.js";

dotenv.config();

const app = express();

// Define relationships
User.hasMany(Kelas);
Kelas.belongsTo(User);

// Many-to-Many relationship between Kelas and Students (User)
Kelas.belongsToMany(User, { 
    through: 'kelas_siswa',
    as: 'students',
    foreignKey: 'kelasId'
});
User.belongsToMany(Kelas, { 
    through: 'kelas_siswa',
    as: 'classes',
    foreignKey: 'studentId'
});

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// Sync database with force: false to prevent data loss
(async () => {
    try {
        await db.sync({ force: false });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(KelasRoute);
app.use(GuruRoute);
app.use(SiswaRoute);
app.use(ParentRoute);
app.use(AuthRoute);
app.use(AdminRoute);
app.use(TaskRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server aktif dan berjalan di port', process.env.APP_PORT);
});