import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors';
import userRoute from './route/userRoute.js'
import authRoute from './route/authRoute.js'
import permissionsRoute from './route/permissionsRoute.js'
import brandRoute from './route/brandRoute.js'
import tagRoute from './route/tagRouter.js'
import roleRoute from './route/roleRoute.js'
import { connectMongoDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// express init
const app = express();

// dotenv config
dotenv.config();

// Middle ware init
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// environment variable init
const PORT = process.env.SERVER_PORT;

// static folder
app.use(express.static("public"))

// routing
app.use('/api/v1/user', userRoute );
app.use('/api/v1/auth', authRoute );
app.use('/api/v1/permissions', permissionsRoute );
app.use('/api/v1/role', roleRoute );
app.use('/api/v1/brands', brandRoute );
app.use('/api/v1/tags', tagRoute );

// custom error
app.use(errorHandler)

// server listener
app.listen( PORT, () =>  {
    connectMongoDB();
    console.log(`SERVER is runing on PORT : ${ PORT }`.bgGreen.black);
})

