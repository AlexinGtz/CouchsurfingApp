import { Request, Response } from "express"
import { DatabaseConnection } from "../Database/database";

const db = new DatabaseConnection();

export const getUser = (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = db.find(userId);

    if(!user) {
        res.status(404);
        res.send('User not found in the DB');
        return;
    }

    res.status(200);
    res.send(user);
}