import express, { Request, Response, Router } from "express";
import { Queries } from "../modules/Queries";

export default (queries: Queries) => {
  const router = Router();

  // middleware that is specific to this router
  router.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      next();
    }
  );

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await queries.getUsers(req, res);
      res.status(200).json(users);
    } catch (error) {
      throw error;
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await queries.getUserById(req, res);
      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const name = await queries.createUser(req, res);
      res.status(201).send(`User ${name} was successfully added`);
    } catch (error) {
      throw error;
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const id = await queries.updateUser(req, res);
      res.status(200).send(`User modified with ID: ${id}`);
    } catch (error) {
      throw error;
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id = await queries.deleteUser(req, res);
      res.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
      throw error;
    }
  });

  return router;
};
