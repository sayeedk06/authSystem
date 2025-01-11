import { Express, Request, Response } from "express";
import {eq} from "drizzle-orm"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import apiResponse from "../utils/apiResponseMsgs.js";
import { registrationFormField } from "../utils/formFields.js";
import {db} from "../db/index.js";
import { usersTable} from "../db/schema.js";

export const loginController = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if(!user) {
        return res.json({
            error : "User not found"
        });
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user[0].password)
    if(!isMatch) {
        return res.json({
            message: apiResponse[400],
            error: "Password doesn't match"
        })
    } 
    //generate a jwt token
    const token = jwt.sign()
    return res.status(201).json({
        message: "Success"
    })
    
}

export const registrationController = async (req: Request, res: Response) => {
    
    try{

    
    const { ...fields} = req.body;

    //validate the required fields
    const isEmpty = registrationFormField.some(field => !fields[field]);

    if (isEmpty) {
        return res.status(400).json({
            message: "All fields are required",
            error: `Missing or empty fields: ${registrationFormField.filter(field => !fields[field]).join(', ')}`
        });
    }

    //check if user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email,fields.email)).limit(1);

    if (existingUser.length > 0) {
        return res.status(409).json({
            message: "Conflict",
            error: "Email already exists. Please try a different email address"
        })
    }

    //hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(fields.password, salt);

    console.log("name: "+ fields.name + "password " + hashedPassword)

    //save hashed password to the database
    await db.insert(usersTable).values({
        name: fields.name,
        email: fields.email,
        password: hashedPassword,

    })
     // Send success response
     return res.status(201).json({
        message: "User registered successfully",
      });
    }catch(error: any) {
        console.log("Error during user registration", error);


        return res.status(500).json({
            message: "Internal Server Error",
            error: "An unexpected error occurred during registration. Please try again later.",
          });
    }
}
