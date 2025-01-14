import { Response, Request} from "express";
import { groupsTable, policiesTable,groupPoliciesTable } from "../db/schema.js";
import { db } from "../db/index.js";
import apiResponseMsgs from "../utils/apiResponseMsgs.js";
import { eq } from "drizzle-orm";
import apiRoutes from "../utils/apiRoutes.js";


//group controller start here
export const getGroupsController = async(req: Request , res: Response):Promise<void> => {

    try{
        const groups = await db.select().from(groupsTable)
        res.status(201).json({
            message: apiResponseMsgs[200], 
            data: groups
        })
    }catch(error) {
        console.log("Something went wrong with getting groups", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching group data. Please try again"
        })
    }
}

export const getGroupController = async (req: Request, res: Response):Promise<void> => {
    try {
        const group_id = Number(req.params.id);
        const group = await db.select().from(groupsTable).where(eq(groupsTable.id, group_id));
        if(group?.length === 0) {
            console.log("Group id is not found in the database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Group id invalid. Please choose correct group id and try again"
            })
        }
        res.status(200).json({
            message: apiResponseMsgs[200],
            data: group
        })

    }catch (error) {
        console.log("Something went wrong with getting group with the given id", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching group data. Please try again"
        })
    }
}   

export const createGroupController = async(req: Request , res: Response): Promise<void> => {

    try{
        const policy = req.body.policy;
        const name = req.body.name;
        console.log(policy)

        const isMatch = await db.select().from(policiesTable).where(eq(policy, policiesTable.name))
        if (isMatch?.length === 0) {
            console.log("Policy doesn't exist with database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Policy name invalid. Please choose correct policy name"
            })
        }
   
        const new_group = await db.insert(groupsTable).values({name: name}).returning()
        await db.insert(groupPoliciesTable).values(
            isMatch.map((policy) => ({
              groupId: new_group[0].id,
              policyId: policy.id,
            }))
          );
        res.status(201).json({
            message: apiResponseMsgs[200], 
            data: new_group[0]
        })
    }catch(error) {
        console.log("Something went wrong with getting policies", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching group data. Please try again"
        })
    }
}

export const editGroupController = async(req: Request, res:Response): Promise<void> => {
    try {
        const group_id = Number(req.params.id);
        const {...fields} = req.body
        const isMatch = await db.select().from(groupsTable).where(eq(groupsTable.id, group_id))
        if(isMatch?.length === 0){
            console.log("Group doesn't exist in the database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Group is invalid. Please select a valid group"
            })
        }
        const edited_group = await db.update(groupsTable).set(fields).where(eq(groupsTable.id, group_id)).returning()

        res.status(200).json({
            message: apiResponseMsgs[200],
            data: edited_group
        })
    }catch(error) {
        console.log("Something went wrong while editing the group", error)
        res.status(401).json({
            message: apiResponseMsgs[400],
            error: "An unexpected error has occured while editing the group. Please try again"
        })
    }
}

export const deleteGroupController = async(req: Request, res: Response): Promise<void> => {
    try {
        const group_id = Number(req.params.id);
        const isMatch = await db.select().from(groupsTable).where(eq(groupsTable.id, group_id));

        if(isMatch?.length === 0){
            console.log("No such group exists in the database")
            res.status(401).json({
                message:apiResponseMsgs[400],
                error: "Group id invalid. Please choose the correct group"
            });
        }

        await db.delete(groupsTable).where(eq(groupsTable.id, group_id));
        res.status(200).json({
            message: apiResponseMsgs[200],
            data: ""
        });

    }catch(error) {
        console.log("Something went wrong while deleting the group", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while deleting the group. Please try again"
        })
    }
}

//Group controllers end here

export const getAccessListConstroller = async(req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            message: apiResponseMsgs[200],
            data: apiRoutes
        })

    }catch(error){
        console.log("Something went wrong while fetching the Acess List", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching access list. Please try again"
        })
    }
}

//policy controllers start here

export const getPoliciesController = async(req: Request , res: Response): Promise<void> => {

    try{
        const policies = await db.select().from(policiesTable)
        res.status(201).json({
            message: apiResponseMsgs[200], 
            data: policies
        })
    }catch(error) {
        console.log("Something went wrong with getting policies", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching group data. Please try again"
        })
    }
}

export const getPolicyController = async (req: Request, res: Response):Promise<void> => {
    try {
        const policy_id = Number(req.params.id);
        console.log(policy_id)
        const policy = await db.select().from(policiesTable).where(eq(policiesTable.id, policy_id));
        if(policy?.length === 0) {
            console.log("Policy id is not found in the database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Policy id invalid. Please choose correct policy id and try again"
            })
        }
        res.status(200).json({
            message: apiResponseMsgs[200],
            data: policy
        })

    }catch (error) {
        console.log("Something went wrong with getting group with the given id", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while fetching group data. Please try again"
        })
    }
}  
export const createPolicyController = async(req: Request , res: Response): Promise<void> => {

    const name = req.body.name;
    const access = req.body.access.split(',');

    console.log(access)


    try{
        const isMatch = await db.select().from(policiesTable).where(eq(name, policiesTable.name))
        console.log(isMatch)
        if (isMatch?.length > 0) {
            console.log("Policy already exists in database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Policy name already exists in database. Please choose another valid name"
            })
        }

        const new_policy = await db.insert(policiesTable).values({
            name: name,
            access: access
        }).returning()
        
        res.status(201).json({
            message: apiResponseMsgs[200], 
            data: new_policy
        })
    }catch(error) {
        console.log("Something went wrong with creating policies", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while creating policy. Please try again"
        })
    }
}

export const editPolicyController = async(req: Request, res:Response): Promise<void> => {
    try {
        const policy_id = Number(req.params.id);
        const {...fields} = req.body
        const isMatch = await db.select().from(groupsTable).where(eq(groupsTable.id, policy_id))
        if(isMatch?.length === 0){
            console.log("Group doesn't exist in the database")
            res.status(401).json({
                message: apiResponseMsgs[400],
                error: "Group is invalid. Please select a valid group"
            })
        }
        const edited_policy = await db.update(policiesTable).set(fields).where(eq(policiesTable.id, policy_id)).returning()

        res.status(200).json({
            message: apiResponseMsgs[200],
            data: edited_policy
        })
    }catch(error) {
        console.log("Something went wrong while editing the policy", error)
        res.status(401).json({
            message: apiResponseMsgs[400],
            error: "An unexpected error has occured while editing the policy. Please try again"
        })
    }
}

export const deletePolicyController = async(req: Request, res: Response): Promise<void> => {
    try {
        const policy_id = Number(req.params.id);
        const isMatch = await db.select().from(policiesTable).where(eq(policiesTable.id, policy_id));

        if(isMatch?.length === 0){
            console.log("No such group exists in the database")
            res.status(401).json({
                message:apiResponseMsgs[400],
                error: "Group id invalid. Please choose the correct group"
            });
        }

        await db.delete(policiesTable).where(eq(policiesTable.id, policy_id));
        res.status(200).json({
            message: apiResponseMsgs[200],
            data: ""
        });

    }catch(error) {
        console.log("Something went wrong while deleting the policy", error)
        res.status(500).json({
            message: apiResponseMsgs[500],
            error: "An unexpected error has occured while deleting the policy. Please try again"
        })
    }
}
//policy controllers end here