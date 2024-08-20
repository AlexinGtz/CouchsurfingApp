import { Request, Response } from "express"
import { DatabaseConnection } from "./Database/database";
import { user } from "./types";

const db = new DatabaseConnection();

export const getUserRelationship = (req: Request, res: Response) => {
    const {
        startingUser,
        finalUser
    } = req.params;

    const userData: user = db.find(startingUser);
    let userDistance = 1;
    let currentFriends = userData.friends;

    
    while(!compareFriends(currentFriends, finalUser)) {
        const newFriendData = currentFriends.map((frnd) => db.find(frnd))

        currentFriends = newFriendData.flatMap((usr) => usr.friends);

        userDistance += 1;
    }
    
    res.status(200);
    res.send({
        userDistance
    });
}

const compareFriends = (friendIdArray: string[], friendId: string) => {
    const found = friendIdArray.find((frnd) => frnd === friendId);
    return found ? true : false;
}