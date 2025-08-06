export type IUser = {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Password: string,
    Role: "User" | "SuperAdmin",
    IsActive: boolean
};

export type IResponse = {
    Success: boolean,
    Code: number,
    Message: string,
};

export type IUserByIdResponse = IResponse & {
    User?: IUser,
};

export type IAllUsersResponse = IResponse & {
    Users: IUser[] | [],
};

export type AuthUser = IUser & {
    IsActive: boolean,
};