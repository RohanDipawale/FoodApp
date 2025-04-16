const express = require("express")

const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurentController, getAllRestaurentController, getRestaurentByIdController, deleteRestaurantController } = require("../controllers/restraurentController");

const router = express.Router();

//create restaurent 
router.post('/create', authMiddleware, createRestaurentController);

// Get all restaurents || get
router.get('/getAll', getAllRestaurentController);

// Get restaurent by id
router.get('/get/:id', getRestaurentByIdController);

// DELETE RESTAURANT
router.delete('/delete/:id', authMiddleware, deleteRestaurantController)
module.exports = router;