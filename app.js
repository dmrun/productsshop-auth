import express, { json, urlencoded } from 'express';
import createError from 'http-errors';
import dotenv from 'dotenv';
import initDB from './src/lib/initDB.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';
import sessions from 'client-sessions';

import ProductRoute from './src/Routes/Product.route.js';
import AuthRoute from './src/Routes/Auth.route.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', `${__dirname}/src/Views`);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(json());
app.use(urlencoded({ extended: true }));
initDB();
app.use(
    sessions({
        cookieName: 'session',
        secret: process.env.SECRET,
        duration: 30 * 60 * 1000,
    })
);

// Initialize DB
// Initialize DB
// require('./src/lib/initDB').default();

app.use('/products', ProductRoute);
app.use('/auth', AuthRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
    /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
    // You can use the above code if your not using the http-errors module
    next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});
