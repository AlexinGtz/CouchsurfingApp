import { Request, Response } from "express"
import { DatabaseConnection } from "../Database/database";

const db = new DatabaseConnection();

export const updateUser = (req: Request, res: Response) => {
    const user = req.body

    if(!user) {
        res.status(400);
        res.send('User not present in body')
        return;
    }

    if(!user?.id) {
        res.status(400);
        res.send('User Id not provided in body')
        return;
    }

    const dbResponse = db.update(user);

    res.send({
        message: 'Succesfully Updated user',
        dbResponse
    });
}