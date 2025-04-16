const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
        const {title, imageUrl} = req.body
        // validation
        if(!title){
            return res.status(500).send({
                success: false,
                message: 'Please provide category title or image URL'
            })
        }
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            newCategory,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create cat api",
            error
        })
    }
};

//get all CAT
const getAllCatController = async  (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories) {
            return res.status(404).send({
                success: false,
                message: "No Categories Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Categories found",
            totalCat: categories.length,
            categories,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get All Category API",
            error
        })
    }
}

const updateCatController = async (req, res) => {

    try {
        const {id} = req.params
        const {title, imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new: true})
        if(!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category Updated SuccessFully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update cat api",
        });
    }
}

const deleteCatController =async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(500).send({
                success: false,
                message: "No Category Id found"
            })
        }
        const category = await categoryModel.findById(id)
        if(!category) {
            return res.status(500).send({
                success: false,
                message: "No Category found"

            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Deleted SuccessFully",
        })

    } catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete cat api",
            error
        })
    }

}

module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController
}