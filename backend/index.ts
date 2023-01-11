import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Queries } from "./tools/queries";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const queries = new Queries();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", (req: Request, res: Response) => {
  queries.getUsers(req, res);
});
app.get("/users/:id", (req: Request, res: Response) => {
  queries.getUserById(req, res);
});
app.post("/users", (req: Request, res: Response) => {
  queries.createUser(req, res);
});
app.put("/users/:id", (req: Request, res: Response) => {
  queries.updateUser(req, res);
});
app.delete("/users/:id", (req: Request, res: Response) => {
  queries.deleteUser(req, res);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
