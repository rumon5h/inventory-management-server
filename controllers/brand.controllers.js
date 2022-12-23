const { createBrandService, getAllBrandService, getBrandByIdService } = require("../services/brand.services")

exports.createBrand = async(req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status: "success",
            message: "Brand created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Failed to create new brand',
            error: error.message
        })
    }
}

exports.getAllBrand = async(req, res, next) => {
    try {
        const result = await getAllBrandService();

        res.status(200).json({
            status: 'success',
            message: 'Successfully get all brand',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Failed to get all brand',
            error: error.message
        })
    }
}

exports.getBrandById = async(req, res, next) => {
    try {
        const {id} = req.params;

        const result = await getBrandByIdService(id);

        res.status(200).json({
            status: 'success',
            message: 'Successfully get brand',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Failed to get brand',
            error: error.message
        })
    }
}