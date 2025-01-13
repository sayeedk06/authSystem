const apiRoutes = {
    //auth
    REGISTER: "/register",
    LOGIN: "/login/",
    LOGOUT: "/logout",
    RESET_PASSWORD: "/reset-password",


    //users
    GET_USERS: "/",
    GET_USER: "/{id}",
    UPDATE_USER: "/{id}",
    DELETE_USER: "/{id}",


    
    //groups
    GET_GROUPS: "/groups/",
    GET_GROUP: "/groups/:id",
    CREATE_GROUP: "/groups/",
    EDIT_GROUP: "groups/:id",
    DELETE_GROUP: "/groups/:id",

    //Access Policies
    GET_ACCCESS_LIST: "/access/list",
    GET_POLICIES: "/policies/",
    GET_POLICY: "policies/{id}",
    CREATE_POLICY: "/policies/",
    EDIT_POLICY: "policies/:id",

    
    //database
    SEEDER: "/seeding",
}

export default apiRoutes;