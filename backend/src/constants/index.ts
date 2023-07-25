//Types of Routes
const ROUTE_TYPES = ["userRoutes", "appRoutes", "routeRoutes"];


const DEFAULT_ROUTES = {
    ADMIN_DEFAULT_APPROUTES : ["GET_/verify", "POST_/resetpass"],
    ADMIN_DEFAULT_USERROUTES : ["GET_/", "POST_/", "DELETE_/:id", "GET_/:id" ],
    ADMIN_DEFAULT_ROUTEROUTES : ["GET_/", "GET_/:id", "POST_/:id", "PATCH_/:id"],

    USER_DEFAULT_APPROUTES : ["GET_/verify", "POST_/resetpass"],
    USER_DEFAULT_USERROUTES : ["GET_/", "POST_/"],
    USER_DEFAULT_ROUTEROUTES: ["GET_/:id"]
}

const returnDefaultRoutes = (role: string, routeType:string):string[] => {
    role = role.toUpperCase();
    routeType = routeType.toUpperCase();
    const key = `${role}_DEFAULT_${routeType}`

    return DEFAULT_ROUTES[key as keyof typeof DEFAULT_ROUTES];
}


export {DEFAULT_ROUTES, ROUTE_TYPES, returnDefaultRoutes}