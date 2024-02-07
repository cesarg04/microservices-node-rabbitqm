import { Router } from "express";
import { createProducts, deleteProduct, getProduct, getProductById, likeProduct, updateProduct } from "../controller";


const router = Router();

router.get('', getProduct)
router.post('', createProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/:id/like', likeProduct)
export default router;
 