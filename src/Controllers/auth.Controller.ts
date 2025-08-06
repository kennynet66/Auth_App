import { Request, Response } from "express";
import { Auth } from "../Classes/auth.Class";

const auth = new Auth()

export async function DeactivateUser(req: Request, res: Response) {
    try {
        const _id: string = req.params.id;
        const deactivatedUser = await auth.DeactivateUser(_id);
        if (!deactivatedUser.Success) {
            return res.status(deactivatedUser.Code).json({ Success: deactivatedUser.Success, Code: deactivatedUser.Code, Message: deactivatedUser.Message });
        }
        return res.status(200).json({ Success: true, Code: 200, Message: `User of Id: ${_id} deactivated successfully` });
    } catch (error) {
        return res.status(500).json({ Success: false, Code: 500, Message: `An error occurred while deactivating the user: \n ${error}` })
    };
}

export async function ActivateUser(req: Request, res: Response) {
    try {
        const _id: string = req.params.id as string;
        const activatedUser = await auth.ActivateUser(_id);
        if (!activatedUser.Success) {
            return res.status(activatedUser.Code).json({ Success: activatedUser.Success, Code: activatedUser.Code, Message: activatedUser.Message });
        }
        return res.status(200).json({ Success: true, Code: 200, Message: `User of Id: ${_id} activated successfully` });
    } catch (error) {
        res.status(500).json({ Success: false, Code: 500, Message: `An error occurred while activating the user: \n ${error}` });
    }
}