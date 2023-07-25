import mongoose,{Schema, SchemaDefinitionProperty, mongo} from "mongoose";

interface IRoute {
    userId: SchemaDefinitionProperty<string>,
    routesAccessible:{
        userRoutes: string[],
        appRoutes: string[]
    }
}

const routeSchema = new Schema<IRoute>({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    routesAccessible:{
        userRoutes:[{
            type:String
        }],
        appRoutes:[{
            type:String
        }],
        routeRoutes:[{
            type:String
        }]
    }
})

export default mongoose.model<IRoute>('Route', routeSchema)