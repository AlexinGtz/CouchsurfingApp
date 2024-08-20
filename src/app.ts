import express from 'express'
import dotenv from 'dotenv';
import { getUser } from './UsersCrud/getUser';
import { deleteUser } from './UsersCrud/deleteUser';
import { updateUser } from './UsersCrud/updateUser';
import { createUser } from './UsersCrud/postUser';
import { getUserRelationship } from './getUserRelationship';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/user/:userId', getUser);
app.delete('/user/:userId', deleteUser);
app.patch('/user', updateUser);
app.post('/user', createUser);

app.get('/userRelationship/:startingUser/:finalUser', getUserRelationship)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});