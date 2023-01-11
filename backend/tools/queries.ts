import { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';

const db: string | undefined = process.env.DATABASE;
const dbUser: string | undefined = process.env.DATABASE_USER;
const dbHost: string | undefined = process.env.DATABASE_HOST;
const dbPassword: string | undefined = process.env.DATABASE_PASSWORD;
const dbPort: number | undefined = Number(process.env.DATABASE_PORT);

if(!db || !dbUser || !dbHost || !dbPassword || !dbPort) {
  // handle the case where any of the variables is undefined
  throw new Error('Not able to connect to database')
}

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: db,
  password: dbPassword,
  port: dbPort,
});

const getUsers = (request: Request, response: Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error: Error, results: QueryResult) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request: Request, response: Response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error: Error, results: QueryResult) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request: Request, response: Response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error: Error, results: QueryResult) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request: Request, response: Response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error: Error, results: QueryResult) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request: Request, response: Response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error: Error, results: QueryResult) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}