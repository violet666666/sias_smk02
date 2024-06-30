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
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async () => {
    await db.sync();
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

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server aktif dan berjalan di port', process.env.APP_PORT);
});