import { Router } from "express";
import { CreateNewUser, DeleteUserById, GetAllUsers, GetUserById } from "../Controllers/user.Controller";

const UserRoutes = Router();

UserRoutes.post("/CreateUser", CreateNewUser);
UserRoutes.get("/GetAllUsers", GetAllUsers);
UserRoutes.get("/GetUserById/:id", GetUserById);
UserRoutes.delete("/DeleteUser/:id", DeleteUserById);

export default UserRoutes;