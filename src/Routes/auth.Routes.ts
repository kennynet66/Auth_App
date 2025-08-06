import { Router } from "express";
import { ActivateUser, DeactivateUser } from "../Controllers/auth.Controller";

const authRoutes = Router();

authRoutes.put("/DeactivateUser/:id", DeactivateUser);
authRoutes.put("/ActivateUser/:id", ActivateUser);

export default authRoutes;