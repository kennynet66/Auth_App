import { MongooseError } from "mongoose";
import { IResponse } from "../CustomTypes/user.Type";

export class IError {
    mongooseError = new MongooseError("")
    HandleMongoError(Error: MongooseError): IResponse {
        if (Error.name === "CastError") {
            return { Success: true, Code: 400, Message: "Invalid Id" };
        }

        if (Error.name === "ValidationError") {
            return { Success: true, Code: 400, Message: Error.message };
        }

        if (Error.name === "MongooseError") {
            return { Success: true, Code: 400, Message: Error.message };
        };

        return { Success: false, Code: 200, Message: "Not a known Mongo Error" };
    };

    GetError(error: any): IResponse {
        const KnownMongoError = this.HandleMongoError(error);

        if (KnownMongoError.Success) {
            return { Success: false, Code: KnownMongoError.Code, Message: KnownMongoError.Message };
        };
        return { Success: false, Code: KnownMongoError.Code, Message: "An unknown error occurred" };
    };
}