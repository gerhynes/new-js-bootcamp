const express = require("express");
const cartsRepo = require("../repositories/carts");
const router = express.Router();

// Receive POST request to add item to cart
router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);

  // Figure out cart
  let cart;
  if (!req.session.cartId) {
    // We don't have a cart. Create one.
    // Store cartId on req.session.cartId
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // We have a cart. Get it from repository.
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // Increment quantity and save cart
    existingItem.quantity++;
  } else {
    // Add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.send("Product added to cart");
});
// Receive GET request to show all items in cart
// Receive POST request to delete item from cart

module.exports = router;
