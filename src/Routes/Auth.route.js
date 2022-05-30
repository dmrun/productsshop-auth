import { Router } from 'express';
import bodyParser from 'body-parser';
import {
    registerUser,
    loginUser,
    dashboardDisplay,
    getAllUsers,
} from '../Controllers/User.Controller.js';

const authRouter = Router();
authRouter.use(bodyParser.urlencoded({ extended: false }));
// const ProductController = require('../Controllers/Product.Controller');

//index
authRouter.get('/', (req, res) => {
    res.render('index.html');
});

const users = [{ name: 'Name' }];
authRouter.get('/getAll', getAllUsers);

authRouter.get('/register', (req, res) => {
    res.render('register');
});

authRouter.post('/register', registerUser);

authRouter.get('/login', (req, res) => {
    res.render('login');
});

authRouter.post('/login', loginUser);

authRouter.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

export default authRouter;
