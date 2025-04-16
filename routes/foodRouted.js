const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deletefoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");



const router = express.Router();

// ADD FOOD
router.post('/create', authMiddleware ,createController);

// GET ALL FOOD
router.get("/getAll", getAllFoodController)

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController)

// GET FOOD BY RESTAURANT
router.get("/getByRestaurant/:id", getFoodByRestaurantController)

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deletefoodController)

// Place Order
router.post("/placeOrder", authMiddleware, placeOrderController)

// ORDER STATUS
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController)

module.exports = router