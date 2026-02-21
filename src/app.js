import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes.js';
import candidateRoutes from './modules/candidate/candidate.routes.js';
import companyRoutes from './modules/company/company.routes.js';


const app = express();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/candidate', candidateRoutes);
app.use('/company', companyRoutes);


export default app;





