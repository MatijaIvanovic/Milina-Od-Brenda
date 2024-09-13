import mongoose, {Schema, Document} from 'mongoose';


export interface ProductDoc extends Document{
    name: string,
    description: string,
    category: string,
    price: number,
    //images: [string]
}

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    //images: {type: String, required: true}
})


const Product = mongoose.model<ProductDoc>('product', ProductSchema);

export {Product};