import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 
}

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function

    // const { id, cost, description } = req.body;
    const { id } = req.params;
    // console.log(id);

    if (!id) {
        return res.status(400).send({ error: "Missing required id" });
    }

    await db.all('SELECT * FROM expenses WHERE id=?;', [id], (err:any, rows:any) => {
        if (err) {
            return res.status(400).send({ error: `Error in finding expense, + ${err}` });
        } else if (!rows) {
            return res.status(400).send({ error: `id doesn't exist` });
        }
    });

    try {
        await db.run('DELETE FROM expenses WHERE id=?;', [id]);
        res.status(200).send(id);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        let expenses = await db.all('SELECT * FROM expenses;');     
        res.status(200).send({ "data": expenses });

    } catch (error) {
        res.status(400).send({ error: `Expenses could not be retrieved, + ${error}` });
    }
}