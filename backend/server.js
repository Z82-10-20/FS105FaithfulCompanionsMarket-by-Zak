import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { accessoryRouter, birdRouter, catRouter, dogRouter, fishRouter, petfoodRouter } from './routes/productRouter.js';
// import userRoutes from './routes/userRoutes.js';



dotenv.config();
const port = process.env.PORT || 5000;


const app = express ();


app.use(cors()); // Enable CORS
app.use(express.json());
connectDB();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running')
});



// Routes
app.use('/api/accessoriespage', accessoryRouter); // Mount the accessoryRouter at /api/accessories
app.use('/api/birdpage', birdRouter); // Mount the birdRouter at /api/birds
app.use('/api/catpage', catRouter); // Mount the catRouter at /api/cats
app.use('/api/dogpage', dogRouter); // Mount the dogRouter at /api/dogs
app.use('/api/fishpage', fishRouter); // Mount the fishRouter at /api/fishes
app.use('/api/petfoodpage', petfoodRouter);


// app.use('/api/users', userRoutes); 
app.use(notFound);
app.use(errorHandler);








app.listen(port, () => console.log(`Server running on port ${port}`));



