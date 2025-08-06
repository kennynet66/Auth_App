import { IAllUsersResponse, IResponse, IUser, IUserByIdResponse } from "../CustomTypes/user.Type";
import { UserModel } from "../Models/user.Model";
import { IFormatter } from "../Services/formatting.Service";
import { IError } from "./error.Class";


export class User {
    id: string | undefined;
    constructor(_id?: string) {
        this.id = _id;
    };
    async CreateUser(user: IUser): Promise<IResponse> {
        const errorHandler = new IError();
        try {
            await UserModel.create(user);
            return { Success: true, Code: 201, Message: "User created successfully" };
        } catch (error) {
            const foundError = errorHandler.GetError(error);
            return { Success: foundError.Success, Code: foundError.Code, Message: foundError.Message };
        };
    }

    async GetAllUsers(): Promise<IAllUsersResponse> {
        const formatter = new IFormatter();
        const errorHandler = new IError();
        try {
            const users = await UserModel.find().select("-Password").lean();
            const formattedUsers = users.map((user: IUser) => {
                return { ...user, PhoneNumber: formatter.MaskPhoneNumber(user.PhoneNumber), }
            });
            return { Success: true, Code: 200, Message: `${users.length > 1 ? "Users" : "User"} found!`, Users: formattedUsers };
        } catch (error) {
            const findError = errorHandler.GetError(error)
            return { Success: findError.Success, Code: findError.Code, Message: findError.Message, Users: [] };
        };
    }

    async GetUserById(): Promise<IUserByIdResponse> {
        const errorHandler = new IError();
        const formatter = new IFormatter();
        try {
            if (!await this.UserExists()) {
                return { Success: false, Code: 400, Message: `User not found`, }
            };
            const user = await UserModel.findById(this.id).select("-Password").lean();
            if (!user) {
                return { Success: false, Code: 400, Message: `User of Id: ${this.id} not found!`, };
            }
            user.PhoneNumber = formatter.MaskPhoneNumber(user.PhoneNumber);
            return { Success: true, Code: 200, Message: "User found!", User: { ...user, } };
        } catch (error) {
            const findError: IResponse = errorHandler.GetError(error);
            return { ...findError };
        };
    }

    async DeleteUserById(): Promise<IResponse> {
        const errorHandler = new IError;
        try {
            if (!await this.UserExists()) {
                return { Success: false, Code: 400, Message: `User not found` }
            };
            await UserModel.findByIdAndDelete(this.id);
            return { Success: true, Code: 200, Message: `User deleted successfully` }
        } catch (error) {
            const findError: IResponse = errorHandler.GetError(error);
            return { ...findError }
        };
    }

    async UserExists(): Promise<boolean> {
        try {
            const user = await UserModel.findById(this.id);
            if (!user) { return false; };
            return true;
        } catch (error) { return false; }
    }
}