const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');

router.post('/', auth, addToCart);
router.put('/:id', auth, updateCartItem);
router.delete('/:id', auth, deleteCartItem);

module.exports = router;
