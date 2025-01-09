import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import apiResponse from "../utils/apiResponseMsgs.js";
import { registrationFormField } from "../utils/formFields.js";

export const loginController = async (req: Request, res: Response) => {
    const email = "sayeed.k06@gmail.com"
    const password = "Alluonekmoja"
    
    const user = true;
    if(!user) {
        return res.json({
            error : "User not found"
        });
    }
    const isMatch = false;
    if(!isMatch) {
        return res.json({
            message: apiResponse[400],
            error: "Password doesn't match"
        })
    } 
    
}

export const registrationController = async (req: Request, res: Response) => {
    
    const { ...fields} = req.body;

    //validate the required fields
    const isEmpty = registrationFormField.some(field => !fields[field]);

    if (isEmpty) {
        return res.status(400).json({
            message: "All fields are required",
            error: `Missing or empty fields: ${registrationFormField.filter(field => !fields[field]).join(', ')}`
        });
    }

    //hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(fields.password, salt);

    console.log("name: "+ fields.name + "password " + hashedPassword)

    //save hashed password to the database
    
    
}
