import { MongooseError } from "mongoose";
import { IResponse } from "../CustomTypes/user.Type";

export class IError {
    mongooseError = new MongooseError("")
    HandleMongoError(error: MongooseError): IResponse {
        if (error.name === "CastError") {
            return { Success: true, Code: 400, Message: "Invalid Id" };
        }

        if (error.name === "ValidationError") {
            return { Success: true, Code: 400, Message: error.message };
        }

        if (error.name === "MongooseError") {
            return { Success: true, Code: 400, Message: error.message };
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