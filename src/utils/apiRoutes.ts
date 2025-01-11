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
    GET_GROUPS: "/",
    GET_GROUP: "/{id}",
    CREATE_GROUP: "/create",
    EDIT_GROUP: "/edit",

    //Access Policies
    GET_POLICIES: "/",
    GET_POLICY: "/{id}",
    CREATE_POLICY: "/create",
    EDIT_POLICY: "/edit",

    
    //database
    SEEDER: "/seeding",
}

export default apiRoutes;