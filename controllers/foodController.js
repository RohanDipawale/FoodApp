const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
        if(!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success:false,
                message: "Please Provide All Fields"
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });

        await newFood.save()
        res.status(201).send({
            success:true,
            message: "Food Item Created Successfully",
            newFood
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in create food api",
            error
        })
    }
};

//GET ALL FOODS

const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if(!foods) {
            return res.status(404).send({
                success:false,
                message: "No food items are found"
            })
        }
        res.status(200).send({
            success:true,
            totalFoods: foods.length,
            foods,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in get all foods API",
            error
        })
    }
}

// Get single Food
const getSingleFoodController = async (req, res) => {
        try {
          const foodId = req.params.id;
          if (!foodId) {
            return res.status(404).send({
              success: false,
              message: "please provide id",
            });
          }
          const food = await foodModel.findById(foodId);
          if (!food) {
            return res.status(404).send({
              success: false,
              message: "No Food Found with htis id",
            });
          }
          res.status(200).send({
            success: true,
            food,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error In get SIngle Food API",
            error,
          });
        }
      };

const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({restaurant: restaurantId});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Based on Restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}

// update food item
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id
    if(!foodID) {
      return res.status(404).send({
        success: false,
        message: "Please provide id",
      })
    }
    const food = await foodModel.findById(foodID)
    if(!food){
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      })
    }
    const {
      title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,} = req.body
    const updatedFood = await foodModel.findByIdAndUpdate(foodID, {
      title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
    }, {new: true}
  );
  res.status(200).send({
    success: true,
    message: "Food Updated Successfully",
  });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error
    })
  }
};

//Delete food 

const deletefoodController  = async (req, res) => {
  try {
    const foodID = req.params.id
    if(!foodID){
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      })
    }
    const food = await foodModel.findById(foodID)
    if(!food){
      return res.status(404).send({
        success:false,
        message: "No Food Found with this id",
      })
    }
    await foodModel.findByIdAndDelete(foodID);
    res.status(200).send({
      success: true,
      message: "Food Item is Deleted"
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Delete Food API",
      error
    })
  }
};

// Place Order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id
    if(!orderId){
      return res.status(404).send({
        success: false,
        message: "Please Provide Valid Order Id"
      })
    }
    const {status} = req.body
    if(!status){
      return res.status(404).send({
        success: false,
        message: "Please Provide Valid Status"
      })
    }
    const order = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
    res.status(200).send({
      success:true,
      message:"Order Status Updated Successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error In Change Order Status API",
      error
    })
  }
}


module.exports = {
    createController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController, 
    deletefoodController,
    placeOrderController,
    orderStatusController
}