const restaurenModel = require("../models/resturantModel"); 

const createRestaurentController = async (req,res) => {
    try{
        const {title, 
            imageUrl, 
            foods, 
            time, 
            pickup, 
            delivery, 
            isOpen, 
            logoUrl, 
            rating, 
            ratingCount, 
            code, 
            coords
        } = req.body;
        // validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please Provide title and address'
            });
        }
        const newRestaurent = new restaurenModel({
            title, 
            imageUrl, 
            foods, 
            time, 
            pickup, 
            delivery, 
            isOpen, 
            logoUrl, 
            rating, 
            ratingCount, 
            code, 
            coords,
        }) 

            await newRestaurent.save()

            res.status(201).send({   
                success:true,
                message:'Restaurant Created Successfully',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create restaurent api",
            error
        })
    }
};

// get all restaurents
const getAllRestaurentController = async (req, res) => {
    try {
        const restaurents = await restaurenModel.find({})
        if(!restaurents){
            return res.status(404).send({
                success:false,
                message:'No restaurent found'
            })
        }
        res.status(200).send({
            success:true,
            totalCount: restaurents.length,
            restaurents
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all Restaurent API",
        })
    }
};

// Get restaurent by id

const getRestaurentByIdController = async (req, res) => {
    try {
        const restaurentId = req.params.id
        if(!restaurentId) {
            return res.status(404).send({
                success:false,
                message:'Restaurent Id is required'
            })
        }
        // find restaurent
        const restaurent = await restaurenModel.findById(restaurentId)
        if(!restaurent){
            return res.status(404).send({
                success:false,
                message:'No restaurent found'
            })
        }
        res.status(200).send({
            success:true,
            restaurent,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get restaurent by id API",
            error
        })
    }

};

// Delete restaurant 
const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Restaurant Id is required'
            })
        }
        if(!restaurantId){
            return res.status(404).send({
                success: false,
                message: 'No restaurant found or provide restaurant id',
            })
        }
        await restaurenModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete restaurant API",
            error
        })
    }
};


module.exports = { 
    createRestaurentController,
    getAllRestaurentController,
    getRestaurentByIdController,
    deleteRestaurantController
 };