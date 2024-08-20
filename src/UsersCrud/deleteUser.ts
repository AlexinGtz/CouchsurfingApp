import { Request, Response } from "express"
import { DatabaseConnection } from "../Database/database";

const db = new DatabaseConnection();

export const deleteUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    db.delete(userId);

    res.status(200)
    res.send(`User ${userId} deleted succesfully`);
}