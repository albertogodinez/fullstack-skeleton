import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import { Queries } from "./modules/Queries";
import users from "./routes/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const queries: Queries = new Queries();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/users", users(queries));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
