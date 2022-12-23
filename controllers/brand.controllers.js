const { createBrandService } = require("../services/brand.services")

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