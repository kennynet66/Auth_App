import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    FirstName: {
        type: String,
        minLength: [3, "Minimum length for first name is 3 characters"],
        maxLength: [25, "Maximum length for first name is 25 characters"],
        required: [true, "First name is required!"],
        lowercase: true
    },
    LastName: {
        type: String,
        minLength: [3, "Minimum length for last name is 3 characters"],
        maxLength: [25, "Maximum length for last name is 25 characters"],
        required: [true, "Last name is required!"],
        lowercase: true
    },
    Email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email is already registered!"],
        maxLength: [30, "Maximum length for last name is 30 characters"],
        lowercase: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: [true, "Phone number is already registered!"],
        maxLength: [12, "Invalid Phone number!"], // Supporting only Kenyan phone numbers
        minLength: [12, "Invalid Phone number!"],
    },
    Password: {
        type: String,
        required: [true, "Password is required"],
    },
    Role: {
        type: String,
        required: [true, "User role is required"],
        enum: ["SuperAdmin", "User"],
        default: "User",
    },
    IsActive: {
        type: Boolean,
        required: true,
        default: true
    }
});

export const UserModel = model("Users", UserSchema);