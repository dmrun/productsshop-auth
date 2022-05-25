import createError from 'http-errors';
// import { Mongoose } from 'mongoose';

import User from '../Models/User.model.js';

import logger from '/Users/runtime/Desktop/Learning/NodeJS/Udemy Course/Docker Demo/Nodejs-REST-API-Jest-Tests/logger/index.js';

export async function registerUser(req, res, next) {
    let user = new User(req.body);
    user.save((err) => {
        if (err) {
            let error = 'Something bad happened! Try again.';

            if (err.code === 11000) {
                error = 'That email is already taken, try another.';
            }

            return res.render('register', { error: error });
        }

        res.redirect('/auth/dashboard');
    });
}

export async function loginUser(req, res, next) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user || req.body.password !== user.password) {
            return res.render('login', {
                error: 'Incorrect email / password.',
            });
        }

        req.session_state.userId = user._id;
        res.redirect('/auth/dashboard');
    });
}

export async function dashboardDisplay(req, res, next) {
    if (!(req.session_state && req.session_state.userId)) {
        return res.redirect('/auth/login');
    }

    User.findById(req.session_state.userId, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/auth/login');
        }

        res.render('/auth/dashboard');
    });
}
export async function updateAProduct(req, res, next) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await findByIdAndUpdate(id, updates, options);
        if (!result) {
            throw createError(404, 'Product does not exist');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof CastError) {
            return next(createError(400, 'Invalid Product Id'));
        }

        next(error);
    }
}
export async function deleteAProduct(req, res, next) {
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        // console.log(result);
        if (!result) {
            throw createError(404, 'Product does not exist.');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof CastError) {
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }
}
