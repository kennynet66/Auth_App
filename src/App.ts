import Express from "express";
import Dotenv from "dotenv";
import Mongoose from "mongoose";
import UserRoutes from "./Routes/user.Routes";
import authRoutes from "./Routes/auth.Routes";

Dotenv.config({ debug: false });

const App = Express();
const Port = process.env.PORT;
const MongoUrl: string = process.env.MONGO_URL as string;

App.use(Express.json());

App.use("/api", UserRoutes, authRoutes);

Mongoose.connect(MongoUrl)
    .then(() => {
        console.log(`Connected to MongoDb`);
        App.listen(Port, () => {
            console.log(`App is listening on port ${Port}`);
        });
    }).catch((error) => {
        console.log(error)
    });
