import { 
    createGroupController, 
    getGroupsController,
    getGroupController, 
    getPoliciesController,
    getPolicyController, 
    deleteGroupController, 
    editGroupController, 
    createPolicyController, 
    getAccessListConstroller, 
    deletePolicyController} from "../controllers/userControllers.js";

import express from "express";
import apiRoutes from "../utils/apiRoutes.js";

const router = express.Router();


router.get(apiRoutes.GET_GROUPS, getGroupsController);
router.get(apiRoutes.GET_GROUP, getGroupController);
router.post(apiRoutes.CREATE_GROUP, createGroupController);
router.put(apiRoutes.EDIT_GROUP, editGroupController);
router.delete(apiRoutes.DELETE_GROUP, deleteGroupController);

router.get(apiRoutes.GET_ACCCESS_LIST, getAccessListConstroller)

router.get(apiRoutes.GET_POLICIES, getPoliciesController);
router.get(apiRoutes.GET_POLICY, getPolicyController);
router.post(apiRoutes.CREATE_POLICY, createPolicyController)
router.put
router.delete(apiRoutes.DELETE_POLICY, deletePolicyController)

export default router;