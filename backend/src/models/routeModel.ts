import mongoose,{Schema, SchemaDefinitionProperty, mongo} from "mongoose";

interface IRoute {
    userId: SchemaDefinitionProperty<string>,
    routesAccessible: string[]
}

const routeSchema = new Schema<IRoute>({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    routesAccessible:[{
        type: String
    }]
})

export default mongoose.model<IRoute>('Route', routeSchema)