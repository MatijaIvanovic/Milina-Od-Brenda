import express, {Request, Response, NextFunction} from 'express';
import { /*CreateAdmin,*/ AddItem, deleteItem, LogInAdmin, UpdateItem } from '../controller/';
import { Authentication } from '../middlewares/CommonAuth';


const router= express.Router();


/*router.post('/admin', CreateAdmin);*/
router.post('/login', LogInAdmin);

router.use(Authentication);

router.post('/addItem', AddItem);
router.patch('/updateItem/:name', UpdateItem);
router.delete('/delete/:name', deleteItem);

router.get('/',(req: Request, res:Response, next:NextFunction) => {
    res.json({message:"Hello from Admin"})
})

export {router as AdminRoutes};