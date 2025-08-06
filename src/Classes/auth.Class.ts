import { IResponse, IUser } from "../CustomTypes/user.Type";
import { UserModel } from "../Models/user.Model";
import { User } from "./user.Class";

export class Auth {
    async DeactivateUser(id: string): Promise<IResponse> {
        try {
            const user = new User(id);
            const findUser = await user.GetUserById();
            if (!findUser.Success) {
                return { Success: findUser.Success, Code: findUser.Code, Message: findUser.Message };
            };

            if (!findUser.User?.IsActive) {
                return { Success: false, Code: 400, Message: "User is already deactivated!" };
            };
            await UserModel.findByIdAndUpdate({ _id: id }, { IsActive: false });
            return { Success: true, Code: 200, Message: `User deactivated successfuly!` };
        } catch (error) {
            return { Success: false, Code: 500, Message: `An error occurred while deactivating the user: \n ${error}` }
        };
    }

    async ActivateUser(id: string): Promise<IResponse> {
        try {
            const user = new User(id);
            const findUser = await user.GetUserById();

            if (!findUser.Success) {
                return { Success: findUser.Success, Code: findUser.Code, Message: findUser.Message };
            }

            if (findUser.User?.IsActive) {
                return { Success: false, Code: 400, Message: "User is already active!" };
            };
            await UserModel.findByIdAndUpdate({ _id: id }, { IsActive: true });
            return { Success: true, Code: 200, Message: `User activated successfuly!` };
        } catch (error) {
            return { Success: false, Code: 500, Message: `An error occurred while activating the user: \n ${error}` }
        }
    }
}