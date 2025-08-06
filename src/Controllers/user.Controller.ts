import { Request, Response } from "express";
import { IUser } from "../CustomTypes/user.Type";
import { User } from "../Classes/user.Class";
import Bcrypt from "bcryptjs";
import { Auth } from "../Classes/auth.Class";

const auth = new Auth();

export async function CreateNewUser(Req: Request, Res: Response): Promise<any> {
    const UserClass = new User;
    try {
        const userInfo: IUser = Req.body;
        userInfo.Password = await Bcrypt.hash(userInfo.Password, 12);
        const createUser = await UserClass.CreateUser(userInfo);
        return Res.status(createUser.Code).json({ ...createUser });
    } catch (error) {
        return Res.status(500).json({ Message: `An error occurred while creating a new user:\n ${error}` });
    };
};

export async function GetAllUsers(req: Request, res: Response) {
    const userClass = new User;
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
        const userClass = new User(_id);
        const user = await userClass.GetUserById();
        return res.status(200).json({ ...user });
    } catch (error) {
        return res.status(500).json({ Message: `An error occurred while getting a user by Id:\n ${error}` });
    };
}

export async function DeleteUserById(req: Request, res: Response) {
    try {
        const _id: string = req.params.id as string;
        const userClass = new User(_id);
        const deletedUser = await userClass.DeleteUserById();
        return res.status(deletedUser.Code).json({ ...deletedUser });
    } catch (error) {
        return res.status(500).json({ Message: `An error occurred while deleting a user by Id:\n ${error}` });
    };
}
