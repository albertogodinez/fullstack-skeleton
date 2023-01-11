import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/users", users(queries));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
