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

  router.get("/users", (req: Request, res: Response) => {
    res.send(queries.getUsers(req, res));
  });
  router.get("/users/:id", (req: Request, res: Response) => {
    queries.getUserById(req, res);
  });
  router.post("/users", (req: Request, res: Response) => {
    queries.createUser(req, res);
  });
  router.put("/users/:id", (req: Request, res: Response) => {
    queries.updateUser(req, res);
  });
  router.delete("/users/:id", (req: Request, res: Response) => {
    queries.deleteUser(req, res);
  });

  return router;
};
