import { IResponse } from "../CustomTypes/user.Type";

export class Validator {
    ValidatePhone(Phone: string): IResponse {
        return { Success: true, Code: 0, Message: "" };
    };
};