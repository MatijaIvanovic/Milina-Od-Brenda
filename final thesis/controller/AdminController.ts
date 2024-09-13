import {Request, Response, NextFunction} from 'express';
import { CreateAdminInput, Products } from '../dto';
import { Admin, Product} from '../models';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utility/PasswordUtility';

/*export const CreateAdmin = async (req: Request, res:Response, next: NextFunction)=>{
     
    const {email, password} = <CreateAdminInput>req.body;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createAdmin = Admin.create({
        email:email,
        password:userPassword,
    });
    return res.json(createAdmin);
}*/

export const LogInAdmin = async (req: Request, res:Response, next: NextFunction)=>{
    const loginInputs = <CreateAdminInput>req.body;

    const {email, password} =  loginInputs;

    const admin = await Admin.findOne({email: email});

    if(admin){
        const validation = await ValidatePassword(password, admin.password);
        if(validation){
            const signature = GenerateSignature({
                _id: (admin._id as String).toString(),
                email: admin.email
            });
            return res.status(201).json({signature:signature, email: admin.email});
        }
    }
}

export const AddItem = async(req: Request, res: Response, next: NextFunction)=>{

    const user = req.user;
    if(user){
        const {name, description, category, price} = <Products>req.body;

        const createdProduct =  await Product.create({
            name: name,
            description: description,
            category: category,
            price: price
        })
        
        return res.json("success!");
    }
}
export const findProduct =  async(name?:string)=>{
    if(name){
        const product = await Product.findOne({name: name});
        return product;
    }
    else{
        console.log("item not found!");
        return null;} 
    
}

export const UpdateItem = async(req: Request, res: Response, next:NextFunction)=>{
    const productName = req.params.name;
    const {name, description, category, price} =req.body as Products;
    const user = req.user;
    if(user){
        const existingProudct =  await findProduct(productName);

    
    
        if(existingProudct!==null){
            existingProudct.name = name,
            existingProudct.description = description,
            existingProudct.category = category,
            existingProudct.price = price

            const savedResult = await existingProudct.save();
    
        }
    
        
    
            
        return res.json("success!");}
    
    
}

export const deleteItem = async(req: Request, res: Response, next:NextFunction)=>{
    const productName =  req.params.name;
    const user = req.user;
    if(user){
        const productToDelete = await findProduct(productName);
        if(!productToDelete){
            return res.status(404).json({message: "Product not found!"});
        }
        await Product.deleteOne({name: productName});
        return res.status(200).json({message: "Product deleted successfully!"});
    }
}