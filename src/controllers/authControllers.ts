import { Express, Request, Response } from "express";
import {eq} from "drizzle-orm"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import apiResponse from "../utils/apiResponseMsgs.js";
import { registrationFormField } from "../utils/formFields.js";
import {db} from "../db/index.js";
import { usersTable} from "../db/schema.js";
import apiResponseMsgs from "../utils/apiResponseMsgs.js";

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(process.env.DATABASE_URL)
    
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if(!user) {
        res.status(401).json({
            Message: apiResponseMsgs[400],
            error : "User not found"
        });
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user[0].password)
    if(!isMatch) {
        res.json({
            message: apiResponse[400],
            error: "Password doesn't match with the given user"
        })
    } 
    //generate a jwt token
    const token = await jwt.sign({email}, process.env.JWT_TOKEN_KEY, {expiresIn: '1h'});

    res.status(201).json({
        message: "Success",
        jwt_token: token
    })
    
}

export const registrationController = async (req: Request, res: Response):Promise<void> => {
    
    try{

    
    const { ...fields} = req.body;

    //validate the required fields
    const isEmpty = registrationFormField.some(field => !fields[field]);

    if (isEmpty) {
        res.status(400).json({
            message: "All fields are required",
            error: `Missing or empty fields: ${registrationFormField.filter(field => !fields[field]).join(', ')}`
        });
    }

    //check if user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email,fields.email)).limit(1);

    if (existingUser.length > 0) {
        res.status(409).json({
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
     res.status(201).json({
        message: "User registered successfully",
      });
    }catch(error: any) {
        console.log("Error during user registration", error);


        res.status(500).json({
            message: "Internal Server Error",
            error: "An unexpected error occurred during registration. Please try again later.",
          });
    }
}
