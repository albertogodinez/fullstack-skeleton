import { Request, Response } from "express";
import { Pool, QueryResult } from "pg";

export class Queries {
  _db: string | undefined;
  _dbUser: string | undefined;
  _dbHost: string | undefined;
  _dbPassword: string | undefined;
  _dbPort: number | undefined;
  _pool!: Pool;

  constructor() {
    this._initializeDatabase();
  }

  private _initializeDatabase() {
    this._db = process.env.DATABASE;
    this._dbUser = process.env.DATABASE_USER;
    this._dbHost = process.env.DATABASE_HOST;
    this._dbPassword = process.env.DATABASE_PASSWORD;
    this._dbPort = Number(process.env.DATABASE_PORT);

    if (
      !this._db ||
      !this._dbUser ||
      !this._dbHost ||
      !this._dbPassword ||
      !this._dbPort
    ) {
      // handle the case where any of the variables is undefined
      throw new Error("Not able to connect to database");
    }

    this._pool = new Pool({
      user: this._dbUser,
      host: this._dbHost,
      database: this._db,
      password: this._dbPassword,
      port: this._dbPort,
    });
  }

  async getUsers(request: Request, response: Response) {
    try {
      const result = await this._pool.query(
        "SELECT * FROM users ORDER BY id ASC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    try {
      const results = await this._pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return results.rows;
    } catch (error) {
      throw error;
    }
  }

  async createUser(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const results = await this._pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2)",
        [name, email]
      );
      return name;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    try {
      const results = await this._pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3",
        [name, email, id]
      );
      return id;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    try {
      const results = this._pool.query(
        "DELETE FROM users WHERE id = $1",
        [id],
        (error: Error, results: QueryResult) => {
          if (error) {
            throw error;
          }
          return id;
        }
      );
      return id;
    } catch (error) {
      throw error;
    }
  }
}
