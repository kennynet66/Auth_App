import { Request, Response } from "express";
import { IUser } from "../CustomTypes/user.Type";
import { User } from "../Classes/user.Class";
import Bcrypt from "bcryptjs";

const userClass = new User;

export async function CreateNewUser(Req: Request, Res: Response): Promise<any> {
    try {
        const userInfo: IUser = Req.body;
        userInfo.Password = await Bcrypt.hash(userInfo.Password, 12);
        const createUser = await userClass.CreateUser(userInfo);
        return Res.status(createUser.Code).json({ ...createUser });
    } catch (error) {
        return Res.status(500).json({ Message: `An error occurred while creating a new user:\n ${error}` });
    };
};

export async function GetAllUsers(req: Request, res: Response) {
    try {
        const users = await userClass.GetAllUsers();
        return res.status(200).json({ ...users });
    } catch (error) {
        return res.status(500).json({ Message: `An error occurred while getting all users:\n ${error}` });
    };
};

export async function GetUserById(req: Request, res: Response) {
    try {
        const _id: string = req.params.id as string
        const userClass = new User();
        const user = await userClass.GetUserById(_id);
        return res.status(200).json({ ...user });
    } catch (error) {
        return res.status(500).json({ Message: `An error occurred while getting a user by Id:\n ${error}` });
    };
}

export async function DeleteUserById(req: Request, res: Response) {
    try {
        const _id: string = req.params.id as string;
        const userClass = new User();
        const deletedUser = await userClass.DeleteUserById(_id);
        return res.status(deletedUser.Code).json({ ...deletedUser });
    } catch (error) {
        return res.status(500).json({ Message: `An error occurred while deleting a user by Id:\n ${error}` });
    };
}
