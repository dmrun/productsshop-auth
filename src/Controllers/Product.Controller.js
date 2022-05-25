import createError from 'http-errors';
// import { Mongoose } from 'mongoose';

import Product from '../Models/Product.model.js';

import logger from '/Users/runtime/Desktop/Learning/NodeJS/Udemy Course/Docker Demo/Nodejs-REST-API-Jest-Tests/logger/index.js';

export async function getAllProducts(req, res, next) {
    try {
        const results = await Product.find({}, { __v: 0 });
        // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
        // const results = await Product.find({ price: 699 }, {});
        logger.info('Request getAllProducts: ' + results);
        res.send(results);
    } catch (error) {
        logger._error('Request Error for getAllProducts: ' + error);
        console.log(error.message);
    }
}
export async function createNewProduct(req, res, next) {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }

    /*Or:
If you want to use the Promise based approach*/
    /*
const product = new Product({
name: req.body.name,
price: req.body.price
});
product
.save()
.then(result => {
  console.log(result);
  res.send(result);
})
.catch(err => {
  console.log(err.message);
});
*/
}
export async function findProductById(req, res, next) {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        // const product = await Product.findOne({ _id: id });
        if (!product) {
            throw createError(404, 'Product does not exist.');
        }
        res.send(product);
    } catch (error) {
        console.log(error.message);
        if (error instanceof CastError) {
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }
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
