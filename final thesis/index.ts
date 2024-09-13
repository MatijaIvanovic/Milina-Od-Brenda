import express from 'express'
import bodyParser, { urlencoded } from 'body-parser';
import {AdminRoutes, CustomerRoutes} from './routes'
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URL } from './config';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin', AdminRoutes);
app.use('/customer', CustomerRoutes);

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}as ConnectOptions).then(result=>{
    console.log('db connected!');
}).catch(err=> console.log('error ' +err));
app.listen(8000, ()=> {
    console.clear();
    console.log('App is listening to port 8000');
})



//db pass: TwyLqo2BHNZjwN8g
//db username ivanoviczemun