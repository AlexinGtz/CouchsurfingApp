import { Request, Response } from "express"
import { DatabaseConnection } from "../Database/database";

const db = new DatabaseConnection();

export const createUser = (req: Request, res: Response) => {
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

    if(!user?.friends) {
        res.status(400);
        res.send('Friends not provided in body')
        return;
    }

    const dbResponse = db.create(user);

    if(!dbResponse) {
        res.status(403);
        res.send('User already exists in DB')
        return;
    }

    if(typeof dbResponse === 'string') {
        res.status(403);
        res.send(`Error creating user: ${dbResponse}`)
        return;
    }

    res.send({
        message: 'Succesfully Created user',
        dbResponse
    });
}