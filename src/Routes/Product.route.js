import { Router } from 'express';
const router = Router();

import {
    getAllProducts,
    createNewProduct,
    findProductById,
    updateAProduct,
    deleteAProduct,
} from '../Controllers/Product.Controller.js';

//Get a list of all products
router.get('/', getAllProducts);

//Create a new product
router.post('/', createNewProduct);

//Get a product by id
router.get('/:id', findProductById);

//Update a product by id
router.patch('/:id', updateAProduct);

//Delete a product by id
router.delete('/:id', deleteAProduct);

export default router;
